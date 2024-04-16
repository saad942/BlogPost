// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './home.css';
// import { faShare, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function Home() {
//     const [information, setInformation] = useState([]);
//     const token = localStorage.getItem('token');


//     useEffect(() => {
//         axios.get(`http://localhost:3002/user/products`, {
//             headers: {
//                 'authorization': `${token}` // Send token in the Authorization header
//             }
//         })
//             .then((response) => {
//                 setInformation(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);

//     return (
//         <div className="professional-posts-container">
//         <br /><br /> {information.map((post, index) => (
//             <div className="postt" key={post.id}>
//                 <div className="post-header">
//                     <h3 className="post-title">{post.name}</h3>
//                     <p className="post-date">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
//                 </div>
//                 <img src={`http://localhost:3002/${post.image}`} alt={post.name} style={{ maxWidth: '250px' }} />
//                 <p className="post-description">{post.description}</p> 
//                 <div className="post-actions">
//                     <span className="action"><FontAwesomeIcon icon={faThumbsUp} /> Like</span>
//                     <span className="action"><FontAwesomeIcon icon={faShare} /> Share</span>
//                 </div>
//             </div>
//         ))}
//     </div>
//     );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import axios from "axios";
import './home.css';
import { faBookmark , faThumbsUp ,faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
    const [information, setInformation] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]); // Store IDs of liked posts
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

    const isPostLiked = (postId) => likedPosts.includes(postId);

    const handleLike = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:3002/user/${postId}/like`, {}, {
                headers: {
                    'authorization': `${token}` // Send token in the Authorization header
                }
            });
            // Update the likedPosts state to reflect the new liked state for the post
            setLikedPosts(prevLikedPosts => {
                if (isPostLiked(postId)) {
                    return prevLikedPosts.filter(id => id !== postId); // Remove postId if already liked
                } else {
                    return [...prevLikedPosts, postId]; // Add postId if not already liked
                }
            });
            // Update the like count for the specific post in the state
            setInformation(prevInformation => prevInformation.map(post => post._id === postId ? { ...post, likes: response.data.likes } : post));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="professional-posts-container">
            <input type="text"  placeholder="Search posts..." />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
            {information.map((post, index) => (
                <div className="postt" key={post._id}>
                    <div className="post-header">
                        <p className="post-date">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <img src={`http://localhost:3002/${post.image}`} alt={post.name} style={{ maxWidth: '250px' }} />
                    <h3 style={{textAlign:'center'}}className="post-title">{post.name}</h3>
                    <p className="post-description">{post.description}</p>
                    <div className="post-actions">
                        <span className={`action${isPostLiked(post._id) ? ' liked' : ''}`} onClick={() => handleLike(post._id)}><FontAwesomeIcon icon={faThumbsUp} /> Like{post.likes}</span>
                        <span className="action"><FontAwesomeIcon icon={faBookmark } /> Share</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;

