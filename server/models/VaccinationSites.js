const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VaccinationSites = new Schema({

  vaccinationSitesID : {type: String},
  code : {type: String},
  codeShort : {type: String},
  name : {type: String},
  type : {type: String},
  ownership : {type: String},
  address : {
    longitude: {type: String},
    latitude: {type: String},

    addressLine: {type: String},
    building: {type: String},
    region: {
      name: {type: String},
      psgc: {type: String},
    },
    province: {
      name: {type: String},
      psgc: {type: String},
    },
    munCity: {
      name: {type: String},
      psgc: {type: String},
    },
    barangay: {
      name: {type: String},
      psgc: {type: String},
    },
  },
  supervisor : {
    name: {
      first: {type: String},
      mid:   {type: String},
      last:  {type: String},
    },
    contact: {type: String},
    email: {type: String},
  },
  representativeStaff : {
    name: {
      first: {type: String},
      mid:   {type: String},
      last:  {type: String},
    },
    contact: {type: String},
    email: {type: String},
  },
  inventoryStaff : {
    name: {
      first: {type: String},
      mid:   {type: String},
      last:  {type: String},
    },
    contact: {type: String},
    email: {type: String},
  },
  
  status : {type: String},
  inactiveNote : {type: String},
  numberOfTeams : {type: String},
  addedBy : {type: String},
  dateReported : {type: String},
  updatedBy : {type: String},
  dateUpdated : {type: String},
});

module.exports = mongoose.model('vaccinationsites', VaccinationSites);