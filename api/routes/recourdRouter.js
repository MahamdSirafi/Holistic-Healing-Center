const {
  createRecord,
  getAllRecord,
  getRecord,
} = require('../controllers/recordController');
const { protect, restrictTo } = require('../middlewares/authMiddlewers');
const { addQuery } = require('../middlewares/dynamicMiddleware');
const express = require('express');
const Dates = require('../models/dateModel');
const router = express.Router();
router.use(protect);
router
  .route('/mine')
  .get(restrictTo('user'), addQuery('pataint', 'userId'), getAllRecord);
router
  .route('/')
  .get(restrictTo('doctor'),getAllRecord)
  .post(restrictTo('doctor'), createRecord);
router.route('/:id').get(getRecord);
module.exports = router;
