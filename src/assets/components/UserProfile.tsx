import React, {useState, useEffect} from "react";
import "../css/UserProfile.css";
import CurrentUserData from "../dummyAPIs/CurrentUserData";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faLink, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import ProfileImage from '../images/ezio.jpg';
import CoverImage from '../images/cover.jpg';

interface UserProfile {
  id: number;
  name: string;
  bio: string;
  gender: string;
  profileImage: string;
}

export default function UserProfile() {

  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Fetch the user profile from the backend
    fetch("http://localhost:5139/api/profile/1") // Assuming 1 is the logged-in user's ID
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="userProfile">
      <div className="cover-photos">
        <img src={CoverImage} alt="Profile"/>
        {/* user?.photoURL ||  */}
      </div>
      <div className="profile-info">
        <img src={user?.photoURL || ProfileImage} alt="" />
        <div className="user-name">
          <h3>{user?.displayName || "John Doe"}</h3>
          <h5>{user?.email || "username"}</h5>
        </div>
        <div className="profile-button">
          <Link to='/chatbox/id'>
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faMessage} />
            </button>
          </Link>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faFeed} />
            Follow
          </button>
          <button className="btn ">
            <FontAwesomeIcon icon={faLink} />
          </button>
        </div>
        <div className="bio">
          {profile.bio}
        </div>
      </div>
    </div>
  );
}
