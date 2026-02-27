const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  image: String,
  quantity: Number,
  status: { type: Boolean, default: true }
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);