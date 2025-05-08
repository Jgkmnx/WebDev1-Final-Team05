// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import the User model
const Workout = require('./models/Workout'); // Import the Workout model
const Post = require('./models/Post'); // Import the Post model

const app = express();

// Middleware
app.use(cors({
    origin: '*',
}));

// MongoDB Connection
mongoose.connect("mongodb+srv://jgkmnx:00000@fitness-connect.4ec2tbw.mongodb.net/?retryWrites=true&w=majority&appName=fitness-connect")
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err.message));

  require('dotenv').config();

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token for the user
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      'your_jwt_secret_key', // Secret key for JWT
      { expiresIn: '1h' } // Token expiration
    );

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'your_jwt_secret_key', // Secret key for JWT
      { expiresIn: '1h' } // Token expiration
    );

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Example of protected route
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Store user info in the request
    next(); // Proceed to the next middleware or route handler
  });
};

app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the Dashboard!' });
});



// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));