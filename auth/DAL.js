let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let authSchema = Schema({
  value: String
});

module.exports = mongoose.model('auth', authSchema);