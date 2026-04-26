// controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// @desc   Admin login
// @route  POST /api/auth/login
// @access Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Find admin (explicitly select password)
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      // Generic message to prevent user enumeration (OWASP A07)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(admin._id);
    res.status(200).json({
      success: true,
      token,
      data: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get current admin profile
// @route  GET /api/auth/me
// @access Admin
exports.getMe = async (req, res) => {
  res.status(200).json({ success: true, data: req.admin });
};
