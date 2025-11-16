const User = require("../models/User");

async function createDefaultAdmin() {
  const adminEmail = "admin@photopro.com";

  const exists = await User.findOne({ email: adminEmail });
  if (exists) {
    console.log("Admin already exists");
    return;
  }

  // Create admin using .save() so password hashing runs
  const admin = new User({
    name: "Super Admin",
    email: adminEmail,
    password: "admin123",
    role: "admin"
  });

  await admin.save(); // ensures password hashing
  console.log("Default admin created:", adminEmail);
}

module.exports = createDefaultAdmin;
