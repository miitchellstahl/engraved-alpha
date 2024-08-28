import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  albumDate: {
    type: Date,
  },
  deceasedUser: { type: mongoose.Schema.Types.ObjectId, ref: "DeceasedUser" },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
  createdAt: { type: Date, default: Date.now },
});

// Automatically populate the photos field when converting to JSON or object
albumSchema.set("toObject", { virtuals: true });
albumSchema.set("toJSON", { virtuals: true });

const Album = mongoose.model("Album", albumSchema);

export default Album;
