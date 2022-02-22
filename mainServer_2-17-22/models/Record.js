const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Records = new Schema({
  number: {type: Number},
  propertyCode: {type: String},
  dateAcquired: {type: String},
  userPAR: {type: String},
  userCO: {type: String},
  division: {type: String},
  section: {type: String},
  unitType: {type: String},
  serial: {type: String},
  brand: {type: String},
  model: {type: String},
  mac: {type: String},
  ip: {type: String},
  no: {type: Number},
  donated: {type: String},
  purchased: {type: String},
  specs: {
    hWare: {
      cpu: {type: String},
      motherBoord: {type: String},
      processor: {type: String},
      memoryCard: {type: String},
      hdd: {type: String},
      ram: {type: String},
      monitor: {
        status: {type: Number}, //1 ACTIVE, 0 INACTIVE
        propertyCode: {type: String},
        serial: {type: String},
        brand: {type: String},
        size: {type: String},
        remarks: {type: String},
      },
      keyboard: {
        brand: {type: String},
        serial: {type: String},
      },
      mouse: {
        brand: {type: String},
        serial: {type: String},
      },
      avr: {
        status: {type: Number}, //1 ACTIVE, 0 INACTIVE
        propertyCode: {type: String},
        serial: {type: String},
        dateAcquired: {type: Date},
        brand: {type: String},
        remarks: {type: String},
      },
      ups: {
        status: {type: Number}, //1 ACTIVE, 0 INACTIVE
        propertyCode: {type: String},
        serial: {type: String},
        // dateAcquired: {type: Date},
        brand: {type: String},
        remarks: {type: String},
      },
      router: {
        status: {type: Number}, //1 ACTIVE, 0 INACTIVE
        propertyCode: {type: String},
        serial: {type: String},
        // dateAcquired: {type: Date},
        brand: {type: String},
        remarks: {type: String},
      },
      camera: {
        status: {type: Number}, //1 ACTIVE, 0 INACTIVE
        propertyCode: {type: String},
        serial: {type: String},
        // dateAcquired: {type: Date},
        brand: {type: String},
        remarks: {type: String},
      },
      speaker: {
        status: {type: Number}, //1 ACTIVE, 0 INACTIVE
        propertyCode: {type: String},
        serial: {type: String},
        // dateAcquired: {type: Date},
        brand: {type: String},
        remarks: {type: String},
      },
      tablet: {
        status: {type: Number}, //1 ACTIVE, 0 INACTIVE
        propertyCode: {type: String},
        serial: {type: String},
        // dateAcquired: {type: Date},
        brand: {type: String},
        remarks: {type: String},
      },
      scanner: {
        status: {type: Number}, //1 ACTIVE, 0 INACTIVE
        number: {type: Number},
        brand: {type: String},
        serial: {type: String},
        propertyCode: {type: String},
        remarks: {type: String},
      },
      printer: {
        status: {type: Number},
        built: {type: String},
        name: {type: String},
        code: {type: String},
        serial: {type: String},
        remarks: {type: String},
      },
      dateChecked: {
				motherBoard: {type: Date},
				processors: {type: Date},
				memCards: {type: Date},
				hardDisk: {type: Date},
        monitor: {type: Date},
				ups: {type: Date},
				router: {type: Date},
				camera: {type: Date},
				speaker: {type: Date},
				tablet: {type: Date},
				avr: {type: Date},
				keyboardMouse: {type: Date},
				printers: {type: Date},
				scanners: {type: Date},
			}
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
  office: {type: Schema.Types.ObjectId, ref: 'offices'},
  endUser: {
    userCo: {type: Schema.Types.ObjectId, ref: 'users'},
    userPAR: {type: Schema.Types.ObjectId, ref: 'users'}
  },
  actions: [{
    _id: false,
    propertyCode: {type: String},
    actionTaken:  {type: String},
    findings:     {type: String},
    item:         {type: String},
    date:         {type: Date},
  }],
  otherEquipments: [{
    _id: false,
    // itemDescription: {type: String},
    // specification:  {type: String},
    // serial:     {type: String},
    type: {type: String},
    serial: {type: String},
    propertyNo: {type: String},

    user: {type: String},
    antiVirus: {type: String},
    brand: {type: String},
    status: {type: Number},
    hdd: {type: String},
    mac: {type: String},
    office: {type: String},
    os: {type: String},
    processor: {type: String},
    ram: {type: String},
    remarks: {type: String},
    yearAcquired: {type: String},
  }],
  otherEquipmentsTemp: [{
    _id: false,
    // itemDescription: {type: String},
    // specification:  {type: String},
    // serial:     {type: String},
    type: {type: String},
    serial: {type: String},
    propertyNo: {type: String},

    user: {type: String},
    antiVirus: {type: String},
    brand: {type: String},
    status: {type: Number},
    hdd: {type: String},
    mac: {type: String},
    office: {type: String},
    os: {type: String},
    processor: {type: String},
    ram: {type: String},
    remarks: {type: String},
    yearAcquired: {type: String},
  }],

  under: {type: Number},
  no: {type: Number},

});

//DUMMY ID for USER 5ecbe630950bc266588a194f

module.exports = mongoose.model('records', Records);
