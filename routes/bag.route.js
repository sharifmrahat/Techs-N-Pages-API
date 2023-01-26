const express = require("express");
const router = express.Router();
const bagController = require("../controllers/bag.controller");
const { verifyToken } = require("../middleware/verifyToken");
// const authorization = require("../utils/authorization");

// router.route("/create").post(verifyToken, bagController.createBag);

router.route("/add/:bagId").patch(verifyToken, bagController.addToBag);

router.get("/myBag/:id", verifyToken, bagController.getMyBag);


router.route("/update/:bagId/:itemId").patch(verifyToken, bagController.updateBagItem);

router.route("/delete/:bagId/:itemId").patch(verifyToken, bagController.deleteBagItem);


module.exports = router;
