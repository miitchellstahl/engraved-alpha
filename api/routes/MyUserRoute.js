import express from "express";
import verifyToken from "../middleware/auth.js";
import myUserController from "../controller/MyUserController.js";
import { validateUserUpdateRequest } from "../middleware/validation.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6, //5 mb,
  },
});

router.put(
  "/",
  upload.single("imageFile"),
  validateUserUpdateRequest,
  verifyToken,
  myUserController.updateCurrentUser
);

export default router;
