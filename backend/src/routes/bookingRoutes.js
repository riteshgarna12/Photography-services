const router = require('express').Router();
const auth = require('../middleware/auth');
const { createBooking, listBookings, listMyBookings, cancelBooking } = require('../controllers/bookingController');

router.post("/", auth, createBooking);
router.get("/", auth, listBookings); // Admin only (but we handle in controller)
router.get("/my", auth, listMyBookings); // My bookings
router.put("/cancel/:id", auth, cancelBooking); // Cancel booking

module.exports = router;
