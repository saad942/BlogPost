import React from "react";
import "./nav.css"
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/')
    }
    const token = localStorage.getItem('token');
    return (
        <div className="navbar">
            <strong >Blog App</strong>
            <div></div>
            <div className="nav">
                <span onClick={() => navigate('/home')}> Post</span>

                {!token ? (
                    <>

                        <span onClick={() => navigate('/')}>Controle my post</span>
                        <span> <FontAwesomeIcon icon={faSignInAlt} onClick={() => navigate('/')} style={{ cursor: 'pointer' }} /></span>
                    </>
                ) : (
                    <>
                        <span onClick={() => navigate('/Controle')}>Controle my post</span>
                        <span> <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} style={{ cursor: 'pointer' }} /></span>
                    </>
                )
                }


            </div>
        </div>
    )
}
