// RegisteredPosts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisteredPosts = () => {
  const [posts, setPosts] = useState([]);
  const post = JSON.parse(localStorage.getItem('post'));
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/enr/${user.id}/${post._id}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching registered posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Registered Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h2>{post.name}</h2>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisteredPosts;
