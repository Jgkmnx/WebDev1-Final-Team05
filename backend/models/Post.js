// models/Post.js
const mongoose = require('mongoose');

// Define the schema for a Post
const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String },
  type: { type: String, enum: ['recipe', 'workout'], required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: String }],
  timestamp: { type: Date, default: Date.now }
});

// Create the model for Post
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;