const Review = require("../models/Reviews");

exports.createReviewService = async (data) => {
  const newReview = await Review.create(data);
  return newReview;
};