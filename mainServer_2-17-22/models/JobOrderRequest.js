const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const JobOrderRequest = new Schema({
  jobOrderRequestID: {type: String},
	requestingPersonnel: {
    id: {type: Schema.Types.ObjectId, ref: 'users'},
    name: {type: String},
    designation: {type: String},
    divSec: {type: String},
  },

  device: {type: Schema.Types.ObjectId, ref: 'devices'},
  natureOfComplaint: {type: String},

  requestDate: {type: Date},
  createdAt: {type: Date, default: Date.now},

  supervisor: {
    seen: {type: Date, default: null}, //kanus a nakita before ge approve
    dateApproved: {type: Date}, // kanus a ge approve
    id: {type: Schema.Types.ObjectId, ref: 'users'}, //kinsa nag approved
  },

  technician: {
    seen: {type: Date, default: null}, // kanus a nakita sa technician
    dateAction: {type: Date}, // kanus a na actionan
    id: {type: Schema.Types.ObjectId, ref: 'users'},
    actionDetails: {
      scopeOfWork:     {type: String},
      checkUpResult:   {type: String},
      recommendations: {type: String},
      specifications:  {type: String},
    },
  },

  status: {type: String, default: "pending"},

});

module.exports = mongoose.model('jobOrderRequests', JobOrderRequest);
