import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faEnvelope,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import CurrentUser from "../dummyAPIs/CurrentUserData";
import "../css/Navbar.css";
import DarkMode from "./DarkMode";
import { useAuth } from "../hooks/useAuth"; // Updated path for useAuth

export default function Navbar() {
  const { user, logout } = useAuth(); // Use 'user' from Firebase authentication state
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference to the dropdown menu

  // Toggle dropdown menu
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Handle click outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    // Add event listener to detect clicks outside of the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/">
            <h3 className="logo">Hi!</h3>
          </Link>
        </div>
        <div className="nav-center">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="search" />
          </div>
        </div>
        <div className="nav-right">
          {user ? ( // Check if user is authenticated
            <>
              <Link to="/chatbox/id">
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
              <Link to="/">
                <FontAwesomeIcon icon={faBell} />
              </Link>
              <DarkMode />

              {/* User Profile Dropdown */}
              <div className="user">
                <div onClick={toggleDropdown} className="user-profile">
                  <img
                    src={user.photoURL ?? 'defaultImageUrl'}
                    alt={user.displayName ?? 'User Profile'}
                    id="user-icon"
                  />
                  <h4 className="user-nm">{user.displayName ?? 'User'}</h4>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div ref={dropdownRef} className="dropdown-menu">
                    <Link to="/profile/id" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      Settings
                    </Link>
                    <button className="dropdown-item btn-logout" onClick={logout}>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Sign In</Link>
              <Link to="/signup" className="btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
