// models/Workout.js
const mongoose = require('mongoose');

// Define the schema for a Workout
const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  muscleGroup: { type: String },
  duration: { type: Number },
  intensity: { type: String },
  note: { type: String }
});

// Create the model for Workout
const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;