import { Router } from "express";
import { validateRequest } from "../middlewares/validate.middleware";
import {
  getCityByIdSchema,
  getHotelByIdSchema,
  getCountryByIdSchema,
  searchSchema,
} from "../schemas";
import {
  getCityById,
  getHotelById,
  getCountryById,
  searchEntities,
} from "../controllers";

const router = Router();

// Search endpoint
router.get("/search", validateRequest(searchSchema, "query"), searchEntities);

// Entity endpoints
router.get(
  "/hotels/:id",
  validateRequest(getHotelByIdSchema, "params"),
  getHotelById
);
router.get(
  "/cities/:id",
  validateRequest(getCityByIdSchema, "params"),
  getCityById
);
router.get(
  "/countries/:id",
  validateRequest(getCountryByIdSchema, "params"),
  getCountryById
);

export default router;
