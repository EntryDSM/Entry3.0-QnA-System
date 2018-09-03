const assert = require('assert');
require('dotenv').config();
require('../auth/connectDB');

const keygen = require('../auth');

describe('Auth module test', () => {
  it('should be generate key', () => {
    const key = keygen.getKey();
    console.log(key);
    assert.notEqual(key, '');
  });
});
