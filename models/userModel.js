const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a name"],
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Please provide a email"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
      type: String,
      trim: true,
      minLength: [8, "Password must be atleast 8 character long"],
      required: [true, "Please provide a password"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("cart", {
  ref: "Cart",
  localField: "_id",
  foreignField: "userId",
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.validatePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
