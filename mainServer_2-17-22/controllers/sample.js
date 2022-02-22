const SampleModel = require('../models/SampleModel');
const SampleModule = require('../modules/SampleModule');

const { TryCatch } = require('../routes/middleware/log-helper');

exports.get = (req, res) => {
    TryCatch(async (res, req) => {
        console.log(req.query);
        res.json({
            result: "success",
            name: "Ricky",
        })
    }, "Add new office", "Server - api/office.js -> Line: 19 - 30", 2, req, res);
}

exports.post = (req, res) => {
    TryCatch(async (res, req) => {
        // console.log(req.body);
        const newSampleModule = new SampleModule({
            name: req.body.name,
            age: req.body.age
        });
        newSampleModule.save()
        .then((data)=>{
            console.log(data);
        });
    }, "Add new office", "Server - api/office.js -> Line: 19 - 30", 2, req, res);
}
