// Example Booking schema snippet
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceType: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    notes: String,

    // NEW FIELDS
    contactMethod: {
      type: String,
      enum: ["whatsapp", "email"],
      default: "whatsapp",
      required: true,
    },
    contactValue: {
      type: String,
      required: true, // because frontend enforces it
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
