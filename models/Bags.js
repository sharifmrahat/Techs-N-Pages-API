const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const bagSchema = mongoose.Schema(
  {
    items: [
      {
        name: {
          type: String,
          trim: true,
        },
        imageURL: {
            type: String,
            validate: [validator.isURL, "Please provide a valid url"],
          },
        price: {
            type: Number,
          },
        quantity: {
            type: Number,
          },
        uid: {
            type: String,
          },
        createdAt: {
          type: Date,
        }
      },
    ],
    user: {
        _id: {
        type: ObjectId,
        ref: "User",
        unique: true,
        required: true
      },
      email: {
          type: String,
          unique: true,
          required: true
        },
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


const Bag = mongoose.model("Bag", bagSchema);

module.exports = Bag;
