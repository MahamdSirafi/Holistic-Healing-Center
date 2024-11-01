const doctorController = require("../controllers/doctorController");
  const authMiddlewers = require('./../middlewares/authMiddlewers');
  const express = require("express");
  const router = express.Router();
  router.use(authMiddlewers.protect);
  router.route("/").get(doctorController.getAlldoctor).post(doctorController.createdoctor);
  router
    .route("/:id")
    .get(doctorController.getdoctor)
    .patch(doctorController.updatedoctor)
    .delete(doctorController.deletedoctor);
  module.exports = router;
  