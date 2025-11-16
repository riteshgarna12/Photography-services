const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicePackageSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g. wedding-premium
  category: { type: String, enum: ['wedding','cinematic','drone','other'], default: 'wedding' },
  shortDescription: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  photosIncluded: { type: Number, default: 0 },
  videosIncludedMinutes: { type: Number, default: 0 },
  droneIncluded: { type: Boolean, default: false },
  perks: [{ type: String }], // e.g. ['2 Photographers','Album included']
  coverImage: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, // optional admin
}, { timestamps: true });

module.exports = mongoose.model('ServicePackage', servicePackageSchema);
