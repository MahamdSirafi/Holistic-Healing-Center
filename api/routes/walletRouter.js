const walletController = require("../controllers/walletController");
const authMiddlewers = require('./../middlewares/authMiddlewers');
const dynamicMiddleware = require('./../middlewares/dynamicMiddleware');
const express = require("express");
const router = express.Router();
router.use(authMiddlewers.protect);
router.route("/mine").get(dynamicMiddleware.addQuery("_id", "userId"), walletController.getAllwallet)
router
  .route("/deposit")
  .patch(walletController.deposit)
router
  .route("/withdrawal")
  .patch(walletController.withdrawal)


module.exports = router;
