const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB ***ADD MONFO DB***
mongoose
  .connect("mongodb+srv://jgkmnx:12345@fitness-connect.4ec2tbw.mongodb.net/?retryWrites=true&w=majority&appName=fitness-connect")
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Connection error:', err);
  });

// Mongoose Schema
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password:String
});

const WorkoutSchema = new mongoose.Schema({
    userId: String,
    date: Date,
    muscleGroup: String,
    duration: Number,
    intensity: String,
    note: String
});

const PostSchema = new mongoose.Schema({
    userID: String,
    content: String,
    type: String,       //Recipe or workout
    likes: Number,
    comments: [String],
    timestamp: { type: Date, default: Date.now}
});

const user = mongoose.model('User', UserSchema);
const Workout = mongoose.model('Workout', WorkoutSchema);
const Post = mongoose.model('Post', PostSchema);

//ADD ROUTES
// Routes (examples)
app.post('/signup', async (req, res) => {
    // Handle signup with bcrypt
  });
  
  app.post('/login', async (req, res) => {
    // Handle login with JWT
  });
  
  app.post('/workouts', async (req, res) => {
    // Save workout entry
  });
  
  app.get('/posts', async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
  });
  





//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
