import React, { useState } from 'react';
import axios from 'axios';

function WorkoutForm() {
  const [form, setForm] = useState({
    muscleGroup: '',
    duration: '',
    intensity: '',
    note: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/workouts', form);
      alert("Workout Logged!");
    } catch {
      alert("Failed to log workout.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="muscleGroup" onChange={handleChange} placeholder="Muscle Group" required />
      <input name="duration" type="number" onChange={handleChange} placeholder="Duration (min)" required />
      <input name="intensity" onChange={handleChange} placeholder="Intensity" required />
      <textarea name="note" onChange={handleChange} placeholder="Notes" />
      <button type="submit">Log Workout</button>
    </form>
  );
}
export default WorkoutForm;