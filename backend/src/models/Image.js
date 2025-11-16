const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  uploader: { type: Schema.Types.ObjectId, ref: 'User' },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  url: String,
  caption: String,
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);