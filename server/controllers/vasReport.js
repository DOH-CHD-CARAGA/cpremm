const VasReportClass = require('../modules/VasReportClass');

const { TryCatch }    = require('../routes/middleware/log-helper');
const { GetNewID }    = require('../routes/middleware/registration-helper');

exports.update = (req, res) => {
  TryCatch((res, req) => {
    var data = req.body;

    const vasReport = new VasReportClass({
      ...data.vasReport
    });

    vasReport
      .update()
      .then(data => {
        res.json({status: true, vasReports: data});
      })
      .catch((err) => {
        res.json({status: false, error: err});
      });
  }, "Add Update VAS Data", "Server - api/vasReport.js -> Line: 19 - 30", 2, req, res);
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
    console.log("LLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSSSS");
    console.log(data);
    VasReportClass.get(data.page, data.count, cond, data.sort, data.select)
      .then(vasReports => {
        console.log("(((!****)))");
        console.log(vasReports);

        VasReportClass.count(cond).then((count) => {
          res.json({status: true, data:{ vasReports: vasReports, count: count}});
        })
      })
      .catch(error => {
        res.json({error: 'error message'});
      });

  }, "Get VAS Reports", "Server - api/ceir/vas-report.js -> Line: 19 - 30", 2, req, res);
}
