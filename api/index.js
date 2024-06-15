import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import myAuthRoute from "./routes/MyAuthRoute.js";
import myUserRoute from "./routes/MyUserRoute.js";
import myDeceasedUserRoute from "./routes/MyDeceasedUserRoute.js";
import { v2 as cloudinary } from "cloudinary";

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", myAuthRoute);
app.use("/api/my/user", myUserRoute);
app.use("/api/deceasedUser", myDeceasedUserRoute);

app.get("/test", (req, res) => {
  res.json({ message: "Hello World!" });
});

try {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error connection to MongoDB");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(4000, () => {
  console.log("Server hosted on port 4000");
});
