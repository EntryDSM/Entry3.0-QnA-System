let config = { };

const set = function setConfig(newConfig) {
  config = setConfig;
};

const get = function getConfig() {
  return config;
}

module.exports = {
  get,
  set
};