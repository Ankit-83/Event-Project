const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid username and password' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error, Try again', error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secretkey');
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: 'Error logging in', error: err.message });
  }
});

module.exports = router;
