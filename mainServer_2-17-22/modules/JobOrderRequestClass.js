const JobOrderRequest = require('../models/JobOrderRequest');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

class JobOrderRequestClass {

  constructor (data) {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(data);
    this._id = data._id || "";
    this.jobOrderRequestID = data.jobOrderRequestID || "";
    this.requestingPersonnel = data.requestingPersonnel || {};
    this.device = data.device || null;
    this.natureOfComplaint = data.natureOfComplaint || "";
    this.requestDate = data.requestDate || new Date();
    this.createdAt = data.createdAt || new Date();
  }

  save () {
    return new Promise ((resolve, reject) => {
      var newJobOrderRequest = new JobOrderRequest({
        jobOrderRequestID: this.jobOrderRequestID,
        requestingPersonnel: this.requestingPersonnel,
        device: this.device,
        natureOfComplaint: this.natureOfComplaint,
        requestDate: this.requestDate,
        createdAt: this.createdAt,
      });

      newJobOrderRequest.save()
        .then((data) => {
          resolve(data);
        })
    }); // end promise
  }

  update (){
    return new Promise ((resolve, reject) => {
      JobOrderRequest.findById(this._id, (err, jobOrderRequest) => {
          
        jobOrderRequest.jobOrderRequestID = this.jobOrderRequestID;
        jobOrderRequest.requestingPersonnel = this.requestingPersonnel;
        jobOrderRequest.device = this.device;
        jobOrderRequest.natureOfComplaint = this.natureOfComplaint;
        jobOrderRequest.requestDate = this.requestDate;
        jobOrderRequest.createdAt = this.createdAt;
        
        jobOrderRequest.save();
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
        JobOrderRequest
          .find(filter)
          .count()
          .then(count => {
            resolve(count)
          })
      })

    }

    static getJobOrderRequests (page = 1, count = 10, filter = {}, sort = {'requestDate': -1}, select = []) {

      return new Promise ((resolve, reject) => {

        JobOrderRequest
          .aggregate([
            {
              $lookup: {
                from: 'devices', localField: 'device', foreignField: '_id', as: 'device'             
              }
            }, 

            {
              $lookup: {
                from: 'users', localField: 'technician.id', foreignField: '_id', as: 'technician.id'             
              }
            }, 
            {
              $project: {
                jobOrderRequestID: 1,
                requestingPersonnel: 1,
                device: { $arrayElemAt: [ "$device", 0 ] },
                natureOfComplaint: 1,
                requestDate: 1,
                createdAt: 1,
                supervisor: 1,
                technician: 1,
                status: 1,
              }
            },
            {
              $match: {
                ...filter,
              },
            },
          ])

          .sort(sort)
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

    static getJobOrderRequestDetail (cond) {
      return new Promise (resolve => {
        JobOrderRequest
          .find(cond)
          .then(data => {
            resolve(data)
          })
      })
    }

    static addAction (action){
      console.log("************^^^^^^^^^^^^^^^^^^^^");
      console.log(action);
      return new Promise ((resolve, reject) => {
        try {
          JobOrderRequest.findById(action.jobOrderRequest, (err, jobOrderRequest) => {
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
            console.log(jobOrderRequest.technician);
            console.log({
              ...jobOrderRequest.technician,
              ...action.technician
            });
            jobOrderRequest.technician = {
              ...jobOrderRequest.technician,
              ...action.technician
              
            };
            
            jobOrderRequest.save();
          })
            .then(() => resolve({ status: true }))
            .catch(err => {
              console.log("::::::::::::::::::::::::::::::AAAAAAAAAAAAAAAAA");
              console.log(err);
                reject({ status: false, error: err });
            });
        } catch (err2) {
          console.log(err2);
        }
  
      }); // end promise
    }

    static updateStatus (id, status) {
      console.log("***********************===============");
      console.log(id);
      console.log(status);
      return new Promise (resolve => {

        JobOrderRequest.findById(id, (err, jobOrderRequest) => {
          console.log(".................................................");
          console.log(jobOrderRequest);
          console.log(status);
          jobOrderRequest.status = status;
          jobOrderRequest.save();
        })
        .then((data) => {
          console.log("::::::::::::::::.......................");
          // console.log(data);
          resolve({ status: true });
        })
        .catch(err => {
          console.log(":::::::::::+++++++++++++++++:::");
          console.log(err);
          reject({ status: false, error: err});
        });

      })

    }
  

  }

module.exports = JobOrderRequestClass;
