import React from "react";
import "./nav.css"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Nav(){
    return(
        <div className="navbar">
            <strong >Blog App</strong>
            <div></div>
            <div className="nav">
            
            <span> Home</span>
            <span> Add blog</span>
            <span> About</span>
            <FontAwesomeIcon icon={faUser} className="icn" />
          </div>
        </div>
    )
}
