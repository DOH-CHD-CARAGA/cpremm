const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Sample = new Schema({
  name: {type: String},
  age: {type: Number},
});

module.exports = mongoose.model('samples', Sample);
