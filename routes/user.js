const express = require('express');
const User = require('../models/User'); // Import the User model
const propelAuth = require('propel-auth');

const router = express.Router();

// Initialize Propel Auth to protect routes
propelAuth.configureAuth({
  authUrl: process.env.PROPEL_AUTH_URL,
  apiKey: process.env.PROPEL_AUTH_API_KEY,
});

// Middleware to protect routes with Propel Auth
const requireAuth = propelAuth.expressMiddleware();

// GET /api/user/profile (Protected Route)
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const email = req.auth.user.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/user/profile (Protected Route)
router.post('/profile', requireAuth, async (req, res) => {
  const { name, mentalHealthStatus, fitnessData } = req.body;
  const email = req.auth.user.email;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, mentalHealthStatus, fitnessData },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
