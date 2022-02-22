const express = require('express');
const router = express.Router();
const Record = require('../../controllers/record');

const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/check-admin');

router.get('/get', Record.get);

router.get('/detail', checkAuth, Record.getDetail);

router.post('/submit', checkAuth, Record.submit);

router.post('/submitAll', checkAuth, Record.submitAll);

router.post('/update', checkAuth, Record.update);


// router.post('/new', checkAuth, Record.new);
// router.post('/update', checkAuth, Record.update);


module.exports = router;
