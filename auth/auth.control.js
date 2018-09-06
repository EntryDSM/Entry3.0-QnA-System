const authKeygen = require('../auth');
const sendMailFactory = require('../mail');
const AuthDB = require('./DAL');

const mailConfig = {
  mailer: {
    service: 'Gmail',
    host: 'localhost',
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
};

const sendMail = sendMailFactory(mailConfig);

module.exports = function auth(req, res) {
  const { query: { email } } = req;
  const key = authKeygen.getKey();
  const authdb = new AuthDB();
  authdb.value = key;
  authdb.save((err) => {
    if (err) {
      res.status(500).send('');
    }
  });
  const mailopt = [email, process.env.EMAIL, 'EntryDSM 채팅 인증 코드입니다.', key];
  sendMail(...mailopt, (_err) => {
    if (_err) {
      res.status(500).send('');
    } else {
      res.status(201).send('');
    }
  });
};
