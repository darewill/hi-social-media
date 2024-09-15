import React from 'react'
import '../css/Rightbar.css'
import Message from './Message'
import FriendRequest from './FriendRequest'
import Stories from './Stories'

export default function Rightbar() {
  return (
    <div className='rightBar'>
      <div className="rightbar-container">
        <Stories />
        {/* <Message />
        <FriendRequest /> */}
      </div>
    </div>
  )
}
