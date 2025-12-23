import mongoose from "mongoose";
import Dish from "./models/Dish.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ar-menu";

// Sample dishes with 3D models
const sampleDishes = [
  {
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella and basil",
    price: 199.00,
    category: "Main Course",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
    modelUrl: "http://localhost:5000/models/pizza.glb",
    isAvailable: true
  },
  {
    name: "Burger",
    description: "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce",
    price: 149.00,
    category: "Main Course",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    modelUrl: "http://localhost:5000/models/burgar.glb",
    isAvailable: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing dishes (optional - comment out if you want to keep existing data)
    await Dish.deleteMany({});
    console.log("🗑️  Cleared existing dishes");

    // Insert sample dishes
    const dishes = await Dish.insertMany(sampleDishes);
    console.log(`✅ Added ${dishes.length} dishes to database`);

    // Display added dishes
    dishes.forEach(dish => {
      console.log(`\n📝 ${dish.name}`);
      console.log(`   Price: ₹${dish.price}`);
      console.log(`   Category: ${dish.category}`);
      console.log(`   3D Model: ${dish.modelUrl}`);
    });

    console.log("\n✨ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
