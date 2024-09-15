import React from "react";
import "../css/BottomBar.css";
import { Link } from "react-router-dom";
import CurrentUser from "../dummyAPIs/CurrentUserData";
import Friend from "../icons/1.png";
import Message from "../icons/7.png";

export default function BottomBar() {
  return (
    <div className="leftBar">
      <div className="left-container">
        <div className="menu">
          <Link to="/">
            <div className="item">
              <img src={Friend} alt=""/>
            </div>
          </Link>
          <button type="submit" className="btn btn-primary pstbtn">Post</button>
          <Link to='/chatbox/id'>
            <div className="item">
              <img src={Message} alt=""/>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}