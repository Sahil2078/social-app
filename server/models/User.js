const mongoose = require('mongoose');

// Define the structure of your User in the database
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// CRITICAL: We must export it as a Mongoose Model
// This gives it the functions like .findOne(), .create(), etc.
module.exports = mongoose.model('User', UserSchema);