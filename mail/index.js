let conf = require('./config');
let sendMail = require('./send');

const config = function initialize(config) {
  conf.set(config);
  return sendMail;
}

module.exports = config;