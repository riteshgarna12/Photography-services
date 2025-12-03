const Booking = require("../models/Booking");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const data = req.body;
    data.client = req.userId;

    // ---- Basic validation for contact method ----
    if (!data.contactMethod || !data.contactValue) {
      return res.status(400).json({
        message: "Preferred contact method and value are required.",
      });
    }

    // Normalize method just in case
    if (!["whatsapp", "email"].includes(data.contactMethod)) {
      return res.status(400).json({
        message: "Contact method must be either whatsapp or email.",
      });
    }

    // Prevent duplicate booking same date + service
    const existing = await Booking.findOne({
      client: req.userId,
      date: data.date,
      serviceType: data.serviceType,
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already booked this service on the same date.",
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

    console.log("Cancel request:", { bookingId: id, userId: req.userId });

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure booking belongs to this user
    if (booking.client.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to cancel this booking" });
    }

    if (booking.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "Booking is already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (err) {
    console.error("Error while cancelling booking:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// ADMIN: FILTERED BOOKINGS LIST
exports.adminListBookings = async (req, res) => {
  try {
    const { status, serviceType, fromDate, toDate, contactMethod } = req.query;

    const query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (serviceType && serviceType !== "all") {
      query.serviceType = serviceType;
    }

    if (contactMethod && contactMethod !== "all") {
      query.contactMethod = contactMethod; // "whatsapp" or "email"
    }

    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = fromDate;
      if (toDate) query.date.$lte = toDate;
    }

    const bookings = await Booking.find(query)
      .populate("client", "name email")
      .sort("-createdAt");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: EXPORT BOOKINGS TO CSV
exports.exportBookingsCsv = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("client", "name email")
      .sort("-createdAt");

    const rows = [];

    // Header row – now including contact columns
    rows.push(
      [
        "Client Name",
        "Client Email",
        "Service Type",
        "Date",
        "Time",
        "Status",
        "Contact Method",
        "Contact Value",
        "Created At",
      ].join(",")
    );

    bookings.forEach((b) => {
      rows.push(
        [
          `"${b.client?.name || ""}"`,
          `"${b.client?.email || ""}"`,
          `"${b.serviceType || ""}"`,
          `"${b.date || ""}"`,
          `"${b.time || ""}"`,
          `"${b.status || ""}"`,
          `"${b.contactMethod || ""}"`,
          `"${b.contactValue || ""}"`,
          `"${b.createdAt ? b.createdAt.toISOString() : ""}"`,
        ].join(",")
      );
    });

    const csv = rows.join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="bookings_export.csv"'
    );
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: ACCEPT BOOKING
exports.acceptBooking = async (req, res) => {
  try {
    const id = req.params.id;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only admin can accept
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Only admin can accept bookings" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        message: "Only pending bookings can be accepted"
      });
    }

    booking.status = "confirmed";
    await booking.save();

    res.json({ message: "Booking accepted successfully", booking });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
