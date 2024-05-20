import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faBookmark, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RegisteredPosts = () => {
  const [posts, setPosts] = useState([]);
  // const post = JSON.parse(localStorage.getItem('post'));
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchPosts = async () => {
      if (user ) {
        try {
          const response = await axios.get(`http://localhost:3002/user/enr/${user.id}`,{
             headers: {
            'Authorization': ` ${token}` 
        }});
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching registered posts:', error);
        }
      }
    };

    fetchPosts();
  }, [user]);

  if (!user ) {
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
                        <span  >
                            <FontAwesomeIcon icon={faThumbsUp} /> Like ({post.likes})
                        </span>
                        <span className="action" >
                            <FontAwesomeIcon icon={faBookmark} /> Save
                        </span>
                    </div>
                </div>
            ))}
    </div>
  );
};

export default RegisteredPosts;
