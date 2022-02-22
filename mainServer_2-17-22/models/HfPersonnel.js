const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HfPersonnel = new Schema({
  province: {type: String},
  facility: {type: String},
  hfPersonnelID : {type: String},
  category : {type: String},
  categoryID : {type: String},
  categoryIDNumber : {type: String},
  philHealthID : {type: String},
  pwdID : {type: String},
  name : {
    first: {type: String},
    mid: {type: String},
    last: {type: String},
    suffix: {type: String},
  },
  contactNo : {type: String},
  address : {
    fullAddress: {type: String},
    region: {type: String},
    province: {type: String},
    munCity: {type: String},    
    barangay: {type: String},    
  },
  sex : {type: String},
  birthdate : {type: Date},
  status : {type: String},
  employment : {
    employed: {type: String},
    profession: {type: String},
    employerName: {type: String},
    employerLGU: {type: String},
    employerAddress: {type: String},
    contactNo: {type: String},
  },
  covidDetails: {
    directCovid: {type: String},
    covidHistory: {type: String},
    covidDate: {type: Date},
    classification: {type: String},
  },

  allergy: {
    drug: {type: String},
    food: {type: String},
    insect: {type: String},
    latex: {type: String},
    mold: {type: String},
    pet: {type: String},
    pollen: {type: String},
  },

  comorbidities: {
    with: {type: String},
    hypertension: {type: String},
    heartDisease: {type: String},
    kidneyDisease: {type: String},
    diabetesMellitus: {type: String},
    bronchialAsthma: {type: String},
    immunodeficiencyStatus: {type: String},
    cancer: {type: String},
    others: {type: String},
  },
  
  pregStatus: {type: String},
  consent: {type: String},

  createdAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('hfpersonnel', HfPersonnel);