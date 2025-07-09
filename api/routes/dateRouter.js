const dateController = require('../controllers/dateController');
const { protect, restrictTo } = require('./../middlewares/authMiddlewers');
const { addVarBody, addQuery } = require('./../middlewares/dynamicMiddleware');
const { checkOwner } = require('./../middlewares/checkMiddleware');
const express = require('express');
const Dates = require('../models/dateModel');
const router = express.Router();
router.use(protect);
router.route('/doctor/:id/available').get(dateController.available);
router
  .route('/mineForUser')
  .get(
    restrictTo('user'),
    // addQuery('pataint', 'userId'),
    // addQuery('date[gte]', Date.now()),
    dateController.getDateUser
  );
router
  .route('/mineForDoctor')
  .get(restrictTo('doctor'), dateController.getDateDoctor);
router
  .route('/')
  .get(restrictTo('admin'), dateController.getAlldate)
  .post(
    restrictTo('user'),
    addVarBody('pataint', 'userId'),
    dateController.createdate
  );
router
  .route('/canceled/:id')
  .patch(
    restrictTo('user'),
    checkOwner(Dates, 'pataint', 'id'),
    addVarBody('canceled', true),
    dateController.updatedate
  );
router
  .route('/review/:id')
  .patch(restrictTo('doctor'), dateController.updatedate);
router
  .route('/:id')
  .get(dateController.getdate)
  .delete(restrictTo('admin'), dateController.deletedate);
module.exports = router;
