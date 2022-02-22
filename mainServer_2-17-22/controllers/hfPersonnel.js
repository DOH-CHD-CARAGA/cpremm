const HfPersonnel = require('../models/HfPersonnel');
const HfPersonnelClass = require('../modules/HfPersonnelClass');
const { TryCatch }    = require('../routes/middleware/log-helper');
const { GetNewID }    = require('../routes/middleware/registration-helper');
exports.new = (req, res) => {
  TryCatch(async (res, req) => {

    var data = req.body;

    var duplicate = await HfPersonnelClass.checkDuplicate({...data.hfPersonnel});

    if (duplicate.length > 0) {
      var data = req.body;
      const hfPersonnel = new HfPersonnelClass({
        ...data.hfPersonnel,
        _id: duplicate[0]._id,
        hfPersonnelID: duplicate[0].hfPersonnelID,
      });

      await hfPersonnel
        .update()
        .then(dataUpdated => {
          res.json({status: true, hfPersonnel: dataUpdated.data, index: data.index, duplicate: [...duplicate]});
        })
        .catch((err) => {
          res.json({status: false, error: err});
        });

    } else {

      hfPersonnelID = await GetNewID (HfPersonnel, 'hfPersonnelID', 1, 5 , 'DOHHFP');
      const newHfPersonnel = new HfPersonnelClass({
        ...data.hfPersonnel,
        hfPersonnelID: hfPersonnelID[0]
      });
  
      newHfPersonnel
        .save()
        .then(result => {
          res.json({status: true, hfPersonnel: result, index: data.index});
        })
        .catch(err => {
          res.json({status: false, error: err, hfPersonnel: {...data.hfPersonnel}, index: data.index});
        })  
    }

  }, 'Add new hfPersonnel', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}

exports.delete = (req, res) => {
  TryCatch(async (res, req) => {

    var data = req.body;
    var duplicate = await HfPersonnelClass.checkDuplicate({...data.hfPersonnel});


    if (duplicate.length > 0) {

      HfPersonnelClass
        .delete(duplicate[0]._id)
        .then(dataDelete => {
          // res.json({status: true, hfPersonnels: dataDelete});

          res.json({status: true, index: data.index});
        })
        .catch((err) => {
          res.json({status: false, error: err});
        });

    } else {
      res.json({status: false, hfPersonnel: {...data.hfPersonnel}, index: data.index});

      // hfPersonnelID = await GetNewID (HfPersonnel, 'hfPersonnelID', 1, 5 , 'DOHHFP');
      // const newHfPersonnel = new HfPersonnelClass({
      //   ...data.hfPersonnel,
      //   hfPersonnelID: hfPersonnelID[0]
      // });
  
      // newHfPersonnel
      //   .save()
      //   .then(result => {
      //     res.json({status: true, hfPersonnel: result, index: data.index});
      //   })
      //   .catch(err => {
      //     res.json({status: false, error: err, hfPersonnel: {...data.hfPersonnel}, index: data.index});
      //   })  
    }

  }, 'Add new hfPersonnel', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}

exports.update = (req, res) => {
  TryCatch((res, req) => {

    var data = req.body;
    const hfPersonnel = new HfPersonnelClass({
      ...data.hfPersonnel
    });

    hfPersonnel
      .update()
      .then(data => {
        res.json({status: true, hfPersonnels: data});
      })
      .catch((err) => {
        res.json({status: false, error: err});
      });

  }, 'Add Update hfPersonnel', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}

exports.get = (req, res) => {
  TryCatch((res, req) => {

    var data = (req.query.filters)?JSON.parse(req.query.filters):{};
    var cond = data.find;
    var keys = Object.keys(cond || []);
    keys.map((key, i) => {
      regexFilter = new RegExp(["", cond[key], ""].join(""), "i");
      if (key == "name") {
        delete cond[key];
        cond["$or"] = [
          {["name.first"]: regex}, {["name.mid"]: regex}, {["name.last"]: regex}
        ];
      } else if (key == "address") {
        delete cond[key];
        cond["$or"] = [
          {["address.fullAddress"]: regex}, {["address.province"]: regex}, {["address.munCity"]: regex}, {["address.barangay"]: regex}
        ]
      } else {
        cond[key] = regexFilter;
      }
    });

    if (req.query.value){
      cond = (cond)?[cond]:[];
      var value = JSON.parse(req.query.value)
      var props = value.props;
      var regex = new RegExp(["", value.keyword, ""].join(""), "i");

      if (props == "name"){
        cond.push({ $or: [{["name.first"]: regex}, {["name.mid"]: regex}, {["name.last"]: regex}]});
      } else if (props == "address"){
        cond.push({ $or: [{["address.fullAddress"]: regex}, {["address.province"]: regex}, {["address.munCity"]: regex}, {["address.barangay"]: regex}]});
      } else {
        cond.push({[props]: regex});
      }

      cond = {
        $and: cond
      };
    }

    console.log("::::::::::::::::::::::::::::+++++++===");
    console.log(data.sort);
    HfPersonnelClass.getHfPersonnels(data.page, data.count, cond, data.sort, data.select)
      .then(hfPersonnels => {
        HfPersonnelClass.count(cond).then((count) => {
          res.json({status: true, data:{ hfPersonnels: hfPersonnels, count: count}});
        })
      })
      .catch(error => {
        res.json({error: 'error message'});
      });

  }, 'Get hfPersonnels', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}

exports.upload = (req, res) => {
  TryCatch(async (res, req) => {

    var data = req.body;
    var results = [];

    for (let x = 0, len = data.hfPersonnel.length; x < len; x++) {
      hfPersonnelID = await GetNewID (HfPersonnel, 'hfPersonnelID', 1, 6 , 'DOHHFP');
      const newHfPersonnel = await new HfPersonnelClass({
        ...data.hfPersonnel[x],
        hfPersonnelID: hfPersonnelID[0]
      });

      await newHfPersonnel
        .save()
        .then(data => {
          // res.json({status: true, hfPersonnel: data});
          results.push({_id: data._id, name: data.name, hfPersonnelID: data.hfPersonnelID, success: true});

          if (x+1 == len) {
            res.json({result: results});
          }
        })
        .catch(err => {
          results.push({_id: data._id, name: data.name, hfPersonnelID: data.hfPersonnelID, success: false});
          if (x+1 == len) {
            res.json({result: results});
          }
        })
    }
    

  }, 'Add new hfPersonnel', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}


exports.getDashboardNumbers = (req, res) => {
  TryCatch((res, req) => {

    HfPersonnelClass.getDashboardNumbers()
      .then(result => {
        res.json({status: true, data:result});
      })
      .catch(error => {
        res.json({status: false, error: error});
      });

  }, 'Get hfPersonnels dashboard numbers', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}

exports.getDashboardClassificationNumbers = (req, res) => {
  TryCatch((res, req) => {

    HfPersonnelClass.getDashboardClassificationNumbers(undefined, "category")
      .then(result => {
        HfPersonnelClass.getDashboardClassificationNumbers(undefined, "employment.profession", "profession")
          .then(result2 => {
            res.json({status: true, data:result, data2:result2});
          })
          .catch(error => {
            res.json({status: false, error: error});
          });
      })
      .catch(error => {
        res.json({status: false, error: error});
      });

  }, 'Get hfPersonnels dashboard numbers', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}


exports.getDashboardProfession = (req, res) => {
  TryCatch((res, req) => {
    var filter = JSON.parse(req.query.filter);
    console.log((filter.province != "ALL")?filter:undefined);

    HfPersonnelClass.getDashboardClassificationNumbers((filter.province != "ALL")?filter:undefined, "employment.profession", "profession")
      .then(result2 => {
        res.json({status: true, data2:result2});
      })
      .catch(error => {
        res.json({status: false, error: error});
      });

  }, 'Get hfPersonnels dashboard numbers Profession', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}


exports.getDashboardCategories = (req, res) => {
  TryCatch((res, req) => {

    var filter = JSON.parse(req.query.filter);
    console.log((filter.province != "ALL")?filter:undefined);

    HfPersonnelClass.getDashboardClassificationNumbers((filter.province != "ALL")?filter:undefined, "category")
      .then(result => {
        res.json({status: true, data:result});
      })
      .catch(error => {
        res.json({status: false, error: error});
      });

  }, 'Get hfPersonnels dashboard numbers Categories', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}


exports.getDuplicates = (req, res) => {
  TryCatch((res, req) => {

    var data = (req.query.filters)?JSON.parse(req.query.filters):{};
    var cond = data.find;
    var keys = Object.keys(cond || []);
    keys.map((key, i) => {
      cond[key] = new RegExp(["", cond[key], ""].join(""), "i")
    });

    if (req.query.value){
      cond = (cond)?[cond]:[];
      var value = JSON.parse(req.query.value)
      var props = value.props;
      var regex = new RegExp(["", value.keyword, ""].join(""), "i");

      if (props == "name") {
        cond.push({ $or: [{["name.first"]: regex}, {["name.mid"]: regex}, {["name.last"]: regex}]});
      } else if (props == "address"){
        cond.push({ $or: [{["address.fullAddress"]: regex}, {["address.province"]: regex}, {["address.munCity"]: regex}, {["address.barangay"]: regex}]});
      } else {
        cond.push({[props]: regex});
      }

      cond = {
        $and: cond
      };
    }

    HfPersonnelClass.getDuplicates(data.page, data.count, cond, data.sort, data.select)
      .then(duplicates => {
        res.json({status: true, data:{ duplicates: duplicates, count: 1}});
      })
      .catch(error => {
        res.json({error: 'error message'});
      });

  }, 'Get duplicates', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}


exports.getAnnexA = (req, res) => {
  TryCatch((res, req) => {

    var data = (req.query.filters)?JSON.parse(req.query.filters):{};
    var cond = data.find;
    var keys = Object.keys(cond || []);
    keys.map((key, i) => {
      cond[key] = new RegExp(["", cond[key], ""].join(""), "i")
    });

    if (req.query.value){
      cond = (cond)?[cond]:[];
      var value = JSON.parse(req.query.value)
      var props = value.props;
      var regex = new RegExp(["", value.keyword, ""].join(""), "i");

      if (false) {
      } else {
        cond.push({[props]: regex});
      }

      cond = {
        $and: cond
      };
    }

    HfPersonnelClass.getAnnexA(data.page, data.count, cond, data.sort, data.select)
      .then(annex_as => {
        res.json({status: true, data:{ annex_as: annex_as, count: 1}});
      })
      .catch(error => {
        res.json({error: 'error message'});
      });

  }, 'Get Annex A', 'Server - api/hfPersonnel.js -> Line: 19 - 30', 2, req, res);
}

