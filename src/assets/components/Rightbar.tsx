import React from 'react'
import '../css/Rightbar.css'
import Message from './Message'

export default function Rightbar() {
  return (
    <div className='rightBar'>
      <div className="rightbar-container">
        <Message />
      </div>
    </div>
  )
}
