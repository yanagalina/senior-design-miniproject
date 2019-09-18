const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 2000;
const router = express.Router();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
var mongoUtils = require('./mongo_utils');

app.use(cors());
app.use(bodyParser.json());

/* Validate jwt */
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://jenninorell.auth0.com/.well-known/jwks.json`
  }),
                     
  // Validate the audience and the issuer.
  audience: 'XoIGhJP4xwck7msV1lZ1RqTWAXyxEYOw',
  issuer: `https://jenninorell.auth0.com/`,
  algorithms: ['RS256']
});

app.get('/api/sources', checkJwt, async (req, res) => {
	let db = mongoUtils.getDb();
	const source_coll = db.collection("sensor-sources");
	var sources = await source_coll.find({}, {name: 1, type: 1}).toArray();
	res.send(sources);
});


/* Get all sources and data of a certain type */
app.get('/api/data', checkJwt, async (req, res) => {
	const type = req.query.type;
	var data = [];
	let db = mongoUtils.getDb();
	const source_coll = db.collection("sensor-sources");
	const user_coll = db.collection("users");

	// get 10 most recent data points  for each source with the proper type
	var data = await source_coll.aggregate([ { '$match': { "type": type } },
        { '$lookup':
         	{'from':         "sensor-data",
         	 'let':          {'source_id': "$_id"},
         	 'pipeline': [
         	 	{'$match': 
         	 		{'$expr':
         	 			{'$eq': ['$sensor_id', '$$source_id']}
         	 		}
         	    },
         	  	{'$sort': {'date': -1}},
         	 	{'$limit': 10},
         	 ],
         	 'as':           "data",
         	}
        },
      ]).toArray();

	// get source ids associated with user
	var userSources = await user_coll.findOne({_id: req.user.sub}, {sources: 1});
	userSources = userSources.sources.filter((s)=>{return s.type == type});

	res.send(JSON.stringify({data: data, userSources: userSources}));
});


/* check if user exists in DB, if not add them */
app.post('/api/user', checkJwt, async (req, res) => {
	console.log("Checking user");
    let db = mongoUtils.getDb();
	console.log(req.user);
    const  userinfo =  db.collection('users');
     var query = {_id: req.user.sub};
     var docs = await userinfo.findOne(query);
     console.log(docs);
     if (docs == null) {
     	userinfo.insertOne(
     	{
	        _id: req.user.sub,
	        first_name: req.user.given_name,
	        last_name: req.user.family_name,
	        sources: [],
        },
        (err, docs) => {
            if (err) throw err;
        });
     }
     else {
     	console.log(`Successfully found user ${docs}`);
     }
    
     
     res.sendStatus(200);
});

// Update sources of one type associated with user
app.put('/api/sources', checkJwt, async (req, res) => {
  console.log("updating sources");
  var type = req.body.type;

  let db = mongoUtils.getDb();
  const  userinfo =  db.collection('users');
  var docs = await userinfo.findOne({_id: req.user.sub});
  var sources = [...docs.sources];
  sources = sources.filter((s) => {return (s.type != type)});
  for (source of req.body.sources) {
  	sources.push({type: type, id: source});
  }

  docs = await userinfo.updateOne({_id: req.user.sub}, {
  	"$set" : {
  		"sources": sources,
  	}
  });

  res.sendStatus(200);
});

mongoUtils.connectToServer( function( err, client ) {
  if (err) console.log(err);
  console.log("connected to mongoDB");
  // run sensor simulators
  //const sims = require('./temp_and_hum_sim.js');
  app.listen(port, () => console.log(`listening on port ${port}!`));
} );
