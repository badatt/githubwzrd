const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const strategies = require('./passport');
const routes = require('../api/routes/v1');

/**
 * Express instance
 * @public
 */
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// mount api v1 routes
app.use('/v1', routes);

module.exports = app;
