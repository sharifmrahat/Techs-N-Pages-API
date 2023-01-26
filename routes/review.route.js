const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const { verifyToken } = require("../middleware/verifyToken");
// const authorization = require("../utils/authorization");

router.route("/create").post(verifyToken, reviewController.createReview);


module.exports = router;