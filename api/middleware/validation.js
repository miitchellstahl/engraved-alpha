import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyRegisterRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("email").isString().notEmpty().withMessage("Email must be a string"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password must be a string"),
  handleValidationErrors,
];

export const validatePhotoPostRequest = [
  body("author").isString().notEmpty().withMessage("Author must be a string"),
  body("date").isISO8601().withMessage("Date must be a date").toDate(),

  handleValidationErrors,
];

export const validatePlacePostRequest = [
  body("placeLongitude")
    .isString()
    .notEmpty()
    .withMessage("Longitude must be a string"),
  body("placeLatitude")
    .isString()
    .notEmpty()
    .withMessage("Latitude must be a string"),
  body("placeName")
    .isString()
    .notEmpty()
    .withMessage("Place name must be a string"),
  body("author").isString().notEmpty().withMessage("Author must be a string"),
  handleValidationErrors,
];

export const validateCreateAlbumRequest = [
  body("title").isString().notEmpty().withMessage("Title must be a string"),
  body("albumDate")
    .isISO8601()
    .withMessage("Album date must be a date")
    .toDate(),
  handleValidationErrors,
];

export const validateMementoPostRequest = [
  body("content").isString().notEmpty().withMessage("Content must be a string"),
  body("author").isString().notEmpty().withMessage("Author must be a string"),

  handleValidationErrors,
];

export const validatePetPostRequest = [
  body("petName").isString().notEmpty().withMessage("Title must be a string"),
  body("petType")
    .isString()
    .notEmpty()
    .withMessage("Pet type must be a string"),
  handleValidationErrors,
];

export const validateMyLoginRequest = [
  body("email").isString().notEmpty().withMessage("Email must be a string"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password must be a string"),
  handleValidationErrors,
];

export const validateUserUpdateRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  handleValidationErrors,
];

export const validateDeceasedUserCreateRequest = [
  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("First name must be a string"),
  body("lastName")
    .isString()
    .notEmpty()
    .withMessage(" Last name must be a string"),
  body("birthDate")
    .isISO8601()
    .withMessage("Birth date must be a date")
    .toDate(),
  body("deathDate")
    .isISO8601()
    .withMessage("Death date must be a date")
    .toDate(),
  body("cityBorn")
    .isString()
    .notEmpty()
    .withMessage("City born must be a string"),
  body("cityDied").isString().notEmpty().withMessage("City died be a string"),
  handleValidationErrors,
];

export const validateUpdateDeceasedUserCreateRequest = [
  body("obituary")
    .isString()
    .notEmpty()
    .withMessage("Obituary must be a string"),
  handleValidationErrors,
];
