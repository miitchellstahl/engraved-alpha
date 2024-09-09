import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deceasedUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DeceasedUser" },
  ],
  onboardingUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Onboarding" },
  ],
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Auto-populate middleware
userSchema.pre("find", autoPopulateOnboarding);
userSchema.pre("findOne", autoPopulateOnboarding);
userSchema.pre("findById", autoPopulateOnboarding);

function autoPopulateOnboarding(next) {
  this.populate({
    path: "onboardingUsers",
    select:
      "formData._id formData.firstName formData.lastName formData.profilePhotoUrl currentStep formData.userRelation formData.deathDate",
  });
  next();
}

const User = mongoose.model("User", userSchema);

export default User;
