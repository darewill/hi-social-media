import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faEnvelope, faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import CurrentUser from "../js/CurrentUserData";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-containter">
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
          <Link to='/'>
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <div className="user">
            {/* <img src={CurrentUser.map(user=>(user.ProfileImage))} alt=''/> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
