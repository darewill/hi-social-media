import React from "react";
import "../css/UserProfile.css";
import CurrentUserData from "../dummyAPIs/CurrentUserData";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faLink, faMessage } from "@fortawesome/free-solid-svg-icons";

export default function UserProfile() {
  return (
    <div className="userProfile">
      <div className="cover-photos">
        <img src={CurrentUserData[0].CoverPhoto} alt=""/>
      </div>
      <div className="profile-info">
        <img src={CurrentUserData[0].ProfileImage} alt="" />
        <div className="user-name">
          <h3>{CurrentUserData[0].name}</h3>
          <h5>{CurrentUserData[0].username}</h5>
        </div>
        <div className="profile-button">
          <Link to='/chatbox/id'>
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faMessage} />
            </button>
          </Link>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faFeed} />
            Follow
          </button>
          <button className="btn ">
            <FontAwesomeIcon icon={faLink} />
          </button>
        </div>
        <div className="bio">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
          enim modi sapiente at debitis reprehenderit eum corporis consequuntur
          in, tenetur minima consectetur voluptatum est. Consequatur possimus
          qui quia vero dolore.
        </div>
      </div>
    </div>
  );
}
