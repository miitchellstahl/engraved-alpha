import express from "express";
import myAuthController from "../controller/MyAuthController.js";
import {
  validateMyRegisterRequest,
  validateMyLoginRequest,
} from "../middleware/validation.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/register",
  validateMyRegisterRequest,
  myAuthController.createCurrentUser
);

router.post(
  "/login",
  validateMyLoginRequest,
  myAuthController.loginCurrentUser
);

router.get("/user", verifyToken, myAuthController.getCurrentUser);
router.get("/validate-token", verifyToken, myAuthController.validateToken);

router.post("/logout", myAuthController.logoutCurrentUser);

export default router;
