const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;


    // check email va pass//

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
// check xem co trung khong//
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
// neu co thi tra ve loi//
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
// so sanh pass xem dung ko//
    const isPasswordValid = await bcrypt.compare(password, user.password);
//neu o dung tra ve loi//
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
// neu dung tao token va tra ve tt ng dung//
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Sign in successful.',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error, unable to sign in.' });
  }
});

module.exports = router;
