import mongoose from "mongoose";

const eulogyItemSchema = new mongoose.Schema({
  eulogySpeech: { type: String },
  eulogyAuthor: { type: String },
  eulogyAuthorPhotoUrl: { type: String },
});

const deceasedUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  deathDate: { type: Date, required: true },
  cityBorn: { type: String, required: true },
  stateBorn: { type: String, required: true },
  cityDied: { type: String, required: true },
  stateDied: { type: String, required: true },
  obituary: { type: String },
  eulogies: [eulogyItemSchema],
  eulogy: { type: String },
  eulogyAuthor: { type: String },
  profilePhotoUrl: { type: String },
});

const DeceasedUser = mongoose.model("DeceasedUser", deceasedUserSchema);

export default DeceasedUser;
