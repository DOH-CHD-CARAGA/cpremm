const express = require('express');
const router = express.Router();
const Device = require('../../controllers/device');

const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/check-admin');

router.get('/get', Device.get);

router.get('/getdashboardnumbers', Device.getDashboardNumbers);
router.get('/getdashboardnumbers2', Device.getDashboardNumbers2);

router.post('/new', checkAuth, Device.new);

router.post('/delete', checkAuth, Device.delete);

router.post('/update', checkAuth, Device.update);
  
router.post('/submit', checkAuth, Device.submit);


module.exports = router;
