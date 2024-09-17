import React from "react";
import "../assets/css/Settings.css";
import CurrentUser from "../assets/dummyAPIs/CurrentUserData";
import { Button } from "../assets/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../assets/components/select";

export default function Settings() {
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
                src={CurrentUser[0].ProfileImage}
                alt={CurrentUser[0].name}
              />
            </div>
            <div className="u-name">
              <h4 className="user-nm">{CurrentUser[0].name}</h4>
              <h4 className="user-nm">{CurrentUser[0].username}</h4>
            </div>
          </div>
          <Button> Change Photo</Button>
        </div>
      </div>
      <div className="profile-desc flex flex-col items-center m-[20px]">
        <h3>Your Bio</h3>
        <input className="bio-desc mt-[10px] rounded-[15px] text-center text-black" />
      </div>
      <div className="gender-select flex flex-col items-center m-[20px]">
        <h3>Your Gender</h3>
        <div className="select-opt text-black mt-[10px]">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Male</SelectItem>
              <SelectItem value="dark">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="save-changes flex justify-center m-[40px]">
      <Button className='save-btn w-[150px] h-[45px]'> Save Changes</Button>
      </div>
    </div>
  );
}

