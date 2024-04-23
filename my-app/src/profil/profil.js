import React from 'react';
import { Link } from 'react-router-dom';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import './profile.css'; // You can define your CSS styles in App.css file

function App() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token'); // For example, if you store user data in localStorage
        navigate('/');
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
                        <Link to="/enregister">Enregister</Link>
                    </li>
                </ul>
                <span className="logout" onClick={logout}>
                    Logout <FontAwesomeIcon icon={faSignOutAlt} />
                </span>
            </div>
            <div className="content">
                <h1>Welcome to My Professional Profile Blog</h1>
                
            </div>
        </div>
    );
}

export default App;
