const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  email: { type: String, required: [true, "email is required"], unique: true },
  contactNumber: { type: String },
  password: { type: String, required: [true, "password is required"] },

  gender: { type: String },
  dateOfBirth: { type: Date },

  state: { type: String },
  district: { type: String },
  village: { type: String },
  pincode: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },

  landSize: { type: Number },
  landType: { type: String },
  crops: [{ type: String }],
  farmingExperience: { type: Number },
  waterSource: { type: String },
  soilType: { type: String },

  preferredLanguage: { type: String, default: "English" },
  notifications: { type: Boolean, default: true },
  premiumUser: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // dobara hash na ho
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
