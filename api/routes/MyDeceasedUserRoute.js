import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  validateDeceasedUserCreateRequest,
  validateUpdateDeceasedUserCreateRequest,
} from "../middleware/validation.js";
import myDeceasedUserController from "../controller/MyDeceasedUserController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5 mb,
  },
});

router.get("/", verifyToken, myDeceasedUserController.getDeceasedUser);
router.get("/:deceasedUserId", myDeceasedUserController.getOneDeceasedUser);

router.post(
  "/",
  upload.single("profilePhoto"),
  validateDeceasedUserCreateRequest,
  verifyToken,
  myDeceasedUserController.createDeceasedUser
);
router.patch(
  "/:deceasedUserId",
  upload.single("eulogyAuthorPhoto"),
  validateUpdateDeceasedUserCreateRequest,
  verifyToken,
  myDeceasedUserController.updateDeceasedUser
);

export default router;
