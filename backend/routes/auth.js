const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register/Login with OTP (simplified)
router.post('/login', async (req, res) => {
  try {
    const { email, role } = req.body;
    
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({
        email,
        name: email.split('@')[0],
        role: role || 'patient'
      });
      await user.save();
    }
    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    );
    
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP (mock)
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Mock verification - always succeeds
    res.json({ success: true, message: 'OTP verified' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
