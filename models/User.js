const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const duplicateHandler = require('../utils/duplicateHandler')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [50, "Name is to long, max 50 characters"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "The email you entered is not valid"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough!",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Enter password again to confirm"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords does not match!",
      },
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
      },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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


// duplicateHandler(userSchema, 'User is already exist with this email: {VALUE}')


userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const password = this.password;

  const hashedPassword = bcrypt.hashSync(password);

  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
