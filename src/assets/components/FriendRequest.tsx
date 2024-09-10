import React from "react";
import "../css/FriendRequest.css";
import { Link } from "react-router-dom";
import FriendReqData from "../js/FriendRequest";

export default function FriendRequest() {
  return (
    <div className="Friend-requests">
      <h4>Friend Requests</h4>
      {FriendReqData.map((friend) => (
        <div className="request">
          <Link to="/profile/id">
            <div className="info" key={friend.id}>
              <div className="user">
                <img src={friend.img} alt={friend.name} className='fr-img'/>
                <h5>{friend.name}</h5>
              </div>
              <div className="info-name">
                <p>{friend.info}</p>
              </div>
            </div>
          </Link>
          <div className="action">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-red">Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}
