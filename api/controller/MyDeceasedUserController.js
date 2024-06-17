import DeceasedUser from "../models/deceasedUser.js";
import cloudinary from "cloudinary";
import OpenAI from "openai";

const openai = new OpenAI();

const getDeceasedUser = async (req, res) => {
  try {
    const deceasedUsers = await DeceasedUser.find({ user: req.userId });
    return res.status(200).json(deceasedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get deceased user" });
  }
};

const getOneDeceasedUser = async (req, res) => {
  try {
    const deceasedUser = await DeceasedUser.findById(req.params.deceasedUserId);

    if (!deceasedUser) {
      return res.status(404).json({ message: "Deceased user not found" });
    }

    return res.status(200).json(deceasedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get deceased user" });
  }
};

const createDeceasedUser = async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    deathDate,
    cityBorn,
    stateBorn,
    cityDied,
    stateDied,
    survivors,
    preDeceased,
    education,
    career,
    personality,
  } = req.body;

  const obituaryPrompt = `You are an obituary writer. Given the following information, write a somber obituary and space it out into a few paragraphs. Just return the obituary: 
  Name: ${firstName} ${lastName},
  Date of birth: ${birthDate},
  Date of death: ${deathDate},
  Born in: ${cityBorn}, ${stateBorn},
  Died in: ${cityDied}, ${stateDied},
  Calculate the age they were when they died and include that,
  Survived by: ${survivors},
  Predeceased by: ${preDeceased},
  Education: ${education},
  Career: ${career},
  Try to describe them as a person, the info provider said that: ${personality}`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: JSON.stringify({ obituaryPrompt }) }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);

  try {
    const deceasedUser = new DeceasedUser({
      firstName,
      lastName,
      birthDate,
      deathDate,
      cityBorn,
      stateBorn,
      cityDied,
      stateDied,
      obituary: completion.choices[0].message.content,
    });
    deceasedUser.user = req.userId;

    if (req.file) {
      const profilePhotoUrl = await uploadImage(req.file);
      deceasedUser.profilePhotoUrl = profilePhotoUrl;
    }

    await deceasedUser.save();

    return res.status(200).json({ _id: deceasedUser._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create deceased user" });
  }
};

const updateDeceasedUser = async (req, res) => {
  const { obituary, eulogy, eulogyAuthor, eulogies } = req.body;

  try {
    const deceasedUser = await DeceasedUser.findById(req.params.deceasedUserId);

    deceasedUser.obituary = obituary;
    deceasedUser.eulogy = eulogy;
    deceasedUser.eulogyAuthor = eulogyAuthor;

    // Handle eulogies
    if (eulogies && Array.isArray(eulogies)) {
      // Clear existing eulogies array
      deceasedUser.eulogies = [];

      // Iterate over eulogies and handle image upload
      for (const [index, eulogy] of eulogies.entries()) {
        let eulogyAuthorPhotoUrl = "";

        // Check if an image file is provided for the eulogy
        const file = req.files.find(
          (file) => file.fieldname === `eulogies[${index}][eulogyAuthorPhoto]`
        );
        if (file) {
          eulogyAuthorPhotoUrl = await uploadImage(file);
        }

        // Append eulogy with image URL to eulogies array
        deceasedUser.eulogies.push({
          eulogySpeech: eulogy.eulogySpeech,
          eulogyAuthor: eulogy.eulogyAuthor,
          eulogyAuthorPhotoUrl,
        });
      }
    }

    await deceasedUser.save();

    return res.status(200).json({ _id: deceasedUser._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update deceased user" });
  }
};

const uploadImage = async (file) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  return uploadResponse.url;
};

export default {
  createDeceasedUser,
  getDeceasedUser,
  getOneDeceasedUser,
  updateDeceasedUser,
};
