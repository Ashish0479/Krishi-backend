const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  email: { type: String, required: [true, "email is required"], unique: true },
  contactNumber: { type: String },
  password: { type: String, required: [true, "password is required"] },

  gender: { type: String },
  dateOfBirth: { type: Date },

  state: { type: String ,default:"kerala"},
  district: { type: String },
  village: { type: String },
  pincode: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },

  landSize: { type: Number },
  landType: { type: String },
  currentCrop:{type:String},
  crops: [{ type: String }],
  farmingExperience: { type: Number },
  waterSource: { type: String },
  soilType: { type: String },
  plantingDate:{type:Date},

  irrigationMethod:{type:String ,enum:["Drip","Sprinkler","Surface","Subsurface","Manual"]},
  fertilizerPreference:{type:String ,enum:["Organic","Chemical","Mixed"]},
  pesticideUsage:{type:String ,enum:["Low","Medium","High","Organic"]},
  mechanizationLevel:{type:String ,enum:["Manual","Semi","Fully"]},


  primaryGoal:{type:String ,enum:["Maximize Yield","Sustainability","Cost Efficiency","Quality Improvement"]},
  budgetLevel:{type:String ,enum:["Low","Medium","High"]},
  marketAccess:{type:String ,enum:["Local","Regional","National","International"]},

  pastDiseases: [{ type: String }],
  yieldHistory: [{ year: Number, yield: Number }],

  


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
