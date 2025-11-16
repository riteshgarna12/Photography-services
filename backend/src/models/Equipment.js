const mongoose = require('mongoose');
const { Schema } = mongoose;

const equipmentSchema = new Schema({
  name: String,
  type: String,
  brand: String,
  model: String,
  status: { type: String, default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);