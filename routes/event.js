const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(400).json({ msg: 'Token Required'});

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) return res.status(400).json({ msg: 'Invalid Token' });
    req.user = user;
    next();
  });
};

router.post('/event', authenticateJWT, async (req, res) => {
  const { name, date, address, locationLink, description } = req.body;

  if (!name || !date || !address || !locationLink) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const newEvent = new Event({
      name,
      date,
      address,
      locationLink,
      description,
      user: req.user.id
    });

    await newEvent.save();
    res.status(201).json({ msg: 'Event created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error creating event', error: err.message });
  }
});

router.get('/events', authenticateJWT, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching events', error: err.message });
  }
});

module.exports = router;
