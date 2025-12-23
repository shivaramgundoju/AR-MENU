import express from "express";
import { createDish, getAllDishes, getDishById } from "../controllers/dishController.js";

const router = express.Router();

router.post("/dishes", createDish);
router.get("/dishes", getAllDishes);
router.get("/dishes/:id", getDishById);

export default router;
