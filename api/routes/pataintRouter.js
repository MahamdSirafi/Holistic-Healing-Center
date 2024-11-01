const pataintController = require('../controllers/pataintController');
const authMiddlewers = require('./../middlewares/authMiddlewers');
const dynamicMiddleware = require('./../middlewares/dynamicMiddleware');
const express = require('express');
const router = express.Router();
router.use(authMiddlewers.protect);

router
  .route('/updateMe')
  .patch(authMiddlewers.restrictTo('user'), pataintController.updatepataint);
router
  .route('/me')
  .get(
    authMiddlewers.restrictTo('user'),
    dynamicMiddleware.addQuery('_id', 'userId'),
    pataintController.getAllpataint
  );

router
  .route('/')

  .get(authMiddlewers.restrictTo('admin'), pataintController.getAllpataint)
  .post(
    authMiddlewers.restrictTo('user'),
    dynamicMiddleware.addVarBody('_id', 'userId'),
    pataintController.createpataint
  );
router
  .route('/:id')
  .get(
    authMiddlewers.restrictTo('admin', 'doctor'),
    pataintController.getpataint
  )
  .delete(
    authMiddlewers.restrictTo('admin', 'doctor'),
    pataintController.deletepataint
  );
module.exports = router;
