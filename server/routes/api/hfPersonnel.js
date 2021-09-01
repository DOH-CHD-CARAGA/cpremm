const express = require('express');
const router = express.Router();
const HfPersonnel = require('../../controllers/hfPersonnel');

const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/check-admin');

router.get('/get', checkAuth, HfPersonnel.get);
router.get('/get-dashboard-numbers', HfPersonnel.getDashboardNumbers);
router.get('/get-dashboard-classification-numbers', HfPersonnel.getDashboardClassificationNumbers);
router.get('/get-dashboard-classification-numbers/professions', HfPersonnel.getDashboardProfession);
router.get('/get-dashboard-classification-numbers/categories', HfPersonnel.getDashboardCategories);
router.get('/annex-a', checkAuth, HfPersonnel.getAnnexA);

router.post('/new', checkAuth, checkAdmin, HfPersonnel.new);

router.post('/delete', checkAuth, checkAdmin, HfPersonnel.delete);

router.post('/update', checkAuth, HfPersonnel.update);

router.post('/upload', checkAuth, HfPersonnel.upload);

router.get('/get-duplicates', HfPersonnel.getDuplicates);

module.exports = router;
