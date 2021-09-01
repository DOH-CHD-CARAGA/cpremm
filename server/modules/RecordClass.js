const Record = require('../models/Record');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
const ClassHelper = require('./ClassHelper');

class RecordClass {

  constructor (data) {
    console.log("--------------->>>>,,,");
    console.log(data.actions);
    this._id = (data._id)?data._id:"";
    this.actions = (data.actions)?data.actions:"";
    this.brand = (data.brand)?data.brand:"";
    this.model = (data.model)?data.brand:"";
    this.dateAcquired = (data.dateAcquired)?data.dateAcquired:null;
    this.division = (data.division)?data.division:"";
    this.donated = (data.donated)?data.donated:"";
    this.endUser = (data.endUser)?data.endUser:{};
    this.ip = (data.ip)?data.ip:"";
    this.mac = (data.mac)?data.mac:"";
    this.no = (data.no)?data.no:0;
    this.number = (data.number)?data.number:"";
    this.office = (data.office)?data.office:null;
    this.otherEquipments = (data.otherEquipments)?data.otherEquipments:[];
    this.otherEquipmentsTemp = (data.otherEquipmentsTemp)?data.otherEquipmentsTemp:[];
    this.propertyCode = (data.propertyCode)?data.propertyCode:"";
    this.purchased = (data.purchased)?data.purchased:"";
    this.section = (data.section)?data.section:"";
    this.serial = (data.serial)?data.serial:"";
    this.specs = (data.specs)?data.specs:{};
    this.under = (data.under)?data.under:0;
    this.unitType = (data.unitType)?data.unitType:"";
    this.userPAR = (data.userPAR)?data.userPAR:"";
    this.userCO = (data.userCO)?data.userCO:"";

  }

  save () {
    console.log("=================================");
    console.log(this.office);
    console.log(this.userPAR);
    return new Promise ((resolve, reject) => {
      var newRecord = new Record({
        number: this.number,
        propertyCode: this.propertyCode,
        dateAcquired: this.dateAcquired,
        userPAR: this.userPAR,
        userCO: this.userCO,
        division: this.division,
        section: this.section,
        unitType: this.unitType,
        serial: this.serial,
        brand: this.brand,
        model: this.model,
        mac: this.mac,
        ip: this.ip,
        specs: this.specs,
        office: this.office,
        endUser: this.endUser,
        donated: this.donated,
        purchased: this.purchased,
        actions: this.actions,
        under: this.under,
        otherEquipments: this.otherEquipments,
        otherEquipmentsTemp: this.otherEquipmentsTemp,
        no: this.no,
      });

      newRecord.save()
        .then((data) => {
          resolve(data);
        })
    }); // end promise
  }

  update (){
    return new Promise ((resolve, reject) => {
      console.log("----------------------::::+");
      console.log(this);
      Record.findById(this._id, (err, record) => {
        record.propertyCode = this.propertyCode;
        record.dateAcquired = this.dateAcquired;
        record.userPAR = this.userPAR;
        record.userCO = this.userCO;
        record.division = this.division;
        record.section = this.section;
        record.unitType = this.unitType;
        record.serial = this.serial;
        record.brand = this.brand;
        record.model = this.model;
        record.mac = this.mac;
        record.ip = this.ip;
        record.specs = this.specs;
        record.office = this.office;
        record.endUser = this.endUser;
        record.donated = this.donated;
        record.purchased = this.purchased;
        record.actions = this.actions;
        record.under = this.under;
        record.otherEquipments = this.otherEquipments;
        record.otherEquipmentsTemp = this.otherEquipmentsTemp;
        record.no = this.no;

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

    static async getRecords (page = 1, count = 10, filter = {}, sort = {'division': 1}, select = []) {

      // filter = await ClassHelper.arrangeFilter(filter, ["officeID"]);
      // console.log("------->>>><<<<-------");
      // console.log(filter);
      return new Promise ((resolve, reject) => {
        try{
        Record
          .aggregate([
            {
              $lookup: {
                from: 'users',
                localField: 'endUser.userCo',
                foreignField: '_id',
                as: 'endUser.userCo'             
              }
            },  
            {
              $lookup: {
                from: 'users',
                localField: 'endUser.userPAR',
                foreignField: '_id',
                as: 'endUser.userPAR'             
              }
            },  
            {
              $lookup: {
                from: 'offices',
                localField: 'office',
                foreignField: '_id',
                as: 'office'             
              }
            },
            {
              $project: {
                // division:  { $arrayElemAt: [ "$office.division", 0 ] },
                // section: { $arrayElemAt: [ "$office.section", 0 ] },
                officeID: { $arrayElemAt: [ "$office._id", 0 ] },
                office: { $arrayElemAt: [ "$office", 0 ] },
                endUser: {
                  userPAR: { $arrayElemAt: [ "$endUser.userPAR", 0 ] },
                  userCo: { $arrayElemAt: [ "$endUser.userCo", 0 ] }
                },

                division: 1,
                section: 1,
                office: 1,
                endUser: 1,
                number: 1,
                propertyCode: 1,
                dateAcquired: 1,
                userCO: 1,
                userPAR: 1,
                unitType: 1,
                serial: 1,
                brand: 1,
                model: 1,
                mac: 1,
                ip: 1,
                specs: 1,
                donated: 1,
                purchased: 1,
                actions: 1,
                no: 1,
                under: 1,
                otherEquipments: 1,
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
            console.log("=======================><<<<<<============");
            console.log(data);
            for (let x = 0; x < data.length; x++) {
              data[x] = {
                ...data[x],
                office: data[x].office[0],
                endUser: {
                  userCo: data[x].endUser.userCo[0],
                  userPAR: data[x].endUser.userPAR[0],
                }
              }
            }
            resolve(data)
          }).
          catch(err => {
            console.log("------------------------------------");
            console.log(err);
            reject({
              status: false,
              error: err
            })
          })
        }catch(e) {
          console.log(":::::::::::::::::::::::::");
          console.log(e);
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

    static getRecordsTemp (page = 1, count = 10, filter = {}, sort = {'division': 1}, select = []) {
      console.log("===============================");
      console.log(filter);
      console.log(count);
      return new Promise ((resolve, reject) => {
        try{
        Record
          .aggregate([
            {
              $project: {
                office: 1,
                endUser: 1,
                division: 1,
                section: 1,
                office: 1,
                endUser: 1,
                number: 1,
                propertyCode: 1,
                dateAcquired: 1,
                userCO: 1,
                userPAR: 1,
                unitType: 1,
                serial: 1,
                brand: 1,
                model: 1,
                mac: 1,
                ip: 1,
                specs: 1,
                donated: 1,
                purchased: 1,
                actions: 1,
                no: 1,
                under: 1,
                otherEquipments: 1,
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
            resolve(data)
          }).
          catch(err => {
            console.log("------------------------------------");
            console.log(err);
            reject({
              status: false,
              error: err
            })
          })
        }catch(e) {
          console.log(":::::::::::::::::::::::::");
          console.log(e);
        }

      }) 

    }


  }

module.exports = RecordClass;
