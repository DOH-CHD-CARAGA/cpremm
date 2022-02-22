const Record = require('../models/Record2');
const RecordClass = require('../modules/Record2Class');
const RecordClassI = require('../modules/RecordClass');
const mongoose = require('mongoose');

const DeviceClass = require('../modules/DeviceClass');

const { TryCatch } = require('../routes/middleware/log-helper');
const { GetNewID } = require('../routes/middleware/registration-helper');

exports.new = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;

    recordID = await GetNewID(office, "recordID", 1, 3, "DOH13R");
    const newOffice = new RecordClass({
      ...data.record,
      recordID: recordID[0]
    });

    newRecord
      .save()
      .then(data => {
        res.json({ status: true, record: data });
      })
  }, "Add new record", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}

exports.update = (req, res) => {

  TryCatch((res, req) => {
    var data = req.body;

    const record = new RecordClass({
      ...data.record
    });

    record
      .update()
      .then(data => {
        res.json({ status: true, records: data });
      })
      .catch((err) => {
        res.json({ status: false, error: err });
      });
  }, "Add Update record", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
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
      } else if (key == "status") {
        cond['devices.desktop.status'] = cond[key] * 1;
        delete cond[key];
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
      } else if (key == "section") {
        delete cond[key];
        cond["$or"] = [{ ["text.section"]: regexFilter }, { ["office.section"]: regexFilter }]
      } else {
        cond[key] = regexFilter;
      }
    })

    if (req.query.value) {
      cond = [cond];
      var value = JSON.parse(req.query.value)
      var props = value.props;
      var regex = new RegExp(["", value.keyword, ""].join(""), "i");
      if (props == "user") {
        cond.push({
          $or: [
            { ["text.userPAR"]: regex },
            { ["endUser.userPAR.name.first"]: regex },
            { ["endUser.userPAR.name.mid"]: regex },
            { ["endUser.userPAR.name.last"]: regex },
            { ["text.userCO"]: regex },
            { ["endUser.userCo.name.first"]: regex },
            { ["endUser.userCo.name.mid"]: regex },
            { ["endUser.userCo.name.last"]: regex }
          ]
        });
      } else if (props == "status") {
        cond.push({ ['devices.desktop.status']: value.keyword * 1 });
      } else if (props == "division") {
        cond.push({ $or: [{ ["text.division"]: regex }, { ["office.division"]: regex }] });
      } else if (props == "section") {
        cond.push({ $or: [{ ["text.section"]: regex }, { ["office.section"]: regex }] });
      } else {
        cond.push({ [props]: regex });
      }

      cond = {
        $and: cond
      };
    }

    console.log("____________!!!!!!!!!!SS");
    console.log(cond);

    RecordClass.getRecords(data.page, data.count, cond, data.sort, data.select)
      .then(records => {
        RecordClass.getRecords(1, 1000000, cond, data.sort, data.select).then((count) => {
          res.json({ status: true, data: { records: records, count: count.length } });
        })
      })
      .catch(error => {
        res.json({ error: 'error message' });
      });

  }, "Get records", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}

exports.getDetail = (req, res) => {
  TryCatch((res, req) => {
    var data = req.query;
    RecordClass.getRecords(1, 1, { [data.prop]: ((data.prop == "_id") ? mongoose.Types.ObjectId(data.value) : data.value) })
      .then(record => {
        res.json({ status: true, detail: record[0] });
      })
      .catch(error => {
        res.json({ status: false, err: err });
      });
  }, "Get Record Detail", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}

exports.submit = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;
    var devices = { ...data.record.devices }
    var temp = {}, keys = Object.keys(devices), ids = {};
    for (let x = 0; x < keys.length; x++) {
      temp = new DeviceClass({
        ...devices[keys[x]],
        text: { ...data.record.text }
      });
      if (devices[keys[x]]._id) {
        temp = await temp.update();
        ids[keys[x]] = devices[keys[x]]._id;
      } else {
        if ((devices[keys[x]].hasOwnProperty("propertyCode") && devices[keys[x]].propertyCode != "") || (devices[keys[x]].hasOwnProperty("serial") && devices[keys[x]].serial != "") || (devices[keys[x]].hasOwnProperty("brand") && devices[keys[x]].brand != "")) {
          temp = await temp.save();
          ids[keys[x]] = temp._id;
        }
      }
    }

    if (data.record.actions.length > 0) {
      if (data.record.actions[0].propertyCode == "" && data.record.actions[0].actionTaken == "" && data.record.actions[0].findings == "") {
        data = {
          ...data,
          record: {
            ...data.record,
            actions: [],
          }
        }
      }
    }

    const record = new RecordClass({
      ...data.record,
      devices: { ...ids }
    });

    if (data.record.hasOwnProperty("_id") && data.record._id != "" && data.record._id != null) {
      record
        .update()
        .then(resData => {
          res.json({
            status: true, record: {
              _id: data.record._id
            }
          });
        })
    } else {

      record
        .save()
        .then(data => {
          res.json({
            status: true, record: {
              _id: data._id
            }
          });
        })
    }

  }, "Submit record", "Server - api/record2.js -> Line: 19 - 30", 2, req, res);
}

exports.arrange = (req, res, pData, ind) => {

  TryCatch(async (res, req) => {
    var data = await RecordClassI.getRecordsTemp(1, 500);
    for (let x = 0, len = data.length; x < len; x++) {
      var recordData = { ...data[x] };

      var desktop = {
        type: "desktop",
        status: recordData.no, //1 ACTIVE, 0 INACTIVE
        propertyCode: recordData.propertyCode,
        serial: recordData.serial,
        dateAcquired: (recordData.dateAcquired != "")
          ? (new Date(recordData.dateAcquired) != "Invalid Date")
            ? new Date(recordData.dateAcquired)
            : null
          : null,
        brand: recordData.brand,
        model: recordData.model,
        remarks: "",

        specs: {
          mac: recordData.mac,
          ip: recordData.ip,

          hWare: {
            cpu: recordData.specs.hWare.cpu,
            motherBoard: recordData.specs.hWare.motherBoord,
            processor: recordData.specs.hWare.processor,
            hdd: recordData.specs.hWare.hdd,
            ram: recordData.specs.hWare.ram,
          },

          sWare: { ...recordData.specs.sWare }
        },
        donated: recordData.donated,
        cost: recordData.purchased,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };

      var monitor = {
        type: "monitor",
        status: recordData.specs.hWare.monitor.status,
        propertyCode: recordData.specs.hWare.monitor.propertyCode,
        serial: recordData.specs.hWare.monitor.serial,
        brand: recordData.specs.hWare.monitor.brand,
        model: recordData.specs.hWare.monitor.model,
        size: recordData.specs.hWare.monitor.size,
        remarks: recordData.specs.hWare.monitor.remarks,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };

      var avr = {
        type: "avr",
        status: recordData.specs.hWare.avr.status,
        propertyCode: recordData.specs.hWare.avr.propertyCode,
        serial: recordData.specs.hWare.avr.serial,
        brand: recordData.specs.hWare.avr.brand,
        model: recordData.specs.hWare.avr.model,
        remarks: recordData.specs.hWare.avr.remarks,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };

      var ups = {
        type: "ups",
        status: recordData.specs.hWare.ups.status,
        propertyCode: recordData.specs.hWare.ups.propertyCode,
        serial: recordData.specs.hWare.ups.serial,
        brand: recordData.specs.hWare.ups.brand,
        model: recordData.specs.hWare.ups.model,
        remarks: recordData.specs.hWare.ups.remarks,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };
      
      var projector = {
        type: "projector",
        status: recordData.specs.hWare.projector.status,
        propertyCode: recordData.specs.hWare.projector.propertyCode,
        serial: recordData.specs.hWare.projector.serial,
        brand: recordData.specs.hWare.projector.brand,
        model: recordData.specs.hWare.projector.model,
        remarks: recordData.specs.hWare.projector.remarks,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };

      var camera = {
        type: "camera",
        status: recordData.specs.hWare.camera.status,
        propertyCode: recordData.specs.hWare.camera.propertyCode,
        serial: recordData.specs.hWare.camera.serial,
        brand: recordData.specs.hWare.camera.brand,
        model: recordData.specs.hWare.camera.model,
        remarks: recordData.specs.hWare.camera.remarks,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };

      var speaker = {
        type: "speaker",
        status: recordData.specs.hWare.speaker.status,
        propertyCode: recordData.specs.hWare.speaker.propertyCode,
        serial: recordData.specs.hWare.speaker.serial,
        brand: recordData.specs.hWare.speaker.brand,
        model: recordData.specs.hWare.speaker.model,
        remarks: recordData.specs.hWare.speaker.remarks,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };

      var tablet = {
        type: "tablet",
        status: recordData.specs.hWare.tablet.status,
        propertyCode: recordData.specs.hWare.tablet.propertyCode,
        serial: recordData.specs.hWare.tablet.serial,
        brand: recordData.specs.hWare.tablet.brand,
        model: recordData.specs.hWare.tablet.model,
        remarks: recordData.specs.hWare.tablet.remarks,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };

      var scanner = {
        type: "scanner",
        status: recordData.specs.hWare.scanner.status,
        propertyCode: recordData.specs.hWare.scanner.propertyCode,
        serial: recordData.specs.hWare.scanner.serial,
        brand: recordData.specs.hWare.scanner.brand,
        model: recordData.specs.hWare.scanner.model,
        remarks: recordData.specs.hWare.scanner.remarks,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };

      var printer = {
        type: "printer",
        status: recordData.specs.hWare.printer.status,
        propertyCode: recordData.specs.hWare.printer.code,
        serial: recordData.specs.hWare.printer.serial,
        brand: recordData.specs.hWare.printer.name,
        model: recordData.specs.hWare.printer.model,
        remarks: recordData.specs.hWare.printer.remarks,

        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },
      };

      var devices = [];
      for (let x = 0; x < recordData.otherEquipments.length; x++) {
        if (recordData.otherEquipments[x].type == "laptop") {
          devices.push({
            type: "laptop",
            status: (recordData.otherEquipments[x].no == null) ? 0 : recordData.otherEquipments[x].no, //1 ACTIVE, 0 INACTIVE
            propertyCode: recordData.otherEquipments[x].propertyNo,
            serial: recordData.otherEquipments[x].serial,
            dateAcquired: (recordData.otherEquipments[x].yearAcquired != "")
              ? (new Date(recordData.otherEquipments[x].yearAcquired) != "Invalid Date")
                ? new Date(recordData.otherEquipments[x].yearAcquired)
                : null
              : null,
            brand: recordData.otherEquipments[x].brand,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            specs: {
              mac: recordData.otherEquipments[x].mac,

              hWare: {
                processor: recordData.otherEquipments[x].processor,
                hdd: recordData.otherEquipments[x].hdd,
                ram: recordData.otherEquipments[x].ram,
              },

              sWare: {
                os: {
                  name: recordData.otherEquipments[x].os,
                  isLicensed: null
                },
                msOffice: {
                  name: recordData.otherEquipments[x].office,
                  isLicensed: null
                },
                antiVirus: {
                  name: recordData.otherEquipments[x].antiVirus,
                  isLicensed: null
                },
              }
            },

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          });
        } else if (recordData.otherEquipments[x].type == "monitor") {
          devices.push({
            type: "monitor",
            status: recordData.otherEquipments[x].status,
            propertyCode: recordData.otherEquipments[x].propertyNo,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].brand,
            model: recordData.otherEquipments[x].model,
            size: recordData.otherEquipments[x].size,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        } else if (recordData.otherEquipments[x].type == "avr") {
          devices.push({
            type: "avr",
            status: recordData.otherEquipments[x].status,
            propertyCode: recordData.otherEquipments[x].propertyCode,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].brand,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        } else if (recordData.otherEquipments[x].type == "ups") {
          devices.push({
            type: "ups",
            status: recordData.otherEquipments[x].status,
            propertyCode: recordData.otherEquipments[x].propertyNo,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].brand,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        } else if (recordData.otherEquipments[x].type == "scanner") {
          devices.push({
            type: "scanner",
            status: recordData.otherEquipments[x].status || 1,
            // status: 1,
            propertyCode: recordData.otherEquipments[x].propertyNo,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].brand,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        } else if (recordData.otherEquipments[x].type == "printer") {
          devices.push({
            type: "printer",
            status: recordData.otherEquipments[x].status || 1,
            propertyCode: recordData.otherEquipments[x].code,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].name,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        } else if (recordData.otherEquipments[x].type == "projector") {
          devices.push({
            type: "projector",
            status: recordData.otherEquipments[x].status,
            propertyCode: recordData.otherEquipments[x].propertyNo,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].name,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        }else if (recordData.otherEquipments[x].type == "router") {
          devices.push({
            type: "router",
            status: recordData.otherEquipments[x].status,
            propertyCode: recordData.otherEquipments[x].propertyNo,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].name,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        }else if (recordData.otherEquipments[x].type == "camera") {
          devices.push({
            type: "camera",
            status: recordData.otherEquipments[x].status,
            propertyCode: recordData.otherEquipments[x].propertyNo,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].name,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        }else if (recordData.otherEquipments[x].type == "speaker") {
          devices.push({
            type: "speaker",
            status: recordData.otherEquipments[x].status,
            propertyCode: recordData.otherEquipments[x].propertyNo,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].name,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        }else if (recordData.otherEquipments[x].type == "tablet") {
          devices.push({
            type: "tablet",
            status: recordData.otherEquipments[x].status,
            propertyCode: recordData.otherEquipments[x].propertyNo,
            serial: recordData.otherEquipments[x].serial,
            brand: recordData.otherEquipments[x].name,
            model: recordData.otherEquipments[x].model,
            remarks: recordData.otherEquipments[x].remarks,

            userPAR: recordData.endUser.userPAR,
            userCO: recordData.endUser.userCo,
            office: recordData.office,
            text: {
              userPAR: recordData.userPAR,
              userCO: recordData.userCO,
              division: recordData.division,
              section: recordData.section,
            },
          })
        }
      }

      var des = new DeviceClass({
        ...desktop
      });
      if (desktop.propertyCode != "" || desktop.serial != "" || desktop.brand != "") {
        des = await des.save();
      } else {
        des._id = null;
      }

      var mon = new DeviceClass({
        ...monitor
      });
      if (monitor.propertyCode != "" || monitor.serial != "" || monitor.brand != "") {
        mon = await mon.save();
      } else {
        mon._id = null;
      }

      var av = new DeviceClass({
        ...avr
      });
      if (avr.propertyCode != "" || avr.serial != "" || avr.brand != "") {
        av = await av.save();
      } else {
        av._id = null;
      }

      var up = new DeviceClass({
        ...ups
      });
      if (ups.propertyCode != "" || ups.serial != "" || ups.brand != "") {
        up = await up.save();
      } else {
        up._id = null;
      }

      var proj = new DeviceClass({
        ...projector
      });
      if (projector.propertyCode != "" || projector.serial != "" || projector.brand != "") {
        proj = await proj.save();
      } else {
        proj._id = null;
      }
      
      var rout = new DeviceClass({
        ...router
      });
      if (router.propertyCode != "" || router.serial != "" || router.brand != "") {
        rout = await rout.save();
      } else {
        rout._id = null;
      }
      
      var cam = new DeviceClass({
        ...camera
      });
      if (camera.propertyCode != "" || camera.serial != "" || camera.brand != "") {
        cam = await cam.save();
      } else {
        cam._id = null;
      }

      var speak = new DeviceClass({
        ...speaker
      });
      if (speaker.propertyCode != "" || speaker.serial != "" || speaker.brand != "") {
        speak = await speak.save();
      } else {
        speak._id = null;
      }

      var tab = new DeviceClass({
        ...tablet
      });
      if (tablet.propertyCode != "" || tablet.serial != "" || tablet.brand != "") {
        tab = await tab.save();
      } else {
        tab._id = null;
      }

      var sca = new DeviceClass({
        ...scanner
      });
      if (scanner.propertyCode != "" || scanner.serial != "" || scanner.brand != "") {
        sca = await sca.save();
      } else {
        sca._id = null;
      }

      var pri = new DeviceClass({
        ...printer
      });
      if (printer.propertyCode != "" || printer.serial != "" || printer.brand != "") {
        pri = await pri.save();
      } else {
        pri._id = null;
      }

      var devicesId = [], temp;
      for (let x = 0, len = devices.length; x < len; x++) {
        temp = new DeviceClass({
          ...devices[x]
        });
        temp = await temp.save();
        devicesId.push({ device: temp._id });
      }

      var newRecord = new RecordClass({
        prevRecordId: mongoose.Types.ObjectId(recordData._id),
        recordID: "",
        userPAR: recordData.endUser.userPAR,
        userCO: recordData.endUser.userCo,
        office: recordData.office,
        text: {
          userPAR: recordData.userPAR,
          userCO: recordData.userCO,
          division: recordData.division,
          section: recordData.section,
        },

        devices: {
          desktop: des._id,
          printer: pri._id,
          scanner: sca._id,
          monitor: mon._id,
          avr: av._id,
          ups: up._id,
          projector: proj._id,
          router: rout._id,
          camera: cam._id,
          speaker: speak._id,
          tablet: tab._id,
        },

        otherDevices: [...devicesId],

        actions: [...recordData.actions],

      });

      newRecord.save()
        .then((data) => {
          return { success: true, data: data }
        })
        .catch(err => {
          return { success: false, error: err }
        });



      // Record.arrange(req, res, {data:{record:{...data[0]}}}, x);
    }
    res.json({ success: true });
  }, "Add new record", "Server - api/record.js -> Line: 19 - 30", 2, req, res);

}

exports.delete = (req, res) => {
  TryCatch((res, req) => {
    var data = req.body;


    RecordClass
      .deleteRecord(data.recordID)
      .then(result => {
        res.json(result)
      })

  }, "Add Update record", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}
