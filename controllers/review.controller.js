const reviewService = require("../services/review.service");
const userService = require("../services/user.service");

exports.createReview = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await userService.findOneUserService({ email });
    const newReview = await reviewService.createReviewService({...req.body, user: {email, _id: user._id}});
    res.status(200).json({ success: true, data: newReview });
  } catch (error) {
    next(error);
  }
};

exports.getReviewsByBookId = async (req, res, next) => {
  try {
    const {bookId} = req.params
    const reviews = await reviewService.getReviewsByBookIdService(bookId)
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error)
  }
}