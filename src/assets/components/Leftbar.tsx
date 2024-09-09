import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import CurrentUser from "../js/CurrentUserData";

export default function Leftbar() {
  return (
    <div className="leftBar">
      <div className="left-container">
        <div className="menu">
          <Link to="/id">
            <div className="user">
              <img
                src={CurrentUser[0].ProfileImage}
                alt={CurrentUser[0].name}
                id="user-icon"
              />
              <h4 className="user-nm">{CurrentUser[0].name}</h4>
            </div>
          </Link>

          <Link to='/'>
            <div className="item">
              <img src='' alt='' />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
