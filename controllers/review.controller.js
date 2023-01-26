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

exports.getMyReviews = async (req, res, next) => {
  try {
    const loggedEmail = req.user?.email;
  
    const loggedUser = await userService.findOneUserService({
      email: loggedEmail,
    });
    if (loggedUser.email !== loggedEmail) {
      return res
        .status(400)
        .json({
          success: false,
          error: "You're not authorized to get data",
        });
    }
    const myReviews = await reviewService.getMyReviewsService(loggedUser._id)
    res.status(200).json({ success: true, data: myReviews });
  } catch (error) {
    next(error)
  }
}