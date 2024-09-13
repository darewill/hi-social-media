import React from "react";
import "../css/LeftBar.css";
import { Link } from "react-router-dom";
import CurrentUser from "../dummyAPIs/CurrentUserData";
import Friend from "../icons/1.png";
import Groups from "../icons/2.png";
import Market from "../icons/3.png";
import Watch from "../icons/4.png";
import Gallery from "../icons/5.png";
import Videos from "../icons/6.png";
import Message from "../icons/7.png";

export default function Leftbar() {
  return (
    <div className="leftBar">
      <div className="left-container">
        <div className="menu">
          <Link to="/">
            <div className="item">
              <img src={Friend} alt="" />
              <h4>Friends</h4>
            </div>
          </Link>
          <button type="submit" className="btn btn-primary pstbtn">Post</button>
          <Link to='/chatbox/id'>
            <div className="item">
              <img src={Message} alt="" />
              <h4>Messages</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}