const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HealthFacility = new Schema({

  healthFacilityID : {type: String},
  region : {type: String, default: 'CARAGA'},
  province : {type: String},
  munCity : {type: String},
  category : {type: String},
  ownership : {type: String},
  name : {type: String},
  contact : {type: String},
  email : {type: String},
  focals : [{
    name : {type: String},
    contact : {type: String},
    email : {type: String},  
  }],

});
module.exports = mongoose.model('healthfacility', HealthFacility);