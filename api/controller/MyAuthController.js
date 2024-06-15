import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createCurrentUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: "false",
      maxAge: 86400000,
    });

    return res.status(200).json({ message: "user registered" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: "false",
      maxAge: 86400000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutCurrentUser = async (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });

  res.send();
};

export const validateToken = (req, res) => {
  return res.status(200).send({ userId: req.userId });
};

export default {
  validateToken,
  createCurrentUser,
  loginCurrentUser,
  getCurrentUser,
  logoutCurrentUser,
};
