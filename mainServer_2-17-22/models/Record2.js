const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Records2 = new Schema({
  recordID: {type: String},
  prevRecordId: {type: Schema.Types.ObjectId, ref: 'records'},
  userPAR: {type: Schema.Types.ObjectId, ref: 'users'},
  userCO: {type: Schema.Types.ObjectId, ref: 'users'},
  office: {type: Schema.Types.ObjectId, ref: 'offices'},
  text: {
    userPAR: {type: String},
    userCO: {type: String},
    division: {type: String},
    section: {type: String},  
  },

  devices: {
    desktop: {type: Schema.Types.ObjectId, ref: 'devices'},
    printer: {type: Schema.Types.ObjectId, ref: 'devices'},
    scanner: {type: Schema.Types.ObjectId, ref: 'devices'},
    monitor: {type: Schema.Types.ObjectId, ref: 'devices'},
    avr: {type: Schema.Types.ObjectId, ref: 'devices'},
    ups: {type: Schema.Types.ObjectId, ref: 'devices'},
    router: {type: Schema.Types.ObjectId, ref: 'devices'},
    camera: {type: Schema.Types.ObjectId, ref: 'devices'},
    speaker: {type: Schema.Types.ObjectId, ref: 'devices'},
    tablet: {type: Schema.Types.ObjectId, ref: 'devices'},
  },

  otherDevices: [{
    _id: false,
    device: {type: Schema.Types.ObjectId, ref: 'devices'},    
  }],
  
  actions: [{
    _id: false,
    propertyCode: {type: String},
    actionTaken:  {type: String},
    findings:     {type: String},
    item:         {type: String},
    date:         {type: Date},
  }],

  createdAt: {type: Date}, 
});

//DUMMY ID for USER 5ecbe630950bc266588a194f
module.exports = mongoose.model('records2', Records2);
