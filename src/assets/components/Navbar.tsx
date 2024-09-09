import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faEnvelope, faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import CurrentUser from "../js/CurrentUserData";
import '../css/Navbar.css';
import DarkMode from "./DarkMode";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/">
            <h3 className="logo">Hi!</h3>
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link to="/id">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="search" />
          </div>
        </div>
        <div className="nav-right">
          <Link to='/Chatbox/id'>
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
          <Link to='/'>
            <FontAwesomeIcon icon={faBell} />
          </Link>
          <DarkMode />
          <Link to='/'>
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <div className="user">
          <img src={CurrentUser[0].ProfileImage} alt={CurrentUser[0].name} id='user-icon'/>
          <h4 className='user-nm'>{CurrentUser[0].name}</h4>
          </div>
        </div>
      </div>
    </nav>
  );
}
