// TODO
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

const routes = require('./routes');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '3mb'}));
app.use(cookieParser());

mongoose.connect('mongodb://localhost/alchemy', { promiseLibrary: bluebird });

routes(app); // initialize routes

module.exports = app;
