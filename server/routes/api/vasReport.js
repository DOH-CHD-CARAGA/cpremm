const express = require('express');
const router = express.Router();
const VasReport = require('../../controllers/vasReport');

const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/check-admin');

router.get('/get', checkAuth, VasReport.get);

router.post('/update', checkAuth, checkAdmin, VasReport.update);

module.exports = router;
