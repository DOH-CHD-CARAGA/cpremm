const Device = require('../models/Device');
const DeviceClass = require('../modules/DeviceClass');
const mongoose = require('mongoose');

const { TryCatch } = require('../routes/middleware/log-helper');
const { GetNewID } = require('../routes/middleware/registration-helper');

exports.new = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;
    // deviceID = await GetNewID (Device, "deviceID", 1, 5, "DOH13D");
    const newDevice = new DeviceClass({
      ...data.device,
      // deviceID: deviceID[0]
    });

    newDevice
      .save()
      .then(data => {
        res.json({ status: true, device: data });
      })
  }, "Add new Device", "Server - api/device.js -> Line: 19 - 30", 2, req, res);
}

exports.update = (req, res) => {
  TryCatch((res, req) => {
    var data = req.body;

    const device = new DeviceClass({
      ...data.device
    });

    device
      .update()
      .then(data => {
        res.json({ status: true, devices: data });
      })
      .catch((err) => {
        res.json({ status: false, error: err });
      });
  }, "Add Update Device", "Server - api/device.js -> Line: 19 - 30", 2, req, res);
}

exports.get = (req, res) => {
  TryCatch((res, req) => {

    var data = (req.query.filters) ? JSON.parse(req.query.filters) : {};
    var cond = data.find;
    var keys = Object.keys(cond || []);

    keys.map((key, i) => {
      regexFilter = new RegExp(["", cond[key], ""].join(""), "i");
      if (key == "officeID") {
        cond[key] = mongoose.Types.ObjectId(cond[key]);
      } else if (key == "_id") {
        cond[key] = mongoose.Types.ObjectId(cond[key]);
      } else if (key == "user") {
        delete cond[key];
        cond["$or"] = [
          { ["text.userPAR"]: regexFilter },
          { ["userPAR.name.first"]: regexFilter },
          { ["userPAR.name.mid"]: regexFilter },
          { ["userPAR.name.last"]: regexFilter },
          { ["text.userCO"]: regexFilter },
          { ["userCo.name.first"]: regexFilter },
          { ["userCo.name.mid"]: regexFilter },
          { ["userCo.name.last"]: regexFilter }
        ];
      } else if (key == "division") {
        delete cond[key];
        cond["$or"] = [{ ["text.division"]: regexFilter }, { ["office.division"]: regexFilter }]
      } else if (key == "status") {
        cond[key] = cond[key] * 1;
      } else if (key == "section") {
        delete cond[key];
        cond["$or"] = [{ ["text.section"]: regexFilter }, { ["office.section"]: regexFilter }]
      } else {
        cond[key] = regexFilter;
      }
    });

    if (req.query.value) {
      cond = [cond];
      var value = JSON.parse(req.query.value)
      var props = value.props;
      var regex = new RegExp(["", value.keyword, ""].join(""), "i");

      if (props == "user") {
        cond.push({
          $or: [
            { ["text.userPAR"]: regex },
            { ["userPAR.name.first"]: regex },
            { ["userPAR.name.mid"]: regex },
            { ["userPAR.name.last"]: regex },
            { ["text.userCO"]: regex },
            { ["userCo.name.first"]: regex },
            { ["userCo.name.mid"]: regex },
            { ["userCo.name.last"]: regex }
          ]
        });
      } else if (props == "status") {
        cond.push({ [props]: value.keyword * 1 });
      } else if (props == "division") {
        cond.push({ $or: [{ ["text.division"]: regex }, { ["office.division"]: regex }] });
      } else if (props == "section") {
        cond.push({ $or: [{ ["text.section"]: regex }, { ["office.section"]: regex }] });
      } else if (props == "ps") {
        cond.push({ $or: [{ serial: regex }, { propertyCode: regex }] });
      } else {
        cond.push({ [props]: regex });
      }

      cond = (data.find != undefined) ? {
        $and: cond
      } : { ...cond[1] };
    }

    DeviceClass.getDevices(data.page, data.count, cond, data.sort, data.select)
      .then(devices => {
        DeviceClass.count(cond).then((count) => {
          res.json({ status: true, data: { devices: devices, count: count } });
        })
      })
      .catch(error => {
        res.json({ error: 'error message' });
      });

  }, "Get Devices", "Server - api/device.js -> Line: 19 - 30", 2, req, res);
}

exports.submit = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;
    // deviceID = await GetNewID (Device, "deviceID", 1, 5, "DOH13D");
    const newDevice = new DeviceClass({
      ...data.device,
    });

    if (data.device.hasOwnProperty("_id")) {
      newDevice
        .update()
        .then(data => {
          res.json({ status: true, device: data });
        })
    } else {
      newDevice
        .save()
        .then(data => {
          res.json({ status: true, device: data });
        })
    }

  }, "Add/Update Device", "Server - api/device.js -> Line: 19 - 30", 2, req, res);
}


exports.getDashboardNumbers = (req, res) => {
  TryCatch(async (res, req) => {

    DeviceClass
      .getDashboardNumbers()
      .then(data => {
        res.json({ status: true, device: data });
      })
  }, "Add new Device", "Server - api/device.js -> Line: 19 - 30", 2, req, res);
}

exports.getDashboardNumbers2 = (req, res) => {
  TryCatch(async (res, req) => {

    DeviceClass
      .getDashboardNumbers2()
      .then(data => {
        res.json({ status: true, device: data });
      })
  }, "Add new Device", "Server - api/device.js -> Line: 19 - 30", 2, req, res);
}

exports.delete = (req, res) => {
  TryCatch((res, req) => {
    var data = req.body;


    DeviceClass
      .deleteDevice(data.deviceID)
      .then(result => {
        res.json(result)
      })

  }, "Add Delete device", "Server - api/device.js -> Line: 19 - 30", 2, req, res);
}
