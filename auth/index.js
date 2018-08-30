const keygen = require('keygenerator');
const AuthDB = require('./DAL');
const authController = require('./auth.control');

let lock = false;

const lockByTime = (time) => {
  setTimeout(() => {
    lock = true;
  }, time);
};

const getKey = function generator() {
  if (lock) return '';
  const key = keygen._({ length: 32 });
  lock = true;
  lockByTime(10 * 1000);
  return key;
};

const checkKey = function ckeck(key, callback) {
  AuthDB.findOne({ value: key }, callback);
};

const isAdmin = function check(key) {
  return process.env.ADMIN_KEY === key;
};
 
module.exports = {
  getKey,
  checkKey,
  authController,
  isAdmin,
};
