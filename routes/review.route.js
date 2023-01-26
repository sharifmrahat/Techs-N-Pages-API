const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const { verifyToken } = require("../middleware/verifyToken");
// const authorization = require("../utils/authorization");

router.route("/create").post(verifyToken, reviewController.createReview);

router.get("/my", verifyToken, reviewController.getMyReviews);
router.get("/get/:bookId", verifyToken, reviewController.getReviewsByBookId);

module.exports = router;