const Record = require('../models/Record2');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

class Record2Class {

  constructor (data) {
    this._id = (data._id)?data._id:"";
    this.prevRecordId = (data.prevRecordId && JSON.stringify(data.prevRecordId) != '{}')?data.prevRecordId:null;
    this.recordID = (data.recordID)?data.recordID:"";
    this.userPAR = data.userPAR;
    this.userCO = data.userCO;
    this.office = data.office;
    this.text = {
      userPAR: (data.text.hasOwnProperty("userPAR"))?data.text.userPAR:"",
      userCO: (data.text.hasOwnProperty("userCO"))?data.text.userCO:"",
      division: (data.text.hasOwnProperty("division"))?data.text.division:"",
      section: (data.text.hasOwnProperty("section"))?data.text.section:"",  
    };
  
    this.devices = {
      desktop: (data.devices.hasOwnProperty("desktop"))?data.devices.desktop:null,
      printer: (data.devices.hasOwnProperty("printer"))?data.devices.printer:null,
      scanner: (data.devices.hasOwnProperty("scanner"))?data.devices.scanner:null,
      monitor: (data.devices.hasOwnProperty("monitor"))?data.devices.monitor:null,
      avr: (data.devices.hasOwnProperty("avr"))?data.devices.avr:null,
      ups: (data.devices.hasOwnProperty("ups"))?data.devices.ups:null,
      projector: (data.devices.hasOwnProperty("projector"))?data.devices.projector:null,
      router: (data.devices.hasOwnProperty("router"))?data.devices.router:null,
      camera: (data.devices.hasOwnProperty("camera"))?data.devices.camera:null,
      peaker: (data.devices.hasOwnProperty("speaker"))?data.devices.speaker:null,
      tablet: (data.devices.hasOwnProperty("tablet"))?data.devices.tablet:null,
    };



    this.otherDevices = (data.otherDevices)?data.otherDevices:[];
    this.actions = (data.actions)?data.actions:[];

  }

  save () {

    return new Promise ((resolve, reject) => {

      var newRecord = new Record({
        prevRecordId: this.prevRecordId,
        recordID: this.recordID,
        userPAR: this.userPAR,
        userCO: this.userCO,
        office: this.office,
        text: this.text,
        devices: this.devices,
        otherDevices: this.otherDevices,
        actions: this.actions,
      });

      newRecord.save()
        .then((data) => {
          console.log("____!!!!!!!");
          console.log(this);
          resolve(data);
        })
    }); // end promise
  }

  update (){
    return new Promise ((resolve, reject) => {
      Record.findById(this._id, (err, record) => {
        record.prevRecordId = this.prevRecordId;
        record.recordID = this.recordID;
        record.userPAR = this.userPAR;
        record.userCO = this.userCO;
        record.office = this.office;
        record.text = this.text;
        record.devices = this.devices;
        record.otherDevices = this.otherDevices;
        record.actions = this.actions;
        record.save();
      })
        .then(() => resolve({ status: true }))
        .catch(err => {
            reject({ status: false });
        });

    }); // end promise
  }
  ///================ static methods ======================

    static count (filter = {}) {

      return new Promise (resolve => {
        Record
          .find(filter)
          .count()
          .then(count => {
            resolve(count)
          })
      })
    }

    static getRecords (page = 1, count = 10, filter = {}, sort = {'text.division': 1}, select = []) {

      console.log(":::::::::::::::::::::::::::::::::;");
      console.log(filter);

      return new Promise ((resolve, reject) => {
        try{
        Record
          .aggregate([
            {
              $lookup: {
                from: 'users', localField: 'userCO', foreignField: '_id', as: 'endUser.userCO'             
              }
            },  
            {
              $lookup: {
                from: 'users', localField: 'userPAR', foreignField: '_id', as: 'endUser.userPAR'             
              }
            },  
            {
              $lookup: {
                from: 'offices', localField: 'office', foreignField: '_id', as: 'office'             
              }
            }, 


            {
              $lookup: {
                from: 'devices', localField: 'devices.desktop', foreignField: '_id', as: 'devices.desktop'             
              }
            }, 
            {
              $lookup: {
                from: 'devices', localField: 'devices.printer', foreignField: '_id', as: 'devices.printer'             
              }
            }, 
            {
              $lookup: {
                from: 'devices', localField: 'devices.scanner', foreignField: '_id', as: 'devices.scanner'             
              }
            }, 
            {
              $lookup: {
                from: 'devices', localField: 'devices.monitor', foreignField: '_id', as: 'devices.monitor'             
              }
            }, 
            {
              $lookup: {
                from: 'devices', localField: 'devices.avr', foreignField: '_id', as: 'devices.avr'             
              }
            }, 
            {
              $lookup: {
                from: 'devices', localField: 'devices.ups', foreignField: '_id', as: 'devices.ups'             
              }
            },
            {
              $lookup: {
                from: 'devices', localField: 'devices.projector', foreignField: '_id', as: 'devices.projector'             
              }
            },
            {
              $lookup: {
                from: 'devices', localField: 'devices.router', foreignField: '_id', as: 'devices.router'             
              }
            },
            {
              $lookup: {
                from: 'devices', localField: 'devices.camera', foreignField: '_id', as: 'devices.camera'             
              }
            },
            {
              $lookup: {
                from: 'devices', localField: 'devices.speaker', foreignField: '_id', as: 'devices.speaker'             
              }
            },
            {
              $lookup: {
                from: 'devices', localField: 'devices.tablet', foreignField: '_id', as: 'devices.tablet'             
              }
            },
            // { "$unwind": "$otherDevices" },
            {
              $lookup: {
                from: 'devices', localField: 'otherDevices.device', foreignField: '_id', as: 'otherDevices'            
              }
            }, 
            {
              $project: {
                division:  { $arrayElemAt: [ "$office.division", 0 ] },
                section: { $arrayElemAt: [ "$office.section", 0 ] },
                officeID: { $arrayElemAt: [ "$office._id", 0 ] },
                office: { $arrayElemAt: [ "$office", 0 ] },
                endUser: {
                  userPAR: { $arrayElemAt: [ "$endUser.userPAR", 0 ] },
                  userCO: { $arrayElemAt: [ "$endUser.userCO", 0 ] }
                },
                text: 1,
                recordID: 1,
                devices: {
                  desktop: { $arrayElemAt: [ "$devices.desktop", 0 ] },
                  printer: { $arrayElemAt: [ "$devices.printer", 0 ] },
                  scanner: { $arrayElemAt: [ "$devices.scanner", 0 ] },
                  monitor: { $arrayElemAt: [ "$devices.monitor", 0 ] },
                  avr: { $arrayElemAt: [ "$devices.avr", 0 ] },
                  ups: { $arrayElemAt: [ "$devices.ups", 0 ] },
                  projector: { $arrayElemAt: [ "$devices.projector", 0 ] },
                  router: { $arrayElemAt: [ "$devices.router", 0 ] },
                  camera: { $arrayElemAt: [ "$devices.camera", 0 ] },
                  speaker: { $arrayElemAt: [ "$devices.speaker", 0 ] },
                  tablet: { $arrayElemAt: [ "$devices.tablet", 0 ] },
                },
                otherDevices: 1,
                actions: 1,
                prevRecordId: 1,

              }
            },
            {
              $match: {
                ...filter
              }
            },
          ])
          .sort(sort)
          .skip((page*count) - count)
          .limit(count)
          .then(data => {
            console.log(":(((((((((()))))))))))))))))))))0")
            console.log(data)
            resolve(data)
          }).
          catch(err => {
            reject({
              status: false,
              error: err
            })
          })
        }catch(e) {
        }

      }) 

    }

    static getRecordDetail (cond) {
      return new Promise (resolve => {
        Record
          .find(cond)
          .then(data => {
            resolve(data)
          })
      })
    }


    static deleteRecord (id) {
      return new Promise (resolve => {
        Record
          .findByIdAndDelete(id, (err) => {
            if (err) {
              resolve({success: false})
            } else {
              resolve({success: true})
            }
          });
      })
    }

  }

module.exports = Record2Class;
