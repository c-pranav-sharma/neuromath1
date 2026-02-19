const express = require('express');
const router = express.Router();
const { getUserReport, createUser } = require('../controllers/reportController');

router.get('/:userId', getUserReport);
router.post('/user', createUser);

module.exports = router;
