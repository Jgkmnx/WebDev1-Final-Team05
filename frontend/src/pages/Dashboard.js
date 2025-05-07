import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkoutForm from '../components/WorkoutForm';
import PostFeed from '../components/PostFeed';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const workoutRes = await axios.get('http://localhost:5000/workouts', {
          headers: { 'x-auth-token': token },
        });

        const postRes = await axios.get('http://localhost:5000/posts', {
          headers: { 'x-auth-token': token },
        });

        setWorkouts(workoutRes.data);
        setPosts(postRes.data);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };

    fetchData();
  }, [navigate, token]);

  return (
    <div className="dashboard-container">
      <h2>Welcome to Fitness Connect</h2>
      <WorkoutForm />
      <h3>Your Workouts</h3>
      <ul>
        {workouts.map((w) => (
          <li key={w._id}>
            {w.date?.slice(0, 10)} - {w.muscleGroup} - {w.duration} min
          </li>
        ))}
      </ul>
      <h3>Community Posts</h3>
      <PostFeed posts={posts} />
    </div>
  );
}

export default Dashboard;