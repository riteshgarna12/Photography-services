const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  createBooking,
  listBookings,
  listMyBookings,
  cancelBooking,
  adminListBookings,
  exportBookingsCsv,
  acceptBooking,   // <-- FIX: add this
} = require("../controllers/bookingController");

// client
router.post("/", auth, createBooking);
router.get("/my", auth, listMyBookings);
router.put("/cancel/:id", auth, cancelBooking);

// admin: raw list
router.get("/", auth, admin, listBookings);

// admin: filtered list
router.get("/admin/list", auth, admin, adminListBookings);

// admin: CSV export
router.get("/admin/export", auth, admin, exportBookingsCsv);

// admin: ACCEPT booking
router.put("/accept/:id", auth, admin, acceptBooking);

module.exports = router;
