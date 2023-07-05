const express = require('express');
const Login = require('./controllers/Login');
const { UserRouter, CategoryRouter } = require('./routers');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/user', UserRouter);

app.use('/categories', CategoryRouter);

app.post('/login', Login);

module.exports = app;
