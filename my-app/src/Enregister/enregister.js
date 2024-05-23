import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisteredPosts = () => {
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/user/enr/${id}`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      console.log(response);
      console.log('Product deleted successfully');
      setPosts(posts.filter(item => item.id!== id));
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:3002/user/enr/${user.id}`, {
            headers: {
              'Authorization': `${token}`
            }
          });
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching registered posts:', error);
        }
      }
    };

    fetchPosts();
  }, [user]);

  if (!user) {
    return <div>Please log in and select a post.</div>;
  }

  return (
    <div className="professional-posts-container">
      <h1>Registered Posts</h1>
      {posts.map((post) => (
        <div className="postt" key={post._id}>
          <div className="post-header">
            <p className="post-date">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <h3 style={{ textAlign: 'center' }} className="post-title">Name: {post.name}</h3>
          <p className="post-description">{post.description}</p>
          <div className="post-actions">
            <span className="action" onClick={() => deletePost(post._id)}>
              <FontAwesomeIcon icon={faBookmark} style={{ color: 'blue' }} /> Don't Save
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegisteredPosts;
