import mongoose from "mongoose";

const eulogyItemSchema = new mongoose.Schema({
  eulogySpeech: { type: String },
  eulogyAuthor: { type: String },
  eulogyAuthorPhotoUrl: { type: String },
});

const onboardingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // deceasedUser: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "DeceasedUser",
  // },
  currentStep: {
    type: Number,
    default: 1,
  },
  formData: {
    firstName: String,
    lastName: String,
    birthDate: Date,
    deathDate: Date,
    cityBorn: String,
    stateBorn: String,
    cityDied: String,
    stateDied: String,
    cityDiedLongitude: Number,
    cityDiedLatitude: Number,
    cityBornLongitude: Number,
    cityBornLatitude: Number,
    obituary: String,
    eulogies: [eulogyItemSchema],
    userRelation: String,
    profilePhotoUrl: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

onboardingSchema.virtual("photos", {
  ref: "Photo",
  localField: "_id",
  foreignField: "Onboarding",
});

const Onboarding = mongoose.model("Onboarding", onboardingSchema);

export default Onboarding;
