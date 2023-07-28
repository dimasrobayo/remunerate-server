const express = require('express');
const router = express.Router();
const tenantsController = require('../controllers/tenantsController');

router.use(tenantsController.identifyTenant);

module.exports = router;
