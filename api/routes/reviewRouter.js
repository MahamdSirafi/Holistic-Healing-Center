const reviewController = require('../controllers/reviewController');
const { addVarBody } = require('../middlewares/dynamicMiddleware');
const authMiddlewers = require('./../middlewares/authMiddlewers');
const express = require('express');
const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route('/')
  .get(reviewController.getAllreview)
  .post(
    authMiddlewers.restrictTo('user'),
    addVarBody('pataint', 'userId'),
    reviewController.createreview
  );
router
  .route('/:id')
  .delete(authMiddlewers.restrictTo('admin'), reviewController.deletereview);
module.exports = router;
