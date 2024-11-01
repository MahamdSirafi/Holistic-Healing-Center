const departmentController = require('../controllers/departmentController');
const authMiddlewers = require('./../middlewares/authMiddlewers');
const express = require('express');
const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route('/')
  .get(departmentController.getAlldepartment)
  .post(
    authMiddlewers.restrictTo('admin'),
    departmentController.createdepartment
  );
router
  .route('/:id')
  .get(departmentController.getdepartment)
  .patch(
    authMiddlewers.restrictTo('admin'),
    departmentController.updatedepartment
  )
  .delete(
    authMiddlewers.restrictTo('admin'),
    departmentController.deletedepartment
  );
module.exports = router;
