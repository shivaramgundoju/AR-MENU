import Dish from "../models/Dish.js";

export const createDish = async (req, res) => {
  try {
    const dish = new Dish(req.body);
    const savedDish = await dish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    res.status(500).json({ message: "Failed to create dish" });
  }
};

export const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().lean();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dishes" });
  }
};

export const getDishById = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findById(id);
    
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dish" });
  }
};
export const incrementDishClick = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findByIdAndUpdate(
      id,
      { $inc: { clickCount: 1 } },
      { new: true }
    );

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: "Failed to update click count" });
  }
};

export const incrementDishOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity = 1 } = req.body || {};

    const dish = await Dish.findByIdAndUpdate(
      id,
      { $inc: { orderCount: quantity } },
      { new: true }
    );

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order count" });
  }
};

export const getPopularDishes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;

    const dishes = await Dish.find()
      .sort({ orderCount: -1, clickCount: -1 })
      .limit(limit);

    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular dishes" });
  }
};
