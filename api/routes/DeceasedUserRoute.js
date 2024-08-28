import express from "express";
import deceasedUserController from "../controller/DeceasedUserController.js";
import verifyToken from "../middleware/auth.js";
import {
  validatePhotoPostRequest,
  validateMementoPostRequest,
  validatePetPostRequest,
  validateCreateAlbumRequest,
  validatePlacePostRequest,
} from "../middleware/validation.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6, //5 mb,
  },
});

router.get("/", deceasedUserController.getAllDeceasedUsers);
router.get("/:deceasedUserId", deceasedUserController.getOneDeceasedUser);
router.get("/:deceasedUserId/counts", deceasedUserController.getElementCounts);
router.get(
  "/:deceasedUserId/wall",
  deceasedUserController.getDeceasedUserWallContent
);

router.post(
  "/photo/:deceasedUserId",
  upload.array("photos"),
  validatePhotoPostRequest,
  deceasedUserController.createPhotoPost
);

router.post(
  "/memento/:deceasedUserId",
  upload.any(),
  validateMementoPostRequest,
  deceasedUserController.createMementoPost
);

router.post(
  "/place/:deceasedUserId",
  upload.array("photos"),
  validatePlacePostRequest,
  deceasedUserController.createPlacePost
);
router.post(
  "/pet/:deceasedUserId",
  upload.array("photos"),
  validatePetPostRequest,
  deceasedUserController.createPetPost
);

router.post(
  "/albums/:deceasedUserId",
  upload.array("photos"),
  validateCreateAlbumRequest,
  deceasedUserController.createAlbum
);

router.post(
  "/album/:albumId",
  upload.array("photos"),
  deceasedUserController.addPhotosToAlbum
);

router.get("/photos/:deceasedUserId", deceasedUserController.getAllPhotos);
router.get("/pets/:deceasedUserId", deceasedUserController.getAllPets);
router.get("/places/:deceasedUserId", deceasedUserController.getAllPlaces);
router.get("/mementos/:deceasedUserId", deceasedUserController.getAllMementos);

router.get("/album/:albumId", deceasedUserController.getAlbum);
router.get("/albums/:deceasedUserId", deceasedUserController.getAllAlbums);

export default router;
