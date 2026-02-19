const express = require('express');
const router = express.Router();
const { submitAdditionScore, submitMultiplicationScore } = require('../controllers/mathController');

router.post('/addition', submitAdditionScore);
router.post('/multiplication', submitMultiplicationScore);

module.exports = router;
