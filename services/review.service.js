const Review = require("../models/Reviews");

exports.createReviewService = async (data) => {
  const newReview = await Review.create(data);
  return newReview;
};

exports.getReviewsByBookIdService = async (id) => {
  const reviews = await Review.find({bookId: id});
  return reviews;
};