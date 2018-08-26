let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let authSchema = new Schema({
  value: String
});

module.exports = mongoose.model('entryqa', authSchema);