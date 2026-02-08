import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    category: String,
    imageUrl: String,
    modelUrl: String,
    clickCount: {
      type: Number,
      default: 0,
    },
    orderCount: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
