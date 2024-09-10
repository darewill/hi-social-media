import React from 'react'
import '../css/FriendRequest.css'
import { Link } from 'react-router-dom'
import FriendReqData from '../js/FriendRequest'

export default function FriendRequest() {
  return (
    <div className='Friend-requests'>
        <h4>Friend Requests</h4>
        {
            FriendReqData.map(friend=>(
                <div className="request">
                    <Link to='/profile/id'>
                    <div className="info" key={friend.id}>
                        <img src={friend.img} alt={friend.name}/>
                    </div>
                    <div className="info-name">
                        <h5>{friend.name}</h5>
                        <p>{friend.info}</p>
                    </div>
                    </Link>
                    <div className="action">
                        <div className="btn btn-primary">Accept</div>
                        <div className="btn btn-red">Decline</div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
