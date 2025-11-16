require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const createDefaultAdmin = require("./utils/createAdmin");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();

// ----------------------
// MIDDLEWARE
// ----------------------
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ----------------------
// MONGODB CONNECTION + ADMIN SEED
// ----------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Create admin user once
    await createDefaultAdmin();

  } catch (err) {
    console.error("DB Connection Error:", err.message);
    process.exit(1);
  }
};

connectDB();

// ----------------------
// ROUTES
// ----------------------
app.use("/api/auth", authRoutes);       // User login/register & admin login
app.use("/api/admin", adminRoutes);     // Admin panels routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Photography API Running");
});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
