const companyController = require('../controllers/companyController');
const authMiddlewers = require('../middlewares/authMiddlewers');
const express = require('express');
const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route('/')
  .get(companyController.getAllCompany)
  .post(authMiddlewers.restrictTo('admin'), companyController.createCompany);
router
  .route('/:id')
  .get(companyController.getCompany)
  .patch(authMiddlewers.restrictTo('admin'), companyController.updateCompany)
  .delete(authMiddlewers.restrictTo('admin'), companyController.deleteCompany);
module.exports = router;
