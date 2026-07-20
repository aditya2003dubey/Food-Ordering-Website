import dotenv from "dotenv";
import mongoose from "mongoose";
import Food from "./models/Food.js";

dotenv.config();

const foods = [
  {
    name: "Cheese Burger",
    price: 149,
    category: "Burger",
    description: "Juicy grilled chicken burger with cheese.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
  },
  {
    name: "Veg Burger",
    price: 119,
    category: "Burger",
    description: "Fresh veg burger with crispy patty.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
  },
  {
    name: "Margherita Pizza",
    price: 299,
    category: "Pizza",
    description: "Classic cheese pizza.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
  },
  {
    name: "Pepperoni Pizza",
    price: 399,
    category: "Pizza",
    description: "Loaded pepperoni pizza.",
    image: "https://images.unsplash.com/photo-1548365328-9f547fb0953b"
  },
  {
    name: "Veg Noodles",
    price: 169,
    category: "Noodles",
    description: "Stir fried noodles.",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841"
  },
  {
    name: "Chicken Noodles",
    price: 219,
    category: "Noodles",
    description: "Spicy chicken noodles.",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d"
  },
  {
    name: "French Fries",
    price: 99,
    category: "Snacks",
    description: "Crispy fries.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f"
  },
  {
    name: "Chicken Nuggets",
    price: 189,
    category: "Snacks",
    description: "Crunchy nuggets.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec"
  },
  {
    name: "Cold Coffee",
    price: 149,
    category: "Drinks",
    description: "Cold coffee with ice cream.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735"
  },
  {
    name: "Mango Shake",
    price: 129,
    category: "Drinks",
    description: "Fresh mango shake.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Food.deleteMany();

    await Food.insertMany(foods);

    console.log("✅ Foods Inserted Successfully");

    process.exit();

  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

seedData();