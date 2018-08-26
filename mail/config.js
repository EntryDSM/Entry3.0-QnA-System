let config = { };

const set = function setConfig(newConfig) {
  config = newConfig;
};

const get = function getConfig() {
  return config;
}

module.exports = {
  get,
  set
};