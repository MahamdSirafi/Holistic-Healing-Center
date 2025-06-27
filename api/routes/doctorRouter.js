const doctorController = require('../controllers/doctorController');
const authMiddlewers = require('./../middlewares/authMiddlewers');
const express = require('express');
const router = express.Router();
router.use(authMiddlewers.protect);
router.route('/dates').get(doctorController.getAlldoctorDates);
router
  .route('/')
  .get(doctorController.getAlldoctor)
  .post(authMiddlewers.restrictTo('admin'), doctorController.createdoctor);
router
  .route('/statisstics')
  .get(authMiddlewers.restrictTo('doctor'), doctorController.getStatistics);
router
  .route('/:id')
  .get(doctorController.getdoctor)
  .patch(authMiddlewers.restrictTo('admin'), doctorController.updatedoctor)
  .delete(authMiddlewers.restrictTo('admin'), doctorController.deletedoctor);
module.exports = router;
