const TeamMember = require("../models/TeamMember");

// PUBLIC: list active team members
exports.getPublicTeam = async (req, res) => {
  try {
    const team = await TeamMember.find({ active: true }).sort("name");
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: list all team members
exports.adminListTeam = async (req, res) => {
  try {
    const team = await TeamMember.find().sort("name");
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: create new member
exports.createMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: update member
exports.updateMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: toggle active
exports.toggleActive = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });

    member.active = !member.active;
    await member.save();

    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
