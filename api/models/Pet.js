import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  photoUrl: { type: String, required: true },
  deceasedUser: { type: mongoose.Schema.Types.ObjectId, ref: "DeceasedUser" },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  type: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
