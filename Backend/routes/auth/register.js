const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // bat buoc day du tt//

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required.' });
    }
// do dai pass phai lon hon 6//
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }
// check xem email da dung chua//
    const normalizedEmail = email.trim().toLowerCase();
    const duplicate = await User.findOne({ email: normalizedEmail });

    if (duplicate) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }
// ma hoa pass//
    const hashedPassword = await bcrypt.hash(password, 10); //ma hoa voi salt = 10 10^2 lan//
// tao user moi//
    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });
// tao thanh cong token va tra ve tt ng dung//
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
// 
    return res.status(201).json({
      message: 'Sign up successful.',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    console.error('Register error:', error);
    return res.status(500).json({ message: 'Server error, unable to create account.' });
  }
});

module.exports = router;
