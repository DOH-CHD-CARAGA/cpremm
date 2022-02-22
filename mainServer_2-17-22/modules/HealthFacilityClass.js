const HealthFacility = require('../models/HealthFacility');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

class HealthFacilityClass {

  constructor (data) {
    console.log("::::::::::::::::::::::::::::::::::::");
    console.log(data);
    this.healthFacilityID = (data.healthFacilityID)?data.healthFacilityID:'';
    this.region = (data.region)?data.region:'';
    this.province = (data.province)?data.province:'';
    this.munCity = (data.munCity)?data.munCity:'';
    this.category = (data.category)?data.category:'';
    this.ownership = (data.ownership)?data.ownership:'';
    this.name = (data.name)?data.name:'';
    this.contact = (data.contact)?data.contact:'';
    this.email = (data.email)?data.email:'';
    this.focals = (data.focals)?data.focals:[];
    this._id = (data._id)?data._id:'';
  }

  save () {
    return new Promise ((resolve, reject) => {
      var newHealthFacility = new HealthFacility({
        healthFacilityID: this.healthFacilityID,
        region: this.region,
        province: this.province,
        munCity: this.munCity,
        serviceCapability: this.serviceCapability,
        ownership: this.ownership,
        category: this.category,
        name: this.name,
        contact: this.contact,
        email: this.email,
        focals: this.focals,
      });
      newHealthFacility.save()
        .then((data) => {
          resolve(data);
        })
    }); // end promise
  }

  update (){
    return new Promise ((resolve, reject) => {
      HealthFacility.findById(this._id, (err, healthFacility) => {
        healthFacility.healthFacilityID = this.healthFacilityID;
        healthFacility.region = this.region;
        healthFacility.province = this.province;
        healthFacility.munCity = this.munCity;
        healthFacility.serviceCapability = this.serviceCapability;
        healthFacility.ownership = this.ownership;
        healthFacility.category = this.category;
        healthFacility.name = this.name;
        healthFacility.contact = this.contact;
        healthFacility.email = this.email;
        healthFacility.focals = this.focals;
        healthFacility.save();
      })
        .then(() => resolve({ status: true }))
        .catch(err => {
            reject({ status: false });
        });
    }); // end promise
  }

    static count (filter = {}) {
      return new Promise (resolve => {
        HealthFacility
          .find(filter)
          .count()
          .then(count => {
            resolve(count)
          })
      })
    }

    static getHealthFacilitys (page = 1, count = 10, filter = {}, sort = {'healthFacilityID': 1}, select = []) {

      var aggregate = [
        {
          $match: {
            ...filter
          }
        },
      ];

      if (typeof select == "object" && !Array.isArray(select)) {
        aggregate.push({
          $project: {
            ...select
          }
        });
      }

      return new Promise ((resolve, reject) => {
        HealthFacility
          .aggregate([
            ...aggregate
          ])
          .sort(sort)
          .skip((page*count) - count)
          .limit(count)
          .then(data => {
            resolve(data)
          }).
          catch(err => {
            console.log(err);
            reject({
              status: false,
              error: err
            })
          })
      })
    }

    static getHealthFacilityDetail (cond) {
      return new Promise (resolve => {
        HealthFacility
          .find(cond)
          .then(data => {
            resolve(data)
          })
      })
    }

  }

module.exports = HealthFacilityClass;