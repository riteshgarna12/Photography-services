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

// =======================
// UPDATE USER PROFILE
// =======================

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Check duplicate email (except current user)
    const existingEmail = await User.findOne({ 
      email, 
      _id: { $ne: req.userId } 
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 2️⃣ Get user from DB
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 3️⃣ Update fields
    user.name = name;
    user.email = email;

    // 4️⃣ Hash password if provided
    if (password && password.trim() !== "") {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // 5️⃣ Save updated user
    await user.save();

    // 6️⃣ Return secure user details
    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
