const router = require("express").Router();
const auth = require("../middleware/auth");
const Booking = require("../models/Booking");

router.get("/stats", auth, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pending = await Booking.countDocuments({ status: "pending" });
    const confirmed = await Booking.countDocuments({ status: "confirmed" });
    const cancelled = await Booking.countDocuments({ status: "cancelled" });

    const revenue = await Booking.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    res.json({
      totalBookings,
      pending,
      confirmed,
      cancelled,
      revenue: revenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
