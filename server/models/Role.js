const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Role = new Schema({
  name: {type: String},
	routes: [
    {
      _id: false,
      path: {type: String}
    }
  ],
  systems: [
    {
      _id: false,
      path: {type: String}
    }
  ]
});

module.exports = mongoose.model('roles', Role);
