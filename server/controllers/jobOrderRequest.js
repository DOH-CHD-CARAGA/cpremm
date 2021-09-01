const JobOrderRequest = require('../models/JobOrderRequest');
const JobOrderRequestClass = require('../modules/JobOrderRequestClass');
const DeviceClass = require('../modules/DeviceClass');
const mongoose = require('mongoose');

const { TryCatch }    = require('../routes/middleware/log-helper');
const { GetNewID }    = require('../routes/middleware/registration-helper');

exports.new = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;
    console.log("++++++++:::::||||||||||");
    console.log(data.jobOrderRequest);
    var jobOrderRequestID = "";
    if (data.jobOrderRequest.jobOrderRequestID == "") {
      console.log("************************");
      jobOrderRequestID = await GetNewID (JobOrderRequest, "jobOrderRequestID", 1, 5, "DOH13JOR");
      jobOrderRequestID = jobOrderRequestID[0]
    }else {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&");
      jobOrderRequestID = data.jobOrderRequest.jobOrderRequestID;
    }
    console.log(jobOrderRequestID);
    // console.log("__________________++++++");
    // console.log({
    //   ...data.jobOrderRequest,
    //   device: mongoose.Types.ObjectId(data.jobOrderRequest.device),
    //   requestingPersonnel: {
    //     ...data.jobOrderRequest.requestingPersonnel,
    //     id: mongoose.Types.ObjectId(data.jobOrderRequest.requestingPersonnel.id),
    //   },
    //   jobOrderRequestID: jobOrderRequestID[0]
    // });
    const newJobOrderRequest = new JobOrderRequestClass({
      ...data.jobOrderRequest,
      device: mongoose.Types.ObjectId(data.jobOrderRequest.device),
      requestingPersonnel: {
        ...data.jobOrderRequest.requestingPersonnel,
        id: mongoose.Types.ObjectId(data.jobOrderRequest.requestingPersonnel.id),
      },
      jobOrderRequestID: jobOrderRequestID
    });

    newJobOrderRequest
      .save()
      .then(data => {
        res.json({status: true, jobOrderRequest: data});
      })
  }, "Add new jobOrderRequest", "Server - api/jobOrderRequest.js -> Line: 19 - 30", 2, req, res);
}

exports.update = (req, res) => {
  TryCatch((res, req) => {
    var data = req.body;

    const jobOrderRequest = new JobOrderRequestClass({
      ...data.jobOrderRequest
    });

    jobOrderRequest
      .update()
      .then(data => {
        res.json({status: true, jobOrderRequests: data});
      })
      .catch((err) => {
        res.json({status: false, error: err});
      });
  }, "Add Update jobOrderRequest", "Server - api/jobOrderRequest.js -> Line: 19 - 30", 2, req, res);
}

exports.get = (req, res) => {
  TryCatch((res, req) => {
    
    var data = (req.query.filters)?JSON.parse(req.query.filters):{};
    var cond = data.find;
    
    var keys = Object.keys(cond || []);

    keys.map((key, i) => {
      regexFilter = new RegExp(["", cond[key], ""].join(""), "i");
      if (key == "status") {
        cond[key] = cond[key] * 1;
      } else if (key == "device.status") {
        cond[key] = cond[key] * 1;
      } else {
        cond[key] = regexFilter;
      }
    });

    if (req.query.value){
      cond = (cond)?[cond]:[];
      var value = JSON.parse(req.query.value)
      var props = value.props;
      var regex = new RegExp(["", value.keyword, ""].join(""), "i");

      if (props == "status"){
        cond.push({ [props]: value.keyword * 1 });
      } else if (props == "device.status"){
        cond.push({ [props]: value.keyword * 1 });
      } else {
        cond.push({[props]: regex});
      }

      cond = (data.find != undefined) ? {
        $and: cond
      } : { ...cond[1] };
    }

    JobOrderRequestClass.getJobOrderRequests(data.page, data.count, cond, data.sort, data.select)
      .then(jobOrderRequests => {
        JobOrderRequestClass.count(cond).then((count) => {
          res.json({status: true, data:{ jobOrderRequests: jobOrderRequests, count: count}});
        })
      })
      .catch(error => {
        res.json({error: 'error message'});
      });

  }, "Get jobOrderRequests", "Server - api/jobOrderRequest.js -> Line: 19 - 30", 2, req, res);
}

exports.addAction = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;
    // console.log("::::::::::::::----------------------");
    // console.log(req.userInfo);
    // console.log({
    //   dateAction: new Date(),
    //   id: mongoose.Types.ObjectId(req.userInfo.id),
    //   ...data.jobOrderRequestAction
    // });

    var temp = {
      dateAction: new Date(),
      id: {
        _id: req.userInfo.id,
        name: req.userInfo.name,
        role: req.userInfo.role,
        office: req.userInfo.office,
        designation: req.userInfo.designation,
      },
      ...data.jobOrderRequestAction
    };

    var requestID = data.jobOrderRequest;
    console.log("::::::::::::::::666:::::::::::=====================");
    console.log({
      dateAction: new Date(),
      id: mongoose.Types.ObjectId((data.hasOwnProperty("technician"))?data.technician:req.userInfo.id),
      ...data.jobOrderRequestAction 
    });
    // console.log(temp);
    // console.log(data.jobOrderRequest);
    // console.log(data.device._id);
    // console.log((data.jobOrderRequestAction.actionDetails.status == "waste")?0:1);
    var deviceID     = data.device._id;
    var deviceStatus = (data.jobOrderRequestAction.actionDetails.status == "waste")?0:1;

    JobOrderRequestClass
      .addAction({
        jobOrderRequest: data.jobOrderRequest,
        technician: {
          dateAction: new Date(),
          id: mongoose.Types.ObjectId((data.hasOwnProperty("technician"))?data.technician:req.userInfo.id),
          ...data.jobOrderRequestAction 
        }
      })
      .then(data => {
        if (data.status) {

          DeviceClass.updateStatus(deviceID, deviceStatus)
            .then((result) => {
              console.log("============= CHANGE STATUS =============");
              console.log(result);
            })

          res.json({status: true, jobOrderRequest: requestID, technician: {
            ...temp
          }});
        } else {
          console.log(":::::::::::::::::::::::::::::::::::::");
          console.log(data.error);
          res.json({
            status: false, error: data.error
          })
        }
      })
      .catch(err => {
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
        console.log(err);
        res.json({
          status: false, error: err
        });
      })
  }, "Add new jobOrderRequest Action", "Server - api/jobOrderRequest.js -> Line: 19 - 30", 2, req, res);
}


exports.updateStatus = (req, res) => {
  TryCatch((res, req) => {
    var data = req.body;
    console.log(":::::::::::::::::::::::::>>>>>>>>>>>");
    console.log(data);
    JobOrderRequestClass
      .updateStatus(data.id, data.status)
      .then(data => {
        res.json({status: true});
      })
      .catch((err) => {
        res.json({status: false, error: err});
      });
  }, "Add Update jobOrderRequest status", "Server - api/jobOrderRequest.js -> Line: 19 - 30", 2, req, res);
}

