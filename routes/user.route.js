const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/verifyToken");
const authorization = require("../utils/authorization");

router.route("/signup").post(userController.signup);

router.route("/login").post(userController.login);

router.get("/currentUser", verifyToken, userController.getCurrentUser);

router.route("/update").patch(verifyToken, userController.updateUser);

router
  .route("/update/role/:id")
  .patch(verifyToken, authorization("admin"), userController.updateUserRole);

router
  .route("/delete/:id")
  .delete(verifyToken, authorization("admin"), userController.deleteUser);

module.exports = router;
