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

app.get('/api/user_data', checkJwt, (req, res) => {
	// check if user is in db
	// if not, create entry

	//send back 
});

app.get('/api/hello', checkJwt,  (req, res) => {
	console.log(req.user)
	res.send('Hello World!')
});


/* check if user exists in DB, if not add them */
app.post('/api/user', checkJwt, (req, res) => {
	// var selector = {_id : req.user.sub };
	console.log(req.user);
	res.send(200);
	// client.connect(err => {
	//   const collection = client.db("senior-design-mp").collection("users");
	//   collection.update(
	//   	selector,
	//   	{setOnInsert: { 
	//   		_id: req.user.sub,
	//   		source_ids : {}, 
	//   		}
	//   	},
	//   	{upsert: true},
	//   	(err, res) => {
	// 	    if (err) throw err;
	// 	    client.close();
	// 	    res.send(200);
	// 	});
	// });
});


mongoUtils.connectToServer( function( err, client ) {
  if (err) console.log(err);
  console.log("connected to mongoDB");
  const sims = require('./temp_and_hum_sim.js');
  app.listen(port, () => console.log(`listening on port ${port}!`));
} );




