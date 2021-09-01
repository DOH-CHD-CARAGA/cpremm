const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Devices = new Schema({
  type: {type: String},
  status: {type: Number, default: 1}, //1 ACTIVE, 0 INACTIVE
  propertyCode: {type: String},
  serial: {type: String},
  dateAcquired: {type: Date, default: new Date},
  brand: {type: String},
  model: {type: String},
  remarks: {type: String},

  donated: {type: String},
  cost: {type: String},
  size: {type: String},
  
  userPAR: {type: Schema.Types.ObjectId, ref: 'users'},
  userCO: {type: Schema.Types.ObjectId, ref: 'users'},
  office: {type: Schema.Types.ObjectId, ref: 'offices'},
  text: {
    userPAR: {type: String},
    userCO: {type: String},
    division: {type: String},
    section: {type: String},  
  },

  specs: {
    mac: {type: String},
    ip: {type: String},

    hWare: {
      cpu: {type: String},
      motherBoard: {type: String},
      processor: {type: String},
      hdd: {type: String},
      ram: {type: String},
    },
    sWare: {
      os: {
        name: {type: String},
        isLicensed: {type: Number}
      },
      msOffice: {
        name: {type: String},
        isLicensed: {type: Number}
      },
      antiVirus: {
        name: {type: String},
        isLicensed: {type: Number}
      },
      dateChecked: {
        os: {type: Date},
        office: {type: Date},
        antivirus: {type: Date},
      },
    }
  },
  
  checkups: [{
    date: {type: Date},
    actions: {type: String},
    category: {type: String},
    ITIncharge: {type: Schema.Types.ObjectId, ref: 'users'},
  }]

});

//DUMMY ID for USER 5ecbe630950bc266588a194f

module.exports = mongoose.model('devices', Devices);
