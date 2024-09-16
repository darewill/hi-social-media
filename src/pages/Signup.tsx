// src/pages/Signup.tsx
import '../assets/css/Signup.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebaseConfig'; // Import your Firebase auth

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset the error state before submitting
    
    try {
      // Create a new user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name with the full name (Firebase doesn't have a separate 'username' field)
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: fullName,
        });
      }
      
      // Successfully signed up, navigate to home
      navigate('/');
    } catch (err: any) {
      // Handle signup errors
      setError(err.message);
    }
  };

  return (
    <div className='signup bg-img'>
      <div className='signup-box'>
        <div className="signup-text">
          <h1>Hi!</h1>
          <p>Sign up to see and upload photos.</p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="signup-input"
            required
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            className="signup-input"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="signup-input"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="signup-input"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className='btn'>Sign up</button>
        </form>
      </div>
      <hr className="hr-line"></hr>
      <div className='signup-box'>
        <h3>Already have an account?</h3>
        <button className="btn" onClick={handleLoginClick}>Sign in</button>
      </div>
    </div>
  );
}
