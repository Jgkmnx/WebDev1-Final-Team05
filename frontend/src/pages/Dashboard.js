import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      axios
        .get('http://localhost:5000/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/');
        });
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;