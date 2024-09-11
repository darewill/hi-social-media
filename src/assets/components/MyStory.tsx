import React from "react";
import "../css/Stories.css";
import CurrentUserData from "../dummyAPIs/CurrentUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function MyStory() {
  return (
    <div className="story userStory">
      <div className="user">
      <img src={CurrentUserData[0].ProfileImage} alt="" />
      </div>
      <img src={CurrentUserData[0].CoverPhoto} alt="" />
      <label htmlFor='storyFiles'>
        <FontAwesomeIcon icon={faAdd} />
        <input type="file" id="storyFiles"/>
      </label>
      <h5>Add Story</h5>
    </div>
  );
}
