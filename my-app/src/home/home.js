import React, { useState, useEffect } from "react";
import axios from "axios";
import './home.css';
import { faBookmark, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
    const [information, setInformation] = useState([]);
    const [category, setCategory] = useState('');
    const [likedPosts, setLikedPosts] = useState([]);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [save , setSave]=useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/user/products`, {
                    headers: {
                        'Authorization': token
                    }
                });
                setInformation(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [token]);

    const isPostLiked = (postId) => likedPosts.includes(postId);

    const handleLike = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:3002/user/${postId}/like`, {}, {
                headers: {
                    'Authorization': token
                }
            });
            setLikedPosts(prevLikedPosts => {
                if (isPostLiked(postId)) {
                    return prevLikedPosts.filter(id => id !== postId);
                } else {
                    return [...prevLikedPosts, postId];
                }
            });
            setInformation(prevInformation => prevInformation.map(post => post._id === postId ? { ...post, likes: response.data.likes } : post));
        } catch (error) {
            console.error("Error handling like:", error);
        }
    };

    const search = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/user/products/search?category=${category}`);
            setInformation(response.data);
        } catch (error) {
            console.error("Error searching posts:", error);
        }
    };

    useEffect(() => {
        if (category) {
            search();
        }
    }, [category]);

    const Enregister = async (postId) => {
        try {
            if (!user) {
                console.error("User not found");
                return;
            }
    
            const formData = new FormData();
            formData.append('post_id', postId);
            formData.append('user_id', user._id);
    
            const response = await axios.post("http://localhost:3002/user/enregister", formData);
            console.log('Product added:', response.data);
            
            // Update the state with the newly added product
            setSave(prevSave => [...prevSave, response.data]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    
    

    return (
        <div className="professional-posts-container">
            <div className="custom-select">
                <label htmlFor="category">Category: </label>
                <select id="category" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                    <option value="">Select</option>
                    <option value="Économique">Économique</option>
                    <option value="News">News</option>
                    <option value="Sport">Sport</option>
                </select>
            </div>

            <br />
            {information.map((post) => (
                <div className="postt" key={post._id}>
                    <div className="post-header">
                        <p className="post-date">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <img src={`http://localhost:3002/${post.image}`} alt={post.name} style={{ maxWidth: '250px' }} />
                    <h3 style={{ textAlign: 'center' }} className="post-title">Name: {post.name}</h3>
                    <p className="post-description">{post.description}</p>
                    <div className="post-actions">
                        <span className={`action${isPostLiked(post._id) ? ' liked' : ''}`} onClick={() => handleLike(post._id)}>
                            <FontAwesomeIcon icon={faThumbsUp} /> Like ({post.likes})
                        </span>
                        <span className="action" onClick={() => Enregister(post._id)}>
                            <FontAwesomeIcon icon={faBookmark} /> Enregister
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
