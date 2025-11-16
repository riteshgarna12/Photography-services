const express = require('express');
const router = express.Router();
const { listPackages, getPackage, createPackage } = require('../controllers/serviceController');
const auth = require('../middleware/auth'); // optional for create

router.get('/', listPackages);            // GET /api/services?category=wedding
router.get('/:slug', getPackage);         // GET /api/services/wedding-premium
router.post('/', auth, createPackage);    // POST /api/services  (admin)
module.exports = router;
