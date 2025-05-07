import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [workouts, setWorkouts] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/profile', {
          headers: { 'x-auth-token': token }
        });
        setUserInfo(res.data.user);
        setWorkouts(res.data.workouts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>{userInfo.username}'s Profile</h2>
      <p>Email: {userInfo.email}</p>
      <h3>Workout History</h3>
      <ul>
        {workouts.map((w) => (
          <li key={w._id}>
            {w.date?.slice(0, 10)} - {w.muscleGroup} - {w.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;