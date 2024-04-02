import React, { useState, useEffect } from "react";
import axios from "axios";
import './home.css';
import { faShare, faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
    const [information, setInformation] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:3002/user/products`, {
            headers: {
                'authorization': `${token}` // Send token in the Authorization header
            }
        })
            .then((response) => {
                setInformation(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="professional-posts-container">
        <br /><br /> {information.map((post, index) => (
            <div className="postt" key={post.id}>
                <div className="post-header">
                    <h3 className="post-title">{post.name}</h3>
                    <p className="post-date">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <img src={`http://localhost:3002/${post.image}`} alt={post.name} style={{ maxWidth: '250px' }} />
                <p className="post-description">{post.description}</p> 
                <div className="post-actions">
                    <span className="action"><FontAwesomeIcon icon={faThumbsUp} /> Like</span>
                    <span className="action"><FontAwesomeIcon icon={faComment} /> Comment</span>
                    <span className="action"><FontAwesomeIcon icon={faShare} /> Share</span>
                </div>
            </div>
        ))}
    </div>
    );
}

export default Home;
