let conf = require('./config');
let nodemailer = require('nodemailer');
let smtpPool = require('nodemailer-smtp-pool');

const sendMail = (src, dest, subject, text, callback) => {
  const mailopt = {
    src, 
    dest,
    subject,
    text
  };
  const config = conf.get();
  const transporter = nodemailer.createTransport(smtpPool({
    service: config.mailer.service,
    host: config.mailer.host,
    port: config.mailer.port,
    auth: {
      user: config.mailer.user,
      password: config.mailer.password
    },
    tls: {
      rejectUnauthorized: false
    },
    maxConnections: 5,
    maxMessages: 10
  }));
  transporter.sendMail(mailopt, (err, res) => {
    callback(err, res);
    transporter.close();
  });
};

module.exports = sendMail;