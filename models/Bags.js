const mongoose = require("mongoose");
const validator = require("validator");

const bagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter items name"],
      trim: true,
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
      },
    price: {
        type: Number,
        required: true,
      },
    quantity: {
        type: Number,
        required: true,
      },
    uid: {
        type: String,
        required: true,
      },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


const Bag = mongoose.model("User", bagSchema);

module.exports = Bag;
