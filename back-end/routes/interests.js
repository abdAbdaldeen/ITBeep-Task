var express = require('express');
var router = express.Router();
const {getInterests,addInterests} = require('../controllers/interestsController');

/* GET interests */
router.get('/', getInterests);
/* Add interest */
router.post('/', addInterests);
module.exports = router;