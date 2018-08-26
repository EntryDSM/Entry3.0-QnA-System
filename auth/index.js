const keygen = require('keygen');
const AuthDB = require('./DAL');

let lock = false;

const lockByTime = function (time) {
  setTimeout(() => { lock = true }, time);
};

const getKey = function generator(callback) {
  if (lock) return;
  const key = keygen._({ length: 32 });
  const authdb = new AuthDB();
  authdb.value = key;
  authdb.save((err) => {
    callback(err, key);
  });
  lock = true;
  lockByTime(10*1000);
};

const checkKey = function ckecker(key, callback) {
  AuthDB.findOne({ value: key }, callback);
};

module.exports = {
  getKey,
  checkKey
};