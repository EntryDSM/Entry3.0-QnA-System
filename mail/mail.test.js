require('dotenv').config();

const config = {
  mailer: {
    service: 'Gmail',
    host: 'localhost',
    port: '465',
    user: process.env.EMAIL,
    password: process.env.PASSWORD
  }
};
const sendmail = require('../mail')(config);
const assert = require('assert');

describe('Mail module test', () => {
  it('should be send email', done => {
    sendmail(
      'krlrhkstk@naver.com', 
      'entrydsmqa@gmail.com', 
      '테스트입니다', 
      'foovar', 
      (err, res) => {
        if (err) {
          assert.equal(true, err);
        } else {
          done();
        }
      });
  }).timeout(6000);
});
