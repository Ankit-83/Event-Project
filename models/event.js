const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  locationLink: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  user: { 
    type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Event', eventSchema);
