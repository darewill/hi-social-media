import React from "react";
import "../css/LeftBar.css";
import { Link } from "react-router-dom";
import CurrentUser from "../js/CurrentUserData";
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
          <Link to="/profile/id">
            <div className="user">
              <img
                src={CurrentUser[0].ProfileImage}
                alt={CurrentUser[0].name}
                id="user-icon"
              />
              <h4 className="user-nm">{CurrentUser[0].name}</h4>
            </div>
          </Link>

          <Link to="/">
            <div className="item">
              <img src={Friend} alt="" />
              <h4>Friends</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={Groups} alt="" />
              <h4>Groups</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={Market} alt="" />
              <h4>Market</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={Watch} alt="" />
              <h4>Watch</h4>
            </div>
          </Link>
        </div>

        <hr />

        <div className="menu">
          <h4 className="others">Your Shortcuts</h4>

          <Link to="/">
            <div className="item">
              <img src={Gallery} alt="" />
              <h4>Gallery</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={Videos} alt="" />
              <h4>Videos</h4>
            </div>
          </Link>
          <Link to="/chatbox/id">
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
