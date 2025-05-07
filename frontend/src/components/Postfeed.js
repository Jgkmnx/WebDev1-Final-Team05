import React from 'react';
import axios from 'axios';

function PostFeed({ posts }) {
  const token = localStorage.getItem('token');

  const handleLike = async (id) => {
    try {
      await axios.post(`http://localhost:5000/posts/${id}/like`, {}, {
        headers: { 'x-auth-token': token }
      });
      window.location.reload(); // simple reload to update likes
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <p><strong>{post.type.toUpperCase()}</strong></p>
          <p>{post.content}</p>
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post._id)}>Like</button>
        </div>
      ))}
    </div>
  );
}

export default PostFeed;