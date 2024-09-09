import mongoose from "mongoose";

const mementoSchema = new mongoose.Schema({
  deceasedUser: { type: mongoose.Schema.Types.ObjectId, ref: "DeceasedUser" },
  location: { type: String },
  content: { type: String, required: true },
  author: { type: String, required: true },
  type: { type: String },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Memento = mongoose.model("Memento", mementoSchema);

export default Memento;
