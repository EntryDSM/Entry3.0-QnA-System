const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to db server');
});

mongoose.connect(process.env.DB_ADDR, { useNewUrlParser: true });
