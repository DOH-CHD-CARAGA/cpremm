const express = require('express');
const router = express.Router();
const HealthFacility = require('../../controllers/healthFacility');

const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/check-admin');

router.get('/get', checkAuth, HealthFacility.get);

router.post('/new', checkAuth, checkAdmin, HealthFacility.new);

router.post('/update', checkAuth, HealthFacility.update);

module.exports = router;
