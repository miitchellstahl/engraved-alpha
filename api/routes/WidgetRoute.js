import WidgetController from "../controller/WidgetController.js";
import express from "express";

const router = express.Router();

router.get("/weather/:lon/:lat", WidgetController.getCurrentWeather);

export default router;
