const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const conf = require('./config');

const sendMail = (dest, src, subject, text, callback) => {
  const mailopt = {
    to: dest,
    from: src,
    subject,
    text,
  };
  const config = conf.get();
  const transporter = nodemailer.createTransport(smtpPool({
    service: config.mailer.service,
    host: config.mailer.host,
    port: config.mailer.port,
    auth: {
      user: config.mailer.user,
      pass: config.mailer.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
    maxConnections: 5,
    maxMessages: 10,
  }));

  transporter.sendMail(mailopt, (err, res) => {
    callback(err, res);
    transporter.close();
  });
};

module.exports = sendMail;
