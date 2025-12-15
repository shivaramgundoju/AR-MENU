import express from "express";
import { createDish, getAllDishes } from "../controllers/dishController.js";

const router = express.Router();

router.post("/dishes", createDish);
router.get("/dishes", getAllDishes);

export default router;
