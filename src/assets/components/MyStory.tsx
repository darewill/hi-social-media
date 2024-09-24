import React, { useState, useEffect } from "react";
import "../css/Stories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { auth, storage, firestore } from "../../firebaseConfig"; // Import firestore
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; // Firestore functions
import { formatDistanceToNow } from "date-fns";
import ProfileImage from "../images/ezio.jpg";

interface MyStoryProps {
  openStoryViewer: (storyUrl: string) => void; // Callback to open the story viewer modal
}

export default function MyStory({ openStoryViewer }: MyStoryProps) {
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [uploadedStory, setUploadedStory] = useState<string | null>(null);
  const [uploadTime, setUploadTime] = useState<Date | null>(null);

  // Fetch the user's uploaded story on mount
  useEffect(() => {
    if (auth.currentUser) {
      setPhotoURL(auth.currentUser.photoURL);
      fetchUploadedStory();
    }
  }, []);

  // Fetch story data from Firestore
  const fetchUploadedStory = async () => {
    const userStoryRef = doc(firestore, "stories", auth.currentUser?.uid!);
    const storySnapshot = await getDoc(userStoryRef);
    if (storySnapshot.exists()) {
      const storyData = storySnapshot.data();
      const storyURL = storyData.storyUrl;
      const storyUploadTime = storyData.uploadTime.toDate(); // Firestore timestamp to JS Date
      const timeDiff = new Date().getTime() - storyUploadTime.getTime();
      if (timeDiff < 24 * 60 * 60 * 1000) { // If story is less than 24 hours old
        setUploadedStory(storyURL);
        setUploadTime(storyUploadTime);
      } else {
        await deleteDoc(userStoryRef); // Automatically remove story if older than 24 hours
      }
    }
  };

  const handleStoryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const storyRef = ref(storage, `stories/${auth.currentUser?.uid}/${file.name}`);
    await uploadBytes(storyRef, file);
    const storyURL = await getDownloadURL(storyRef);

    const now = new Date();
    setUploadedStory(storyURL);
    setUploadTime(now);

    // Save the story URL and upload time to Firestore
    const userStoryRef = doc(firestore, "stories", auth.currentUser?.uid!);
    await setDoc(userStoryRef, {
      storyUrl: storyURL,
      uploadTime: now,
    });

    // Remove story after 24 hours
    setTimeout(async () => {
      setUploadedStory(null);
      setUploadTime(null);
      await deleteDoc(userStoryRef);
    }, 24 * 60 * 60 * 1000);
  };

  // Time since the story was uploaded
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
