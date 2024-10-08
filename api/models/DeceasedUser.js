import mongoose from "mongoose";

const eulogyItemSchema = new mongoose.Schema({
  eulogySpeech: { type: String },
  eulogyAuthor: { type: String },
  eulogyAuthorPhotoUrl: { type: String },
});

const deceasedUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mappedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  deathDate: { type: Date, required: true },
  cityBorn: { type: String, required: true },
  stateBorn: { type: String, required: true },
  cityDied: { type: String, required: true },
  cityDiedLongitude: { type: Number },
  cityDiedLatitude: { type: Number },
  cityBornLongitude: { type: Number },
  cityBornLatitude: { type: Number },
  stateDied: { type: String, required: true },
  obituary: { type: String },
  eulogies: [eulogyItemSchema],
  profilePhotoUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  userRelation: { type: String, required: true },
  mappedByRelation: { type: String },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
  mementos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Memento" }],
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
});

// Remove the virtual fields

deceasedUserSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-password", // Exclude the password field
  });

  // Only populate mappedByUser if the field exists
  this.populate({
    path: "mappedByUser",
    select: "name _id relation",
  });

  next();
});

// Ensure virtual fields are included in the output
deceasedUserSchema.set("toObject", { virtuals: true });
deceasedUserSchema.set("toJSON", { virtuals: true });

const DeceasedUser = mongoose.model("DeceasedUser", deceasedUserSchema);

export default DeceasedUser;
