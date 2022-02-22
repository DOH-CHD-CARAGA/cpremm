const express = require('express');
const router = express.Router();
const Sample = require('../../controllers/sample');
// const Office = require('../../controllers/office');

// const checkAuth = require('../middleware/checkAuth');
// const checkAdmin = require('../middleware/check-admin');

router.get('/get', Sample.get);

router.post('/post', Sample.post);

// router.post('/update', checkAuth, Office.update);

module.exports = router;
