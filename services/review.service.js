const Review = require("../models/Reviews");

exports.createReviewService = async (data) => {
  const newReview = await Review.create(data);
  return newReview;
};

exports.getReviewsByBookIdService = async (id) => {
  const reviews = await Review.find({bookId: id});
  return reviews;
};

exports.getMyReviewsService = async (id) => {
  const myReviews = await Review.find({"userInfo._id": id});
  return myReviews;
};

exports.getMyExistingReviewService = async (data) => {
  const myReview = await Review.findOne({$and: [{"userInfo._id": data.userId}, {bookId: data.bookId}]});
  return myReview;
};

exports.updateMyReviewService = async (data) => {
  const updateReview = await Review.updateOne({_id: data.id}, data.body);
  return updateReview;
};

exports.deleteMyReviewService = async (id) => {
  const deleteReview = await Review.deleteOne({_id: id});
  return deleteReview;
};