const addditonalController = require('../controllers/addditonalController');
const authMiddlewers = require('../middlewares/authMiddlewers');
const { addQuery, addVarBody } = require('../middlewares/dynamicMiddleware');
const express = require('express');
const router = express.Router({ mergeParams: true });
router.use(authMiddlewers.protect);
router
  .route('/')
  .get(addQuery('recourd', 'recourdId'), addditonalController.getAllAddetional)
  .post(
    authMiddlewers.restrictTo('doctor'),
    addVarBody('recourd', 'recourdId'),
    addditonalController.createAddetional
  );
router
  .route('/:id')
  .get(addditonalController.getAddetional)
  .patch(
    authMiddlewers.restrictTo('user'),
    addditonalController.updateAddetional
  );
module.exports = router;
