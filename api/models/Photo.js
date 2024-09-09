import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  photoUrl: { type: String, required: true },
  deceasedUser: { type: mongoose.Schema.Types.ObjectId, ref: "DeceasedUser" },
  onboarding: { type: mongoose.Schema.Types.ObjectId, ref: "Onboarding" },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" }, // Reference to the Place model
  placeName: { type: String },
  location: { type: String },
  content: { type: String },
  date: { type: Date, default: Date.now },
  author: { type: String },
  albumTitle: { type: String },
  type: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
