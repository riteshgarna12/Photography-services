const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  price: Number,     // ⭐ add this
  features: [String],
  image: String
});

module.exports = mongoose.model("Service", serviceSchema);
