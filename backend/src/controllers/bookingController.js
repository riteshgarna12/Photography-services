const Booking = require("../models/Booking");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const data = req.body;
    data.client = req.userId;

    // Prevent duplicate booking same date + service
    const existing = await Booking.findOne({
      client: req.userId,
      date: data.date,
      serviceType: data.serviceType
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already booked this service on the same date."
      });
    }

    const booking = new Booking(data);
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL BOOKINGS (Admin only)
exports.listBookings = async (req, res) => {
  const bookings = await Booking.find().populate("client", "name email");
  res.json(bookings);
};

// GET USER'S OWN BOOKINGS
exports.listMyBookings = async (req, res) => {
  const bookings = await Booking.find({ client: req.userId }).sort("-createdAt");
  res.json(bookings);
};

// CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
  try {
    const id = req.params.id;

    const booking = await Booking.findOne({ _id: id, client: req.userId });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
