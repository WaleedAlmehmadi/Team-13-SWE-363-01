const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validations/userValidation');

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { fullName, email, studentId, password } = req.body;

    if (!email.endsWith('@kfupm.edu.sa')) {
      return res
        .status(400)
        .json({ message: 'Must use a KFUPM email address (@kfupm.edu.sa)' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ fullName, email, studentId, password });

    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        studentId: user.studentId,
        role: user.role,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Student ID already in use' });
    }
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors)
        .map((e) => e.message)
        .join(', ');
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        studentId: user.studentId,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/me  (protected)
router.get('/me', protect, (req, res) => {
  const { _id, fullName, email, studentId, role, createdAt } = req.user;
  res.json({ id: _id, fullName, email, studentId, role, createdAt });
});

module.exports = router;
