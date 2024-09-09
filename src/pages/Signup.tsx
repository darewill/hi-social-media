import '../assets/css/Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <div className='signup bg-img'>
      <div className='signup-box'>
          <div className="signup-text">
            <h1>Hi!</h1>
            <p>Sign up to see and upload photos.</p>
          </div>
        <form className="signup-form">
          <input type="text" className="signup-input" required placeholder="Full Name"/>
          <input type="text" className="signup-input" required placeholder="Email"/>
          <input type="text" className="signup-input" required placeholder="username"/>
          <input type="password" className="signup-input" required placeholder="password"/>
          <button type="submit" className='btn'>Sign up</button>
        </form>
      </div>
      <hr className="hr-line"></hr>
      <div className='signup-box'>
        <h3>Already have an account?</h3>
        <button className="btn" onClick={handleLoginClick}>Sign in</button>
      </div>
    </div>
  )
}
