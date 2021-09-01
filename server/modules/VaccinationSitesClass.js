const VaccinationSites = require('../models/VaccinationSites');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

class VaccinationSitesClass {

  constructor (data) {
    this.vaccinationSitesID = (data.vaccinationSitesID)?data.vaccinationSitesID:'';
    this.code = (data.code)?data.code:'';
    this.codeShort = (data.codeShort)?data.codeShort:'';
    this.name = (data.name)?data.name:'';
    this.type = (data.type)?data.type:'';
    this.ownership = (data.ownership)?data.ownership:'';
    this.address = (data.address)?data.address:{
      longitude: "",
      latitude: "",

      addressLine: "",
      building: "",
      region: {
        name: "",
        pegc: "",
      },
      province: {
        name: "",
        pegc: "",
      },
      munCity: {
        name: "",
        pegc: "",
      },
      barangay: {
        name: "",
        pegc: "",
      },
    };
    this.supervisor = (data.supervisor)?data.supervisor:{
      name: {
        first: "",
        mid:   "",
        last:  "",
      },
      contact: "",
      email: "",
    };
    this.representativeStaff = (data.representativeStaff)?data.representativeStaff:{
      name: {
        first: "",
        mid:   "",
        last:  "",
      },
      contact: "",
      email: "",
    };
    this.inventoryStaff = (data.inventoryStaff)?data.inventoryStaff:{
      name: {
        first: {type: String},
        mid:   {type: String},
        last:  {type: String},
      },
      contact: {type: String},
      email: {type: String},
    };
    this.status = (data.status)?data.status:'';
    this.inactiveNote = (data.inactiveNote)?data.inactiveNote:'';
    this.numberOfTeams = (data.numberOfTeams)?data.numberOfTeams:'';
    this.addedBy = (data.addedBy)?data.addedBy:'';
    this.dateReported = (data.dateReported)?data.dateReported:'';
    this.updatedBy = (data.updatedBy)?data.updatedBy:'';
    this.dateUpdated = (data.dateUpdated)?data.dateUpdated:'';
    this._id = (data._id)?data._id:'';
  }

  save () {
    return new Promise ((resolve, reject) => {
      var newVaccinationSites = new VaccinationSites({
        vaccinationSitesID: this.vaccinationSitesID,
        code: this.code,
        codeShort: this.codeShort,
        name: this.name,
        type: this.type,
        ownership: this.ownership,
        address: this.address,
        supervisor: this.supervisor,
        representativeStaff: this.representativeStaff,
        inventoryStaff: this.inventoryStaff,
        status: this.status,
        inactiveNote: this.inactiveNote,
        numberOfTeams: this.numberOfTeams,
        addedBy: this.addedBy,
        dateReported: this.dateReported,
        updatedBy: this.updatedBy,
        dateUpdated: this.dateUpdated,
      });
      newVaccinationSites.save()
        .then((data) => {
          resolve(data);
        })
    }); // end promise
  }

  update (){
    return new Promise ((resolve, reject) => {
      VaccinationSites.findById(this._id, (err, vaccinationSites) => {
        vaccinationSites.vaccinationSitesID = this.vaccinationSitesID;
        vaccinationSites.code = this.code;
        vaccinationSites.codeShort = this.codeShort;
        vaccinationSites.name = this.name;
        vaccinationSites.type = this.type;
        vaccinationSites.ownership = this.ownership;
        vaccinationSites.address = this.address;
        vaccinationSites.supervisor = this.supervisor;
        vaccinationSites.representativeStaff = this.representativeStaff;
        vaccinationSites.inventoryStaff = this.inventoryStaff;
        vaccinationSites.status = this.status;
        vaccinationSites.inactiveNote = this.inactiveNote;
        vaccinationSites.numberOfTeams = this.numberOfTeams;
        vaccinationSites.addedBy = this.addedBy;
        vaccinationSites.dateReported = this.dateReported;
        vaccinationSites.updatedBy = this.updatedBy;
        vaccinationSites.dateUpdated = this.dateUpdated;
        vaccinationSites.save();
      })
        .then(() => resolve({ status: true }))
        .catch(err => {
            reject({ status: false });
        });
    }); // end promise
  }

    static count (filter = {}) {
      return new Promise (resolve => {
        VaccinationSites
          .find(filter)
          .count()
          .then(count => {
            resolve(count)
          })
      })
    }

    static getVaccinationSitess (page = 1, count = 10, filter = {}, sort = {'code': 1}, select = []) {
      return new Promise ((resolve, reject) => {
        VaccinationSites
          .find(filter)
          .sort(sort)
          .select(select)
          .skip((page*count) - count)
          .limit(count)
          .then(data => {
            resolve(data)
          }).
          catch(err => {
            reject({
              status: false,
              error: err
            })
          })
      })
    }

    static getVaccinationSitesDetail (cond) {
      return new Promise (resolve => {
        VaccinationSites
          .find(cond)
          .then(data => {
            resolve(data)
          })
      })
    }

  }

module.exports = VaccinationSitesClass;