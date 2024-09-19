import React, { useEffect, useState, useRef } from "react";
import "../assets/css/Settings.css";
import { Button } from "../assets/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../assets/components/select";
import { auth, uploadProfileImage } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import ProfileImage from "../assets/images/ezio.jpg";

interface UserProfile {
  id: number;
  name: string;
  username: string;
  bio: string;
  gender: string;
  profileImage: string;
}


export default function Settings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName);
      setPhotoURL(auth.currentUser.photoURL);
    }
  }, []);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  
    if (file) {
      handlePhotoUpload(file); // Trigger photo upload after file selection
    }
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      const imageUrl = await uploadProfileImage(file, user?.uid || profile.id.toString()); 
      setPhotoURL(imageUrl); // Update the local photo URL
      setProfile({ ...profile, profileImage: imageUrl }); // Update profile image
      setMessage("Profile photo updated successfully!");
    } catch (error) {
      console.error("Error uploading photo:", error);
      setMessage("Failed to update profile photo.");
    }
  };

  const handleChangePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (file: File) => {
    if (auth.currentUser) {
      try {
        // Upload image to Firebase Storage
        const downloadURL = await uploadProfileImage(file, auth.currentUser.uid);
  
        // Update user's photoURL in Firebase auth profile
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });
  
        console.log("Profile image updated successfully:", downloadURL);
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    }
  };

  return (
    <div className="settings-wrapper">
      <h2 className="flex justify-center mt-[20px] text-xl">
        Edit Your Profile
      </h2>
      <div className="profile-pic">
        <div className="flex flex-row justify-evenly items-center">
          <div className="user-profile mr-[60px]">
            <div className="image">
              <img
                className="h-20 w-20 rounded-full"
                src={photoURL || ProfileImage}
                alt={displayName || 'User Avatar'}
              />
            </div>
            <div className="u-name">
              <h4 className="user-nm">{user?.displayName || 'No Name Available'}</h4>
              <h4 className="user-nm">@{profile.username}</h4> 
              {/* qito nalt kqyre */}
            </div>
          </div>
          <Button onClick={handleChangePhotoClick}>Change Photo</Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the input
            onChange={(e) => {
              if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
            }}
          />
        </div>
      </div>
      <div className="profile-desc flex flex-col items-center m-[20px]">
        <h3>Your Bio</h3>
        <input
          className="bio-desc mt-[10px] rounded-[15px] text-center text-black"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />
      </div>
      <div className="gender-select flex flex-col items-center m-[20px]">
        <h3>Your Gender</h3>
        <div className="select-opt text-black mt-[10px]">
          <Select
            value={profile.gender}
            onValueChange={(value) => setProfile({ ...profile, gender: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="save-changes flex justify-center m-[40px]">
        <Button
          className="save-btn w-[150px] h-[45px]"
          onClick={() => saveChanges(profile)}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  function saveChanges(updatedProfile: UserProfile) {
    // Make a PUT request to the backend to update the user profile
    fetch(`http://localhost:5139/api/profile/${updatedProfile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Profile updated successfully");
        // Optionally, you can set the profile again with the updated data
        setProfile(data);
      })
      .catch((error) => alert("Error updating profile" + {error}));
  }
}
