const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use("/api/admin", adminRoutes);

app.get('/', (req, res) => res.send('Photography API'));


module.exports = app;
