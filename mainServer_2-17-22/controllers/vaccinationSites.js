const VaccinationSites = require('../models/VaccinationSites');
const VaccinationSitesClass = require('../modules/VaccinationSitesClass');
const { TryCatch }    = require('../routes/middleware/log-helper');
const { GetNewID }    = require('../routes/middleware/registration-helper');
exports.new = (req, res) => {
  TryCatch(async (res, req) => {

    var data = req.body;
    vaccinationSitesID = await GetNewID (VaccinationSites, 'vaccinationSitesID', 1, 5 , 'GOVS');
    const newVaccinationSites = new VaccinationSitesClass({
      ...data.vaccinationSites,
      vaccinationSitesID: vaccinationSitesID[0]
    });

    newVaccinationSites
      .save()
      .then(result => {
        res.json({status: true, vaccinationSites: result, index: data.index});
      })

  }, 'Add new vaccinationSites', 'Server - api/vaccinationSites.js -> Line: 19 - 30', 2, req, res);
}

exports.update = (req, res) => {
  TryCatch((res, req) => {

    var data = req.body;
    const vaccinationSites = new VaccinationSitesClass({
      ...data.vaccinationSites
    });

    vaccinationSites
      .update()
      .then(data => {
        res.json({status: true, vaccinationSitess: data});
      })
      .catch((err) => {
        res.json({status: false, error: err});
      });

  }, 'Add Update vaccinationSites', 'Server - api/vaccinationSites.js -> Line: 19 - 30', 2, req, res);
}

exports.get = (req, res) => {
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

      if (false){

      } else {
        cond.push({[props]: regex});
      }
      cond = {
        $and: cond
      };
    }

    VaccinationSitesClass.getVaccinationSitess(data.page, data.count, cond, data.sort, data.select)
      .then(vaccinationSitess => {
        VaccinationSitesClass.count(cond).then((count) => {
          res.json({status: true, data:{ vaccinationSitess: vaccinationSitess, count: count}});
        })
      })
      .catch(error => {
        res.json({error: 'error message'});
      });

  }, 'Get vaccinationSitess', 'Server - api/vaccinationSites.js -> Line: 19 - 30', 2, req, res);
}

