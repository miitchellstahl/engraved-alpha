import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  placeLongitude: { type: Number, required: true },
  placeLatitude: { type: Number, required: true },
  deceasedUser: { type: mongoose.Schema.Types.ObjectId, ref: "DeceasedUser" },
  content: { type: String },
  author: { type: String, required: true },
  placeName: { type: String, required: true },
  type: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Define a virtual field for photos associated with the place
placeSchema.virtual("photos", {
  ref: "Photo",
  localField: "_id",
  foreignField: "place",
});

// Ensure virtual fields are included in JSON
placeSchema.set("toObject", { virtuals: true });
placeSchema.set("toJSON", { virtuals: true });

const Place = mongoose.model("Place", placeSchema);

export default Place;
