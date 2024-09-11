import React from "react";
import "../css/Comments.css";
import { Link } from "react-router-dom";
import CommentsData from "../dummyAPIs/CommentData";
import CurrentUserData from "../dummyAPIs/CurrentUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Comments() {
  return (
    <div className="comments">
      <div className="writebox">
        <form action="#">
          <div className="user">
            <img src={CurrentUserData[0].ProfileImage} alt="" />
            <input type="text" placeholder="Write a comment" />
            <button type="submit" className="btn btn-primary">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </form>
      </div>
      {CommentsData.map((comment) => (
        <Link to={"/profile/id"}>
          <div className="user" key={comment.id}>
            <img src={comment.commentProfile} alt="" />
            <div>
              <h5>{comment.name}</h5>
              <p>{comment.CommentText}</p>
            </div>
            <small>1h ago</small>
          </div>
        </Link>
      ))}
    </div>
  );
}
