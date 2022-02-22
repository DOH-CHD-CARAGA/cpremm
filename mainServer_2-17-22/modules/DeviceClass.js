const Device = require('../models/Device');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

class DeviceClass {

  constructor(data) {
    this._id = data._id || "";
    this.type = data.type || "";
    this.status = data.status;
    this.propertyCode = data.propertyCode || "";
    this.serial = data.serial || "";
    // this.dateAcquired = data.dateAcquired || null;
    this.dateAcquired = new Date();
    this.brand = data.brand || "";
    this.model = data.model || "";
    this.remarks = data.remarks || "";

    this.specs = (data.hasOwnProperty("specs") && data.specs != null) ? {
      mac: (data.specs.hasOwnProperty("mac")) ? data.specs.mac : null,
      ip: (data.specs.hasOwnProperty("ip")) ? data.specs.ip : null,

      hWare: (data.specs.hasOwnProperty("hWare")) ? data.specs.hWare : null,
      sWare: (data.specs.hasOwnProperty("sWare")) ? data.specs.sWare : null,
    } : null;

    this.donated = data.donated || "";
    this.cost = data.cost || "";
    this.size = data.size || "";

    this.userPAR = data.userPAR || null;
    this.userCO = data.userCO || null;
    this.office = data.office || null;
    this.text = {
      userPAR: (data.text.hasOwnProperty("userPAR")) ? data.text.userPAR : "",
      userCO: (data.text.hasOwnProperty("userCO")) ? data.text.userCO : "",
      division: (data.text.hasOwnProperty("division")) ? data.text.division : "",
      section: (data.text.hasOwnProperty("section")) ? data.text.section : "",
    };
  }

  save() {
    return new Promise((resolve, reject) => {
      var newDevice = new Device({
        type: this.type,
        status: this.status,
        propertyCode: this.propertyCode,
        serial: this.serial,
        dateAcquired: this.dateAcquired,
        brand: this.brand,
        model: this.model,
        remarks: this.remarks,
        specs: this.specs,
        donated: this.donated,
        cost: this.cost,
        size: this.size,
        userPAR: this.userPAR,
        userCO: this.userCO,
        office: this.office,
        text: this.text,
      });

      newDevice.save()
        .then((data) => {
          resolve(data);
        })
    }); // end promise
  }

  update() {
    return new Promise((resolve, reject) => {
      Device.findById(this._id, (err, device) => {

        device.type = this.type;
        device.status = this.status;
        device.propertyCode = this.propertyCode;
        device.serial = this.serial;
        device.dateAcquired = this.dateAcquired;
        device.brand = this.brand;
        device.model = this.model;
        device.remarks = this.remarks;
        device.specs = this.specs;
        device.donated = this.donated;
        device.size = this.size;
        device.cost = this.cost;
        device.userPAR = this.userPAR;
        device.userCO = this.userCO;
        device.office = this.office;
        device.text = this.text;

        device.save();
      })
        .then(() => resolve({ status: true }))
        .catch(err => {
          reject({ status: false });
        });

    }); // end promise
  }
  ///================ static methods ======================

  static count(filter = {}) {

    return new Promise(resolve => {
      Device
        .find(filter)
        .count()
        .then(count => {
          resolve(count)
        })
    })

  }

  static getDevices(page = 1, count = 10, filter = {}, sort = { 'type': 1 }, select = []) {
    console.log(":====================>>>>");
    console.log(filter);
    return new Promise((resolve, reject) => {

      Device
        .aggregate([
          {
            $lookup: {
              from: 'users', localField: 'userPAR', foreignField: '_id', as: 'userPAR'
            }
          },
          {
            $lookup: {
              from: 'users', localField: 'userCO', foreignField: '_id', as: 'userCO'
            }
          },
          {
            $lookup: {
              from: 'offices', localField: 'office', foreignField: '_id', as: 'office'
            }
          },
          {
            $project: {
              specs: 1,
              type: 1,
              status: 1,
              propertyCode: 1,
              serial: 1,
              dateAcquired: 1,
              brand: 1,
              model: 1,
              remarks: 1,
              donated: 1,
              cost: 1,
              size: 1,
              specs: 1,
              userPAR: { $arrayElemAt: ["$userPAR", 0] },
              userCO: { $arrayElemAt: ["$userCO", 0] },
              officeID: { $arrayElemAt: ["$office._id", 0] },
              office: { $arrayElemAt: ["$office", 0] },
              text: 1,
            }
          },
          {
            $match: {
              ...filter,
            },
          },
        ])

        // .find(filter)
        // .select(select)

        .sort(sort)
        .skip((page * count) - count)
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

  static getDeviceDetail(cond) {
    return new Promise(resolve => {
      Device
        .find(cond)
        .then(data => {
          resolve(data)
        })
    })
  }

  static getDashboardNumbers() {

    return new Promise(resolve => {
      Device
        .aggregate([
          // {
          //   $match: {
          //     status: 1
          //   }
          // },
          {
            $lookup: {
              from: 'offices', localField: 'office', foreignField: '_id', as: 'office'
            }
          },
          {
            $project: {
              section: "$text.section",
              type: "$type",
              status: "$status",
              year: { $year: { $add: ["$dateAcquired", 28800000] } },
            }
          },
          {
            $project: {
              section: { $ifNull: ["$section", { $arrayElemAt: ["$office.section", 0] }] },
              type: "$type",
              year: 1,
              status: 1,
            }
          },
          {
            $group: {
              _id: {
                section: "$section",
                type: "$type",
                year: "$year",
                status: "$status",
              },
              count: { $sum: 1 }
            }
          },
          // {
          //   $group: {
          //     _id: "$text.section",
          //     count: { $sum: 1 }
          //   }
          // },
        ])
        .then(data => {
          resolve(data)
        })
    })

  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      Device.findById(id, (err, device) => {

        device.status = status;

        device.save();
      })
        .then(() => resolve({ status: true }))
        .catch(err => {
          reject({ status: false });
        });

    }); // end promise
  }

  static getDashboardNumbers2() {

    return new Promise(resolve => {
      Device
        .aggregate([
          {
            $match: {
              status: 1
            }
          },
          {
            $lookup: {
              from: 'offices', localField: 'office', foreignField: '_id', as: 'office'
            }
          },
          {
            $project: {
              section: "$text.section",
              type: "$type",
            }
          },
          {
            $project: {
              section: { $ifNull: ["$section", { $arrayElemAt: ["$office.section", 0] }] },
              type: "$type",
            }
          },
          {
            $group: {
              _id: {
                section: "$section",
                type: "$type",
              },
              count: { $sum: 1 }
            }
          },
          // {
          //   $group: {
          //     _id: "$text.section",
          //     count: { $sum: 1 }
          //   }
          // },
        ])
        .then(data => {
          resolve(data)
        })
    })

  }

  static deleteDevice(id) {
    return new Promise(resolve => {
      Device
        .findByIdAndDelete(id, (err) => {
          if (err) {
            resolve({ success: false })
          } else {
            resolve({ success: true })
          }
        });
    })
  }


}

module.exports = DeviceClass;
