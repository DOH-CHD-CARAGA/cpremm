const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Record = require('../../controllers/record2');
const RecordClass = require('../../modules/RecordClass');

const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/check-admin');
const { Mongoose } = require('mongoose');

router.get('/get', Record.get);

router.post('/new', checkAuth, Record.new);

router.get('/detail', checkAuth, Record.getDetail);

router.post('/submit', checkAuth, Record.submit);

router.post('/delete', checkAuth, Record.delete);

// router.get('/arrange', Record.submit);

router.get('/arrange', async (req, res) => {

    Record.arrange(req, res);

    // var data = await RecordClass.getRecordsTemp(1, 1, {_id: mongoose.Types.ObjectId("5f0dc7ceb6af5a2ccc3482e0")});
    // console.log("-------------............::");
    // console.log(data);
    // Record.submit(req, res, {data:{record:{...data[0]}}});

    // var data = await RecordClass.getRecordsTemp(20, 2);
    // for (let x = 0, len = data.length; x < len; x++) {
    //     console.log(data[x]);
    //     // Record.submit(req, res, {data:{record:{...data[0]}}}, x);
    // }
    // res.json({success: true});
    // console.log("DONE");
});

// router.post('/new', checkAuth, Record.new);
// router.post('/update', checkAuth, Record.update);


module.exports = router;
