import DeceasedUser from "../models/DeceasedUser.js";
import cloudinary from "cloudinary";
import OpenAI from "openai";
import Onboarding from "../models/onboardingSchema.js";
import User from "../models/User.js";
import Photo from "../models/Photo.js";

const openai = new OpenAI();

const getMyDeceasedUsers = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("deceasedUsers");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get deceased users" });
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
    cityBornLongitude,
    cityBornLatitude,
    cityDiedLatitude,
    cityDiedLongitude,
    survivors,
    preDeceased,
    education,
    career,
    personality,
    userRelation,
  } = req.body;

  console.log(cityBornLatitude);

  const obituaryPrompt = `You are an obituary writer. Given the following information, write a somber obituary and space it out into a few paragraphs. Just return the obituary: 
  Name: ${firstName} ${lastName},
  Date of birth: ${birthDate},
  Date of death: ${deathDate},
  Born in: ${cityBorn}, ${stateBorn},
  Died in: ${cityDied}, ${stateDied},
  Calculate the age they were when they died and include that make sure you correctly calculate if they were years old, months old, or days old,
  Survived by: ${survivors},
  Predeceased by: ${preDeceased},
  Education: ${education},
  Career: ${career},
  Try to describe them as a person, the info provider said that: ${personality}.
  `;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: JSON.stringify({ obituaryPrompt }) }],
    model: "gpt-3.5-turbo",
  });

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
      cityBornLatitude,
      cityBornLongitude,
      cityDiedLatitude,
      cityDiedLongitude,
      userRelation,
      obituary: completion.choices[0].message.content,
    });
    deceasedUser.user = req.userId;
    deceasedUser.mappedByUser = req.userId;

    if (req.file) {
      const profilePhotoUrl = await uploadImage(req.file);
      deceasedUser.profilePhotoUrl = profilePhotoUrl;
    }

    await deceasedUser.save();

    // Update the User document
    await User.findByIdAndUpdate(req.userId, {
      $push: { deceasedUsers: deceasedUser._id },
    });

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

//ONBOARDING LOGIC

const startOnboarding = async (req, res) => {
  try {
    const userId = req.userId;

    let onboarding = await Onboarding.findOne({ user: userId });

    if (!onboarding) {
      onboarding = new Onboarding({ user: userId });
      await onboarding.save();
    }

    res.status(200).json({ onboardingId: onboarding._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to start onboarding" });
  }
};

const saveOnboardingProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const formData = req.body;
    const currentStep = parseInt(formData.currentStep);
    const providedOnboardingId = formData.onboardingId;
    console.log(req);

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let onboarding;
    if (providedOnboardingId) {
      onboarding = await Onboarding.findById(providedOnboardingId);
      if (!onboarding || onboarding.user.toString() !== userId) {
        return res
          .status(404)
          .json({ message: "Onboarding not found or doesn't belong to user" });
      }
    } else {
      onboarding = await Onboarding.findOne({ user: userId, currentStep: 1 });
    }

    // If onboarding doesn't exist, create a new one
    if (!onboarding) {
      onboarding = new Onboarding({ user: userId });
      user.onboardingUsers.push(onboarding._id);
      await user.save();
    }

    // Handle profile Photo file uploads
    if (req.files && req.files.length > 0) {
      const profilePhotoFile = req.files.find(
        (file) => file.fieldname === "profilePhoto"
      );
      if (profilePhotoFile) {
        formData.profilePhotoUrl = await uploadImage(profilePhotoFile);
      }
    }

    // Handle eulogies
    if (req.body.eulogies) {
      formData.eulogies = await processEulogies(req.body.eulogies, req.files);
    }

    // Generate obituary if it's the first step
    if (currentStep === 1) {
      formData.obituary = await generateObituary(formData);
    }

    // Update only the fields provided in the current step
    for (const [key, value] of Object.entries(formData)) {
      if (key !== "currentStep" && key !== "onboardingId") {
        onboarding.formData[key] = value;
      }
    }

    onboarding.currentStep = currentStep + 1;
    onboarding.lastUpdated = new Date();

    // Ensure changes are marked as modified for Mongoose
    onboarding.markModified("formData");

    await onboarding.save();

    res.status(200).json({
      message: "Onboarding progress saved",
      onboarding: {
        onboardingId: onboarding._id,
        currentStep: onboarding.currentStep,
        formData: onboarding.formData,
      },
    });
  } catch (error) {
    console.error("Error in saveOnboardingProgress:", error);
    res.status(500).json({
      message: "Failed to save onboarding progress",
      error: error.message,
    });
  }
};

const generateObituary = async (formData) => {
  const obituaryPrompt = `You are an obituary writer. Given the following information, write a somber obituary and space it out into a few paragraphs. Just return the obituary: 
  Name: ${formData.firstName} ${formData.lastName},
  Date of birth: ${formData.birthDate},
  Date of death: ${formData.deathDate},
  Born in: ${formData.cityBorn}, ${formData.stateBorn},
  Died in: ${formData.cityDied}, ${formData.stateDied},
  Calculate the age they were when they died and include that make sure you correctly calculate if they were years old, months old, or days old,
  Survived by: ${formData.survivors},
  Predeceased by: ${formData.preDeceased},
  Education: ${formData.education},
  Career: ${formData.career},
  Try to describe them as a person, the info provider said that: ${formData.personality}.
  `;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: JSON.stringify({ obituaryPrompt }) }],
    model: "gpt-4o-mini",
  });

  return completion.choices[0].message.content;
};

const getOnboardingProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const onboardingId = req.params.onboardingId; // Assuming the onboardingId is passed as a URL parameter

    if (!onboardingId) {
      return res.status(400).json({ message: "Onboarding ID is required" });
    }

    const onboarding = await Onboarding.findById(onboardingId);

    if (!onboarding) {
      return res.status(404).json({ message: "Onboarding not found" });
    }

    // Ensure the onboarding belongs to the requesting user
    if (onboarding.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this onboarding" });
    }

    res.status(200).json(onboarding);
  } catch (error) {
    console.error("Error in getOnboardingProgress:", error);
    res.status(500).json({ message: "Failed to get onboarding progress" });
  }
};

// Helper function to process eulogies
const processEulogies = async (eulogiesData, files) => {
  const parsedEulogies =
    typeof eulogiesData === "string" ? JSON.parse(eulogiesData) : eulogiesData;

  if (!Array.isArray(parsedEulogies)) {
    console.log("Eulogies data is not an array:", parsedEulogies);
    return [];
  }

  return Promise.all(
    parsedEulogies.map(async (eulogy, index) => {
      let eulogyAuthorPhotoUrl = "";
      const file =
        files &&
        files.find(
          (file) => file.fieldname === `eulogies[${index}][eulogyAuthorPhoto]`
        );

      if (file) {
        eulogyAuthorPhotoUrl = await uploadImage(file);
      }

      return {
        eulogySpeech: eulogy.eulogySpeech,
        eulogyAuthor: eulogy.eulogyAuthor,
        eulogyAuthorPhotoUrl,
      };
    })
  );
};

const completeOnboarding = async (req, res) => {
  try {
    const userId = req.userId;
    const formData = req.body;

    console.log(formData);

    const onboardingId = formData.onboardingId;

    // Find the user and onboarding documents
    const user = await User.findById(userId);
    const onboarding = await Onboarding.findById(onboardingId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //temporary mapping assigned to creator until we add mapping feature
    const mappedByUser = req.userId;
    const mappedByRelation = onboarding.formData.userRelation;

    if (!onboarding) {
      return res.status(404).json({ message: "Onboarding not found" });
    }

    // Create new DeceasedUser
    const deceasedUser = new DeceasedUser({
      user: userId,
      mappedByUser,
      mappedByRelation,
      ...onboarding.formData,
    });

    // Save each photo and add it to the album
    for (const file of req.files) {
      const photoUrl = await uploadImage(file);

      const photo = new Photo({
        photoUrl,
        deceasedUser: deceasedUser._id,
        type: "Photo",
        author: user.name,
      });

      await photo.save();
    }

    await deceasedUser.save();

    // Add the deceasedUser to the user's deceasedUsers array
    user.deceasedUsers.push(deceasedUser._id);

    // Remove the onboarding ID from the user's onboardingUser array
    user.onboardingUsers = user.onboardingUsers.filter(
      (id) => !id.equals(onboarding._id)
    );

    // Save the updated user document
    await user.save();

    // Delete the onboarding object
    await Onboarding.deleteOne({ _id: onboarding._id });

    res.status(200).json({
      message: "Onboarding completed and data transferred to DeceasedUser",
      deceasedUserId: deceasedUser._id,
    });
  } catch (error) {
    console.error("Error in completeOnboarding:", error);
    res.status(500).json({
      message: "Failed to complete onboarding",
      error: error.message,
    });
  }
};

export default {
  getMyDeceasedUsers,
  createDeceasedUser,
  updateDeceasedUser,
  startOnboarding,
  saveOnboardingProgress,
  getOnboardingProgress,
  completeOnboarding,
};
