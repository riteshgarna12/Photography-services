const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceType: String,
  date: String,
  time: String,
  venue: String,
  city: String,
  notes: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
