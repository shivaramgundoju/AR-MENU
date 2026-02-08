import express from "express";
import {
	createDish,
	getAllDishes,
	getDishById,
	incrementDishClick,
	incrementDishOrder,
	getPopularDishes,
} from "../controllers/dishController.js";

const router = express.Router();

router.post("/dishes", createDish);
router.get("/dishes", getAllDishes);
router.get("/dishes/popular", getPopularDishes);
router.get("/dishes/:id", getDishById);
router.post("/dishes/:id/click", incrementDishClick);
router.post("/dishes/:id/order", incrementDishOrder);

export default router;
