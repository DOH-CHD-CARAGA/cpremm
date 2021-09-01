const HealthFacility = require('../models/HealthFacility');
const HealthFacilityClass = require('../modules/HealthFacilityClass');
const HfPersonnelClass = require('../modules/HfPersonnelClass');
const { TryCatch }    = require('../routes/middleware/log-helper');
const { GetNewID }    = require('../routes/middleware/registration-helper');
exports.new = (req, res) => {
  TryCatch(async (res, req) => {

    var data = req.body;
    healthFacilityID = await GetNewID (HealthFacility, 'healthFacilityID', 1, 5 , 'GOHF');
    const newHealthFacility = new HealthFacilityClass({
      ...data.healthFacility,
      healthFacilityID: healthFacilityID[0]
    });

    newHealthFacility
      .save()
      .then(result => {
        console.log(result);
        res.json({status: true, healthFacility: result, index: data.index});
      })

  }, 'Add new healthFacility', 'Server - api/healthFacility.js -> Line: 19 - 30', 2, req, res);
}

exports.update = (req, res) => {
  TryCatch((res, req) => {

    var data = req.body;
    const healthFacility = new HealthFacilityClass({
      ...data.healthFacility
    });

    healthFacility
      .update()
      .then(data => {
        res.json({status: true, healthFacilitys: data});
      })
      .catch((err) => {
        res.json({status: false, error: err});
      });

  }, 'Add Update healthFacility', 'Server - api/healthFacility.js -> Line: 19 - 30', 2, req, res);
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

    HealthFacilityClass.getHealthFacilitys(data.page, data.count, cond, data.sort, data.select)
      .then(async healthFacilitys => {
        if (healthFacilitys[0].hasOwnProperty("ownership") && healthFacilitys[0].hasOwnProperty("email")) {
          var prov = {
            "Agusan Del Norte": "adn",
            "Agusan Del Sur": "ads",
            "Province of Dinagat Islands": "pdi",
            "Surigao Del Norte": "sdn",
            "Surigao Del Sur": "sds",
          }
          for (let x = 0, len = healthFacilitys.length; x < len; x++) {

            var facility = new RegExp(["", healthFacilitys[x].name, ""].join(""), "i");
            var province = new RegExp(["", prov[healthFacilitys[x].province], ""].join(""), "i");
            var bhw1     = new RegExp(["", "barangay_health_worker", ""].join(""), "i");
            var bhw2     = new RegExp(["", "bhw", ""].join(""), "i");

            var notRHU = [
              new RegExp(["", "BPATS", ""].join(""), "i"),
              new RegExp(["", "BRGY.TANOD", ""].join(""), "i"),
              new RegExp(["", "BRGY. CAPTAIN", ""].join(""), "i"),
              new RegExp(["", "Barangay kagawad", ""].join(""), "i"),
              new RegExp(["", "BRGY KAGAWAD", ""].join(""), "i"),
              new RegExp(["", "BPATS Pres.", ""].join(""), "i"),
              new RegExp(["", "BHERT", ""].join(""), "i"),
              new RegExp(["", "PUROK", ""].join(""), "i"),
              new RegExp(["", "05_Others_BNS", ""].join(""), "i"),

              new RegExp(["", "SK CHAIRMAN", ""].join(""), "i"),
              new RegExp(["", "PUROK LEADER", ""].join(""), "i"),
              new RegExp(["", "BRGY.KGAWAD", ""].join(""), "i"),
              new RegExp(["", "BRGY. KAGAWAD", ""].join(""), "i"),
              new RegExp(["", "BARANGAY CAPTAIN", ""].join(""), "i"),
              new RegExp(["", "PUNONG BRGY", ""].join(""), "i"),
              new RegExp(["", "BARANGAY", ""].join(""), "i"),
              new RegExp(["", "KAGAWAD", ""].join(""), "i"),
              new RegExp(["", "CAPTAIN", ""].join(""), "i"),

              new RegExp(["", "PUROK-PRESIDENT", ""].join(""), "i"),
              new RegExp(["", "BRGY. TANOD (BHERT)", ""].join(""), "i"),
              new RegExp(["", "BHERT", ""].join(""), "i"),
              new RegExp(["", "PUNONG BARANGAY", ""].join(""), "i"),
              new RegExp(["", "BRGY. OFFICIAL", ""].join(""), "i"),
              new RegExp(["", "BARANGAY COUNCIL", ""].join(""), "i"),
              new RegExp(["", "BRGY", ""].join(""), "i"),
              new RegExp(["", "SLP PRESIDENT", ""].join(""), "i"),
              new RegExp(["", "19_Others_BHERTS", ""].join(""), "i"),

              new RegExp(["", "BARANGAY TANOD", ""].join(""), "i"),
              new RegExp(["", "KAGAWAD", ""].join(""), "i"),
              new RegExp(["", "BRGY. TREASURER", ""].join(""), "i"),
              new RegExp(["", "BARANGAY KAGAWAD", ""].join(""), "i"),
              new RegExp(["", "Brgy.Kagawad", ""].join(""), "i"),
              new RegExp(["", "BRGY.TANOD (BHERT)", ""].join(""), "i"),
              new RegExp(["", "TANOD", ""].join(""), "i"),

              new RegExp(["", "BRGY. SK CHAIRMAN", ""].join(""), "i"),
              new RegExp(["", "BRGY. SECRETARY", ""].join(""), "i"),
              new RegExp(["", "TANOD", ""].join(""), "i"),
              new RegExp(["", "BRGY.KAGAWAD", ""].join(""), "i"),
              new RegExp(["", "BRGY. RESCUE CHAIRMAN", ""].join(""), "i"),
              new RegExp(["", "BNS", ""].join(""), "i"),
            ];

            console.log(healthFacilitys[x]);


            if (healthFacilitys[x].category == "RHU" || healthFacilitys[x].category == "MHO" || healthFacilitys[x].category == "CHO") {
              await HfPersonnelClass.count(
                {province: province, facility: facility, $or: [{'employment.profession': bhw1}, {'employment.profession': bhw2}]}
              ).then((count) => {
                healthFacilitys[x] = {
                  ...healthFacilitys[x],
                  bhw: count
                }
              }).catch(err => {
              })

              await HfPersonnelClass.count(
                {province: province, facility: facility, 'employment.profession': {$nin: [...notRHU]}}
              ).then((count2) => {
                healthFacilitys[x] = {
                  ...healthFacilitys[x],
                  pCount: count2
                }
              }).catch(err => {
              })
            } else {
              await HfPersonnelClass.count({province: province, facility: facility}).then((count) => {
                healthFacilitys[x] = {
                  ...healthFacilitys[x],
                  bhw: 0,
                  pCount: count,
                }
              }).catch(err => {
              })
            }
          }
        }

        HealthFacilityClass.count(cond).then((count) => {
          res.json({status: true, data:{ healthFacilitys: healthFacilitys, count: count}});
        })
      })
      .catch(error => {
        res.json({error: 'error message'});
      });

  }, 'Get healthFacilitys', 'Server - api/healthFacility.js -> Line: 19 - 30', 2, req, res);
}

