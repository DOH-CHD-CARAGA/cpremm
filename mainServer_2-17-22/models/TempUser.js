const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const User = new Schema({
  username: {type: String},
  password: {type: String},

	name: {
    first: {type: String},
    mid: {type: String},
    last: {type: String},
  },

  designation: {type: String},
  status: {type: String},

  office: {type: Schema.Types.ObjectId, ref: 'offices'},
  role: {type: Schema.Types.ObjectId, ref: 'roles'},  

});

module.exports = mongoose.model('users', User);
