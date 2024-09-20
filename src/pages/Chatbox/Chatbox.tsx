import React, {useState, useEffect}from "react";
import "../../assets/css/Chatbox.css";
import Stories from "../../assets/components/Stories";
import CurrentUserData from "../../assets/dummyAPIs/CurrentUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../firebaseConfig";
import ProfileImage from "../../assets/images/ezio.jpg";

export default function Chatbox() {

  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName);
      setPhotoURL(auth.currentUser.photoURL);
    }
  }, []);

  return (
    <>
      <Stories />
      <div className="chat-box">
        <div className="chat-box-top">
          <img src={photoURL || ProfileImage} alt="" />
          <div className="user-name">
            <h3>{user?.displayName || 'No Name Available'}</h3>
            {/* <h5>{CurrentUserData[0].username}</h5> */}
          </div>
        </div>
        <div className="chat-box-bottom">
          <form action='#'>
            <input type='text' placeholder='Say Hi..'/>
            <button type='submit' className='btn btn-primary'>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
            <label className='btn btn-primary' htmlFor='CFile'>
              <FontAwesomeIcon icon={faFileAlt} />
              <input type='file' id='CFile'/>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
