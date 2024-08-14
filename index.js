const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/event-project').then(() => console.log('Mongo connected'))

app.use('/api', userRoutes);
app.use('/api', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
