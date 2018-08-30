const conf = require('./config');
const sendMail = require('./send');

const config = function initialize(mailConfig) {
  conf.set(mailConfig);
  return sendMail;
};

module.exports = config;
