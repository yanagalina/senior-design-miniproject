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

//var db = mongoUtils.getDb();
var check = 10;


app.get('/api/user', checkJwt, (req, res) => {
        let db = mongoUtils.getDb();
        const user_coll = db.collection("users");
        res.send(user_coll);
        console.log(req.user.given_name)
    // check if user is in db
	// if not, create entry
	//send back 
});

app.get('/api/hello', checkJwt,  (req, res) => {
	console.log(req.user.family_name)
	res.send('Hello World!')
});

app.get('/api/sources', checkJwt, async (req, res) => {
	let db = mongoUtils.getDb();
	const source_coll = db.collection("sensor-sources");
	var sources = await source_coll.find({}, {name: 1, type: 1}).toArray();
	res.send(sources);
});

/* check if user exists in DB, if not add them */
app.post('/api/user', checkJwt, (req, res) => {
         let db = mongoUtils.getDb();
	console.log(req.user);
         const  userinfo =  db.collection('users');
        
         var query = {_id: req.user.sub};
         userinfo.findOne(query)
         .then(result => {
               if (result){
                console.log(`Successfully found document: ${result}.`)
        }else{
         userinfo.insertOne({
            _id: req.user.sub,
            first_name: req.user.given_name,
            last_name: req.user.family_name,
            value: check,
                            },(err, docs) => {
                                if (err) throw err;
                                    });
            console.log(req.user.given_name)
                            }
               })
         res.send(200);
         
        
//    userinfo.updateOne(
//        {_id: req.user.sub,
//       // {$setonInsert:
//        first_name: req.user.given_name,
//        last_name: req.user.family_name },
//        {upsert: true},
//        (err, docs) => {
//        if (err) throw err;
//        });
console.log(req.user.family_name);
});

mongoUtils.connectToServer( function( err, client ) {
  if (err) console.log(err);
  console.log("connected to mongoDB");
  // const sims = require('./temp_and_hum_sim.js');
  app.listen(port, () => console.log(`listening on port ${port}!`));
} );
