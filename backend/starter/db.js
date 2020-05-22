/* eslint-disable no-process-env*/
const winston = require('winston');
const debug = require('debug')('debug');
const mongoose = require('mongoose');
let mongoURI = '';
if (process.env.NODE_ENV === 'production') {
  mongoURI = `mongodb+srv://${process.env.MONGO_ATLAS_USER_NAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0-ekat5.mongodb.net/test?retryWrites=true`;
} else if (process.env.NODE_ENV === 'staging') {
  mongoURI = `mongodb+srv://${process.env.MONGO_ATLAS_USER_NAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0-ekat5.mongodb.net/test?retryWrites=true`;
} else if (process.env.NODE_ENV === 'development') {
  mongoURI = `mongodb://localhost:27017/recipebook`;
}

module.exports = ((app) => {
  const mongooseConnection = mongoose.connect(mongoURI, {
    // options are set uppon: https://mongoosejs.com/docs/deprecations.html
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  if (process.env.NODE_ENV === 'production') {
    mongooseConnection.then(() => {
      winston.info('Connected to MongoDB database...');
      mongoose.set('autoIndex', false);
    });

  }
  if (process.env.NODE_ENV === 'development') {
    mongooseConnection.then(() => {
      debug('Connected to MongoDB database...');
      // mongoose.set('debugs', true);
    });
  }
});
