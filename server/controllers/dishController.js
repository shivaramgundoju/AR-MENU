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
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dishes" });
  }
};
