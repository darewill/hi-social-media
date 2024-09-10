import React from 'react'
import '../css/Rightbar.css'
import Message from './Message'
import FriendRequest from './FriendRequest'

export default function Rightbar() {
  return (
    <div className='rightBar'>
      <div className="rightbar-container">
        <Message />
        <FriendRequest />
      </div>
    </div>
  )
}
