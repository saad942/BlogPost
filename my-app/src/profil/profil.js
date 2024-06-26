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
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token'); // For example, if you store user data in localStorage
        localStorage.removeItem('post');
        localStorage.removeItem('user');
        navigate('/');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/user/user/${user.id}`,{ headers: {
                    'Authorization': ` ${token}` // Fix Authorization header
                }});
                setInformation(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3002/user/user/${id}`, {
                headers: {
                    'Authorization': ` ${token}`
                }
            })
            console.log(response);
            console.log('user deleted successfully');
            localStorage.removeItem('token'); // For example, if you store user data in localStorage
        localStorage.removeItem('post');
        localStorage.removeItem('user');
        navigate('/');
            setInformation(information.filter(item => item.id !== id));
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };
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
                            <button onClick={()=>deleteUser(user.user_id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 12px', margin: '5px', cursor: 'pointer' }}>Delete Account</button>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default App;
