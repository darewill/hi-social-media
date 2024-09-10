import React from 'react'
import '../css/AddPost.css'
import CurrentUserData from '../js/CurrentUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSmile, faTags, faVideo } from '@fortawesome/free-solid-svg-icons';


export default function AddPost() {
  return (
    <form className='postForm'>
        <div className="user form-top">
            <img src={CurrentUserData[0].ProfileImage} alt=''/>
            <input type='text' placeholder="What's on your mind?"/>
            <button type="submit" className="btn btn-primary">Post</button>
        </div>
        <div className="post-categories">
            <label htmlFor='file'>
                <input type='file' id='file'/>
                <span>
                    <FontAwesomeIcon icon={faImage} />
                    Photos
                </span>
            </label>
            <label htmlFor='file'>
                <input type='file' id='file'/>
                <span>
                    <FontAwesomeIcon icon={faVideo} />
                    Videos
                </span>
                <span><FontAwesomeIcon icon={faTags} />Tag</span>
                <span><FontAwesomeIcon icon={faSmile} />Emojis</span>
            </label>
        </div>
    </form>
  )
}
