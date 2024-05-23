import React from "react";
import "./nav.css"
import { faSignInAlt, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    return (

        <div className="navbar">

            <strong  onClick={() => navigate('/home')} style={{ marginLeft: '10px' , fontSize:'25px' ,marginTop:'-5px',    fontWeight:'lighter'}}>Marsoul </strong>
            <div></div>
            <div className="nav">

                {!token ? (
                    <>
                        <span onClick={() => navigate('/')}>Home</span>
                        <span> <FontAwesomeIcon icon={faSignInAlt} onClick={() => navigate('/login')} style={{ cursor: 'pointer' }} /></span>
                    </>
                ) : (
                    <>
                    
                    

                        <span> <FontAwesomeIcon icon={faUserCircle} onClick={() => navigate('/profile')} style={{ marginLeft:'40PX',   fontSize: '25px'}} /></span>
                    </>
                )
                }


            </div>
        </div>
    )
}
