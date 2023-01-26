const express = require("express");
const router = express.Router();
const bagController = require("../controllers/bag.controller");
const { verifyToken } = require("../middleware/verifyToken");
// const authorization = require("../utils/authorization");

// router.route("/add").post(verifyToken, bagController.createBag);

router.get("/myBag/:id", verifyToken, bagController.getMyBag);

router.route("/update/:bagId/:itemId").patch(verifyToken, bagController.updateBag);


module.exports = router;
