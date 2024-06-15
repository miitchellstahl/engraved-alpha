import User from "../models/User.js";
import cloudinary from "cloudinary";

const updateCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name;

    if (req.file) {
      const imageUrl = await uploadImage(req.file);
      user.imageUrl = imageUrl;
    }

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

const uploadImage = async (file) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  return uploadResponse.url;
};

export default { updateCurrentUser };
