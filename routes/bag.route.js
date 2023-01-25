const express = require("express");
const router = express.Router();
const bagController = require("../controllers/bag.controller");
const { verifyToken } = require("../middleware/verifyToken");
// const authorization = require("../utils/authorization");

router.route("/add").post(verifyToken, bagController.createBag);


// router.route("/login").post(userController.login);

// router.get("/currentUser", verifyToken, userController.getCurrentUser);

// router.route("/update").patch(verifyToken, userController.updateUser);


// router.get("/all", verifyToken, authorization("admin"), userController.getAllUser);
// router
//   .route("/update/role/:id")
//   .patch(verifyToken, authorization("admin"), userController.updateUserRole);

// router
//   .route("/delete/:id")
//   .delete(verifyToken, authorization("admin"), userController.deleteUser);

module.exports = router;
