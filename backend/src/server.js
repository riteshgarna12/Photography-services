const User = require("./models/User");

(async () => {
  const adminEmail = "admin@photopro.com";
  const exists = await User.findOne({ email: adminEmail });

  if (!exists) {
    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: "admin123",
      role: "admin"
    });
    console.log("Default admin created:", adminEmail);
  }
})();
