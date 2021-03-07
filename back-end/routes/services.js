var express = require('express');
const {getServices,addService} = require('../controllers/serviceController');

var router = express.Router();
const ServiceModel = require('../models/service');

/* GET services */
router.get('/', getServices);

/* Add service */
router.post('/', addService);
module.exports = router;
