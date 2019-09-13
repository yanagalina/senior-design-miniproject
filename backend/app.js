const express = require('express');
const app = express();
const port = 2000;
const router = express.Router();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


// get data for plot
router.get('/getSourceData', (req, res) => {
 
});

app.get('/', (req, res) => res.send('Hello World!'));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://jenninorell.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'XoIGhJP4xwck7msV1lZ1RqTWAXyxEYOw',
  issuer: `https://jenninorell.auth0.com`,
  algorithms: ['RS256']
});

app.post('/', checkJwt, (req, res) => {
  const {title, description} = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name,
  };
  questions.push(newQuestion);
  res.status(200).send();
});

// insert a new answer to a question
app.post('/answer/:id', checkJwt, (req, res) => {
  const {answer} = req.body;

  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();

  question[0].answers.push({
    answer,
    author: req.user.name,
  });

  res.status(200).send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));