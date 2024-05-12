import { Link } from 'react-router-dom';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import './profile.css'; // You can define your CSS styles in App.css file
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [information, setInformation] = useState([])
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const logout = () => {
        localStorage.removeItem('token'); // For example, if you store user data in localStorage
        navigate('/');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/user/user/${user._id}`);
                setInformation(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="containerr">
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/controle">Controle Post</Link>
                    </li>
                    <li>
                        <Link to="/enregiter">Enregister</Link>
                    </li>
                </ul>
                <span className="logout" onClick={logout}>
                    Logout <FontAwesomeIcon icon={faSignOutAlt} />
                </span>
            </div>
            <div className="content">
                <h1>Welcome to My Professional Profile Blog</h1>
                {information.map((user, index) => (
                    <div key={index} className="user-profile">
                        <h3>Name: {user.name}</h3><br /><br />
                        <h2>Email: {user.email}</h2><br /><br />
                        <div>
                            <button style={{ backgroundColor: 'rgb(180, 131, 131)', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 12px', margin: '5px', cursor: 'pointer' }}>Modify Account</button>
                            <button style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 12px', margin: '5px', cursor: 'pointer' }}>Delete Account</button>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default App;
