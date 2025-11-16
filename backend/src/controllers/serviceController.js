const ServicePackage = require('../models/ServicePackage');

// List all packages (optionally filter by category)
const listPackages = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const packages = await ServicePackage.find(filter).sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPackage = async (req, res) => {
  try {
    const pkg = await ServicePackage.findOne({ slug: req.params.slug });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin create package (protected route ideally)
const createPackage = async (req, res) => {
  try {
    const body = req.body;
    // slug generation fallback
    body.slug = body.slug || body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const pkg = await ServicePackage.create(body);
    res.status(201).json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listPackages, getPackage, createPackage };
