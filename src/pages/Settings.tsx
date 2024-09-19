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
import { uploadProfileImage } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

interface UserProfile {
  id: number;
  name: string;
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
  };

  // const handlePhotoUpload = async () => {
  //   if (!selectedFile) return;
  //   try {
  //     const imageUrl = await uploadProfileImage(
  //       selectedFile,
  //       profile.id.toString()
  //     );
  //     setProfile({ ...profile, profileImage: imageUrl });
  //     setMessage("Profile photo updated successfully!");
  //   } catch (error) {
  //     console.error("Error uploading photo:", error);
  //   }
  // };

  const handleChangePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
                src={photoURL || 'default-avatar.png'}
                alt={displayName || 'User Avatar'}
              />
            </div>
            <div className="u-name">
              <h4 className="user-nm">{user?.displayName || 'No Name Available'}</h4>
            </div>
          </div>
          <Button onClick={handleChangePhotoClick}>Change Photo</Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the input
            onChange={handleFileChange} // Your existing file change handler
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
        {saveMessage && <p>{saveMessage}</p>}
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
