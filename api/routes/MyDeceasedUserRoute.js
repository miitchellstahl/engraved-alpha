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
    fileSize: 1024 * 1024 * 6, //5 mb,
  },
});

router.get("/", verifyToken, myDeceasedUserController.getMyDeceasedUsers);

router.post(
  "/",
  upload.single("profilePhoto"),
  validateDeceasedUserCreateRequest,
  verifyToken,
  myDeceasedUserController.createDeceasedUser
);
router.patch(
  "/:deceasedUserId",
  upload.any(),
  validateUpdateDeceasedUserCreateRequest,
  verifyToken,
  myDeceasedUserController.updateDeceasedUser
);

router.post(
  "/onboarding/start",
  verifyToken,
  myDeceasedUserController.startOnboarding
);

router.post(
  "/onboarding/save",
  verifyToken,
  upload.any(),
  myDeceasedUserController.saveOnboardingProgress
);

router.get(
  "/onboarding/:onboardingId",
  verifyToken,
  myDeceasedUserController.getOnboardingProgress
);

router.post(
  "/onboarding/complete",
  verifyToken,
  upload.any(),
  myDeceasedUserController.completeOnboarding
);

export default router;
