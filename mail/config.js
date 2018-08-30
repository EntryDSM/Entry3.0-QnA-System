let config = { };

const set = function setConfig(newConfig) {
  if (!Object.prototype.hasOwnProperty.call(newConfig, 'mailer')) {
    throw new Error('Mail module: config must have mailer property');
  }
  const mailerOpt = newConfig.mailer;
  const isError = !Object.prototype.hasOwnProperty.call(mailerOpt, 'service')
  || !Object.prototype.hasOwnProperty.call(mailerOpt, 'host')
  || !Object.prototype.hasOwnProperty.call(mailerOpt, 'port')
  || !Object.prototype.hasOwnProperty.call(mailerOpt, 'user')
  || !Object.prototype.hasOwnProperty.call(mailerOpt, 'password');
  if (isError) {
    throw new Error('Mail module: config must have property for options');
  }
  config = newConfig;
};

const get = function getConfig() {
  return config;
};

module.exports = {
  get,
  set,
};
