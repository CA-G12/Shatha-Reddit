const { join } = require('path');
require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { pageRouter, userRouter} = require('./routes');
const { handleClientError, handleServerError } = require('./controllers/error');
const app = express();

app.set('port', process.env.PORT || 7000);
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, '..', 'public')));
app.use(pageRouter);
app.use(userRouter)
app.use(handleClientError, handleServerError);

module.exports = app;
