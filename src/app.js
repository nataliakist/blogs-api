const express = require('express');
const Login = require('./controllers/Login');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', Login.tokenGenerator);

module.exports = app;
