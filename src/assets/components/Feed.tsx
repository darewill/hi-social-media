import React from 'react'
import '../css/Feeds.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faListDots, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default function Feed({fd}) {
  return (
    <div className='feed'>
      <div className="top-content">
        <Link to='/profile/id'>
          <div className="user">
            <img src={fd.feedProfile} alt=''/>
            <div>
            <h5>{fd.name}</h5>
            <small>1 Minute ago</small>
            </div>
          </div>
        </Link>
        <span><FontAwesomeIcon icon={faListDots}/></span>
      </div>
      <div className="mid-content">
        <p>{fd.desc}</p>
        <img src={fd.feedImage}/>
      </div>
      <div className="bottom-content">
        <div className="action-item">
          <span><FontAwesomeIcon icon={faStar}/> 14 Stars</span>
        </div>
        <div className="action-item">
          <span><FontAwesomeIcon icon={faComment}/> 2 Comments</span>
        </div>
      </div>
    </div>
  )
}
