const { getstatstic } = require('../controllers/statissticController');
const { protect, restrictTo } = require('../middlewares/authMiddlewers');
const express = require('express');
const Dates = require('../models/dateModel');
const router = express.Router();
router.use(protect);
router.route('/').get(restrictTo('admin'), getstatstic);
module.exports = router;
