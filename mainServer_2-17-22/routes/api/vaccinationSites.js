const express = require('express');
const router = express.Router();
const VaccinationSites = require('../../controllers/vaccinationSites');

const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/check-admin');

router.get('/get', checkAuth, VaccinationSites.get);

router.post('/new', checkAuth, checkAdmin, VaccinationSites.new);

router.post('/update', checkAuth, VaccinationSites.update);

module.exports = router;
