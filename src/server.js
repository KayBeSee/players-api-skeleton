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

let dbUrl = 'mongodb://localhost/alchemy';

mongoose.connect(dbUrl, { promiseLibrary: bluebird });

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection is open to ', dbUrl);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection has occured '+err+' error');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection is disconnected due to application termination');
    process.exit(0);
  });
});

routes(app); // initialize routes

module.exports = app;
