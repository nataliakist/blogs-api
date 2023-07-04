const express = require('express');
const Login = require('./controllers/Login');
const UserController = require('./controllers/UserController');
const validateEmail = require('./middlewares/validateEmail');
const validateUser = require('./middlewares/validateUser');
const validateToken = require('./middlewares/validateToken');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/user', validateToken, UserController.getAll);

app.post('/login', Login);

app.post('/user', validateEmail, validateUser, UserController.createUser);

module.exports = app;
