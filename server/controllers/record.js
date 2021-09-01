const Record = require('../models/Record');
const RecordClass = require('../modules/RecordClass');
const mongoose = require('mongoose');

const { TryCatch }    = require('../routes/middleware/log-helper');
const { GetNewID }    = require('../routes/middleware/registration-helper');

exports.new = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;

    const newRecord = new RecordClass({
      ...data.record,
    });

    newRecord
      .save()
      .then(data => {
        res.json({status: true, record: data});
      })
  }, "Add new record", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}

exports.submitAll = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;

    console.log("=================================");
    console.log(data);

    // const newRecord = new RecordClass({
    //   ...data.record,
    // });

    // newRecord
    //   .save()
    //   .then(data => {
    //     res.json({status: true, record: data});
    //   })
  }, "Add new record", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}


exports.update = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;
    // console.log("-----------..<,,");
    // console.log(data);
    var cond = {
      $or: [
        { $and: [{propertyCode: data.record.propertyCode}, {propertyCode: {$ne: ""}}] },
        { $and: [{serial: data.record.serial}, {serial: {$ne: ""}}] },
        { $and: [
            {$and:[{userPAR: data.record.userPAR}, {userPAR: {$ne: ""}}]},
            {$and:[{userCO: data.record.userCO}, {userCO: {$ne: ""}}]},
            {$and:[{division: data.record.division}, {division: {$ne: ""}}]},
            {$and:[{section: data.record.section}, {section: {$ne: ""}}]},
          ]
        },
      ]
    }
    // console.log(cond);
    var existingRecord = await RecordClass.getRecords(1, 1, cond);
    // existingRecord = existingRecord[0];
    console.log("====================================>>>>>>>.. " + data.index);
    // console.log(existingRecord);

    res.json({index: data.index, count: existingRecord.length, record: [...existingRecord]});

    // const record = new RecordClass({
    //   ...existingRecord,
    //   otherEquipments: data.record.otherEquipments,
    //   otherEquipmentsTemp: existingRecord.otherEquipments,
    // });

    // record
    //   .update()
    //   .then(data => {
    //     console.log("-----............,,,,,,,,");
    //     console.log(data);
    //     res.json({status: true, records: data});
    //   })
    //   .catch((err) => {
    //     res.json({status: false, error: err});
    //   });
  }, "Add Update record", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}

exports.get = (req, res) => {
  TryCatch((res, req) => {
    var data = (req.query.filters)?JSON.parse(req.query.filters):{};
    var cond = data.find;

    var keys = Object.keys(cond || []);

    keys.map((key, i) => {
      regexFilter = new RegExp(["", cond[key], ""].join(""), "i");
      if (key == "officeID") {
        cond[key] = mongoose.Types.ObjectId(cond[key]);
      } else if (key == "user") {
        delete cond[key];
        cond["$or"] = [
          {["text.userPAR"]: regexFilter}, 
          {["userPAR.name.first"]: regexFilter}, 
          {["userPAR.name.mid"]: regexFilter}, 
          {["userPAR.name.last"]: regexFilter},
          {["text.userCO"]: regexFilter}, 
          {["userCo.name.first"]: regexFilter}, 
          {["userCo.name.mid"]: regexFilter}, 
          {["userCo.name.last"]: regexFilter}          
        ];
      } else if (key == "division") {
        delete cond[key];
        cond["$or"] = [{["text.division"]: regexFilter}, {["office.division"]: regexFilter}]
      } else if (key == "section") {
        delete cond[key];
        cond["$or"] = [{["text.section"]: regexFilter}, {["office.section"]: regexFilter}]
      } else {
        cond[key] = regexFilter;
      }
    })


    if (req.query.value){
      cond = [cond];
      var value = JSON.parse(req.query.value)
      var props = value.props;
      var regex = new RegExp(["", value.keyword, ""].join(""), "i");
      if (props == "user"){
        cond.push({ $or: [
          {["userPAR"]: regex}, 
          {["endUser.userPAR.name.first"]: regex}, 
          {["endUser.userPAR.name.mid"]: regex}, 
          {["endUser.userPAR.name.last"]: regex},
          {["userCO"]: regex}, 
          {["endUser.userCo.name.first"]: regex}, 
          {["endUser.userCo.name.mid"]: regex}, 
          {["endUser.userCo.name.last"]: regex}
        ]});
      }else if (props == "division"){
        cond.push({ $or: [{["division"]: regex}, {["office.division"]: regex}]});
      }else if (props == "section"){
        cond.push({ $or: [{["section"]: regex}, {["office.section"]: regex}]});
      } else {
        cond.push({[props]: regex});
      }
 
      cond = {
        $and: cond
      };
    }

    RecordClass.getRecords(data.page, data.count, cond, data.sort, data.select)
      .then(records => {
        RecordClass.count(cond).then((count) => {
          res.json({status: true, data:{ records: records, count: count}});
        })
      })
      .catch(error => {
        res.json({error: 'error message'});
      });

  }, "Get records", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}


exports.getDetail = (req, res) => {
  TryCatch((res, req) => {
    var data = req.query;
    RecordClass.getRecords(1, 1, {[data.prop]: ((data.prop == "_id")?mongoose.Types.ObjectId(data.value):data.value)})
      .then(record => {
        res.json({status: true, detail: record[0]});
      })
      .catch(error => {
        res.json({status: false, err: err});
      });      
  }, "Get Record Detail", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}

exports.submit = (req, res) => {
  TryCatch(async (res, req) => {
    var data = req.body;
    const record = new RecordClass({
      ...data.record,
    });

    console.log("=========================");
    console.log(record);
    if (data.record.hasOwnProperty("_id") && data.record._id != "") {
      record
        .update()
        .then(resData => {
          res.json({status: true, record: {
            _id: data.record._id
          }});
        })
    } else {
      record
        .save()
        .then(data => {
          res.json({status: true, record: {
            _id: data._id
          }});
        })
    }

  }, "Add new record", "Server - api/record.js -> Line: 19 - 30", 2, req, res);
}
