const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
  value: String,
});

module.exports = mongoose.model('auth', authSchema);
