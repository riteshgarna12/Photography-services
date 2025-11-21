const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  getPublicTeam,
  adminListTeam,
  createMember,
  updateMember,
  toggleActive,
} = require("../controllers/teamController");

// public
router.get("/", getPublicTeam);

// admin
router.get("/admin", auth, admin, adminListTeam);
router.post("/", auth, admin, createMember);
router.put("/:id", auth, admin, updateMember);
router.patch("/:id/toggle", auth, admin, toggleActive);

module.exports = router;
