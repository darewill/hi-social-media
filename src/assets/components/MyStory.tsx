import React, { useState, useEffect } from "react";
import "../css/Stories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { auth, storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { formatDistanceToNow } from "date-fns";
import ProfileImage from "../images/ezio.jpg";

interface MyStoryProps {
  openStoryViewer: (storyUrl: string) => void; // Callback to open the story viewer modal
}

export default function MyStory({ openStoryViewer }: MyStoryProps) {
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [uploadedStory, setUploadedStory] = useState<string | null>(null);
  const [uploadTime, setUploadTime] = useState<Date | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      setPhotoURL(auth.currentUser.photoURL);
    }
  }, []);

  const handleStoryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const storyRef = ref(storage, `stories/${auth.currentUser?.uid}/${file.name}`);
    await uploadBytes(storyRef, file);
    const storyURL = await getDownloadURL(storyRef);

    setUploadedStory(storyURL);
    setUploadTime(new Date());

    // Remove story after 24 hours
    setTimeout(() => {
      setUploadedStory(null);
      setUploadTime(null);
    }, 24 * 60 * 60 * 1000);
  };

  const timeSinceUpload = uploadTime ? formatDistanceToNow(uploadTime, { addSuffix: true }) : null;

  // Handle click to open the story viewer
  const handleStoryClick = () => {
    if (uploadedStory) {
      openStoryViewer(uploadedStory); // Open the story viewer with the uploaded story
    }
  };

  return (
    <div className="story userStory" onClick={handleStoryClick}>
      {uploadedStory ? (
        <img src={uploadedStory} alt="My Story" className="story-image" />
      ) : (
        <img src={photoURL || ProfileImage} alt="Profile" className="brightness-50" />
      )}
      <label htmlFor="storyFiles" onClick={(e) => e.stopPropagation()}> {/* Prevent opening the story when clicking the icon */}
        <FontAwesomeIcon icon={faAdd} />
        <input type="file" id="storyFiles" onChange={handleStoryUpload} />
      </label>
      {timeSinceUpload && <p>{timeSinceUpload}</p>}
      <h5>Add Story</h5>
    </div>
  );
}
