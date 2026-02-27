const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Product = require('./models/product');

const app = express();
app.use(cors());
app.use(express.json());

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB Connected");
}

// -----------------------------
// ROUTES
// -----------------------------

app.get('/', (req, res) => res.send("API is running..."));

app.get('/api/products', async (req, res) => {
  await connectDB();
  const products = await Product.find({ status: true });
  res.json(products);
});

// Seed database (run once)
app.get('/api/seed', async (req, res) => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany([
    { name: "Galaxy S23", brand: "Samsung", price: 799.99, image: "https://cyberdeals.lk/wp-content/uploads/2025/11/Meizu-Note-22-8GB-RAM-256GB-768x768.png", quantity: 10 },
    { name: "iPhone 14", brand: "Apple", price: 999.99, image: "https://cdn.thewirecutter.com/wp-content/media/2025/08/BEST-ANDROID-PHONES-00980-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024", quantity: 8 },
    { name: "Pixel 8", brand: "Google", price: 699.99, image: "https://xmobile.lk/wp-content/uploads/2026/01/unnamed-file-1024x1024.jpg", quantity: 12 }
  ]);
  res.json({ message: "✅ Database Seeded Successfully" });
});

// -----------------------------
// Export for Vercel
// -----------------------------
module.exports = app;

// -----------------------------
// Local server for testing
// -----------------------------
if (process.env.NODE_ENV !== "production") {
  const PORT = 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}