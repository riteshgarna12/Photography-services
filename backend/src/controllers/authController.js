const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// =======================
// USER REGISTRATION
// =======================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({ name, email, password, role });

    res.json({
      message: "Registration successful",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token: generateToken(newUser._id)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// NORMAL USER LOGIN
// =======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// ADMIN LOGIN (NEW)
// =======================
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });

    // Check if user exists and is admin
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid admin credentials" });

    res.json({
      message: "Admin login successful",
      user: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
      token: generateToken(admin._id),
      isAdmin: true
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// GET LOGGED-IN USER
// =======================
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
