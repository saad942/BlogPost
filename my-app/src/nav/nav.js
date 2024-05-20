import React from "react";
import "./nav.css"
import { faSignInAlt, faUserCircle, faSearch , faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    return (

        <div className="navbar">

            <strong  onClick={() => navigate('/home')} style={{ marginLeft: '10px' , fontSize:'25px' ,marginTop:'-5px'}}>marsoul </strong>
            <div></div>
            <div className="nav">

                {!token ? (
                    <>
                        <span onClick={() => navigate('/')}>Home</span>
                        <span> <FontAwesomeIcon icon={faSignInAlt} onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} /></span>
                    </>
                ) : (
                    <>
                    
                        {/* <span onClick={() => navigate('/Controle')}>Controle my post</span> */}
                        <input type="text" placeholder="Search ..." className="search-input" />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <span> <FontAwesomeIcon icon={faMessage} onClick={() => navigate('/profile')} style={{ marginLeft:'40PX',   fontSize: '20px'}} /></span>

                        <span> <FontAwesomeIcon icon={faUserCircle} onClick={() => navigate('/profile')} style={{ marginLeft:'40PX',   fontSize: '25px'}} /></span>
                    </>
                )
                }


            </div>
        </div>
    )
}
