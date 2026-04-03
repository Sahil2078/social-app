const mongoose = require('mongoose');

// Define the structure for a Post
const PostSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  likes: { 
    type: [String], // Array of usernames who liked the post
    default: [] 
  },
  comments: [
    {
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// CRITICAL: Export the model so it can be used in your routes
module.exports = mongoose.model('Post', PostSchema);