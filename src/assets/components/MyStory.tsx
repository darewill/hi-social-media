import React, {useState, useEffect} from "react";
import "../css/Stories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../firebaseConfig";
import ProfileImage from "../images/ezio.jpg";

export default function MyStory() {

  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      setPhotoURL(auth.currentUser.photoURL);
    }
  }, []);

  return (
    <div className="story userStory">
      <img src={photoURL || ProfileImage} alt="" className='brightness-50'/>
      <label htmlFor='storyFiles'>
        <FontAwesomeIcon icon={faAdd} />
        <input type="file" id="storyFiles"/>
      </label>
      <h5>Add Story</h5>
    </div>
  );
}
