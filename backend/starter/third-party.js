/* eslint-disable no-process-env*/
const debug = require('debug')('debug');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const limiterHandler = require('../middleware/limiter');
const slowDown = require('express-slow-down');
const limiter = slowDown({
  windowMs: 1 * 60 * 1000, // 1 minutes
  delayAfter: 100, // allow 1000 requests per 1 minutes, then...
  delayMs: 100, // begin adding 100ms of delay per request above 1000:
});

module.exports = ((app) => {
  app.use(bodyParser.json());
  app.use(cors());
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(compression());
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
    app.use(limiter, limiterHandler);
  }
  if (process.env.NODE_ENV === 'development') {
    app.use(compression());
    app.use(limiter, limiterHandler);
  }
});

