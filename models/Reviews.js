const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = mongoose.Schema(
  {
    description: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        trim: true,
        required: true
    },
    bookId: {
        type: String,
        required: true
    },
    userInfo: {
        _id: {
        type: ObjectId,
        required: true
      },
      email: {
          type: String,
          required: true
        },
      },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
