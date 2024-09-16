// src/pages/Login.tsx
import '../assets/css/Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig'; // Import Firebase auth

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(''); // Update from username to email
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state before submitting

    try {
      // Firebase sign-in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      
      // Navigate to home after successful login
      navigate('/');
    } catch (err: any) {
      // Set error message
      setError(err.message);
    }
  };

  return (
    <div className='login bg-img'>
      <div className='login-box'>
        <div className="login-text">
          <h1>Hi!</h1>
          <p>Sign in into the Hi world.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email" // Updated to accept email
            className="login-input"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className='btn'>Login</button>
        </form>
      </div>
      <hr className="hr-line"></hr>
      <div className='signup-box'>
        <h3>Don't have an account?</h3>
        <button className="btn" onClick={handleSignupClick}>Register</button>
      </div>
    </div>
  );
}
