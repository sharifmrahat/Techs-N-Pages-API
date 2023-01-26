const reviewService = require("../services/review.service");
const userService = require("../services/user.service");

exports.createReview = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await userService.findOneUserService({ email });

    const data = {
      userId: user._id,
      bookId: req.body.bookId
    }
    const reviewExist = await reviewService.getMyExistingReviewService(data)
    if(reviewExist){
      return res
      .status(400)
      .json({
        success: false,
        error: "Review is already exist for this book",
      });
    }
    const newReview = await reviewService.createReviewService({...req.body, userInfo: {email, _id: user._id}});
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

exports.updateMyReview = async (req, res, next) => {
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
          error: "You're not authorized to update data",
        });
    }

    const data = {
      id: req?.params.id,
      body: req?.body
    }
    const updatedReview = await reviewService.updateMyReviewService(data)
    if (!updatedReview.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Nothing has modified" });
    }
    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    next(error)
  }
}

exports.deleteMyReview = async (req, res, next) => {
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
          error: "You're not authorized to update data",
        });
    }
    const deletedReview = await reviewService.deleteMyReviewService(req?.params.id)
    if (!deletedReview.deletedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Could not delete the review" });
    }
    res.status(200).json({ success: true, data: deletedReview });
  } catch (error) {
    next(error)
  }
}