const express = require('express');
const router = express.Router();
const JobOrderRequest = require('../../controllers/jobOrderRequest');

const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/check-admin');

router.get('/get', JobOrderRequest.get);

//router.post('/new', checkAuth, checkAdmin, JobOrderRequest.new);
router.post('/new',  JobOrderRequest.new);

router.post('/update', checkAuth, JobOrderRequest.update);

router.post('/action/add', checkAuth, JobOrderRequest.addAction);

router.post('/update/status', checkAuth, JobOrderRequest.updateStatus);

module.exports = router;
