import '../assets/css/Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSignupClick = () =>{
    navigate('/signup');
  };

  return (
    <div className='login bg-img'>
      <div className='login-box'>
          <div className="login-text">
            <h1>Hi!</h1>
            <p>Sign in into the Hi world.</p>
          </div>
        <form className="login-form">
          <input type="text" className="login-input" required placeholder="username"/>
          <input type="password" className="login-input" required placeholder="password"/>
          <button type="submit" className='btn'>Login</button>
        </form>
      </div>
      <hr className="hr-line"></hr>
      <div className='signup-box'>
        <h3>Don't have an account?</h3>
        <button className="btn" onClick={handleSignupClick}>Register</button>
      </div>
    </div>
  )
}
