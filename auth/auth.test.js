require('./connectDB');
require('dotenv').config();
const keygen = require('../auth');

describe('Auth module test', () => {
  it('should be generate key', done => {
    keygen.getKey((err, key) => {
      if (err) {
        
      } else {
        console.log('KEY: ', key);
        done();
      }
    });
  });
  
  it('should be checked', done => {
    keygen.checkKey("cIcCRlTkEuqx41QvGcmLTAYDVC4YqN2W", (err, key) => {
      if (err) {

      } else {
        console.log('FOUND: ', key);
        done();
      }
    });
  });
});