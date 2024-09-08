import '../assets/css/Signup.css';

export default function Signup() {
  return (
    <div className='signup'>
      <div className='signup-box'>
          <div className="sign-text">
            <h1>Hi!</h1>
            <p>Sign up to see and upload photos.</p>
          </div>
        <form className="sign-form">
          <input type="text" className="sign-input" required placeholder="Full Name"/>
          <input type="email" className="sign-input" required placeholder="Email"/>
          <input type="text" className="sign-input" required placeholder="username"/>
          <input type="password" className="sign-input" required placeholder="password"/>
          <button type="submit" className='btn'>Sign up</button>
        </form>
      </div>
    </div>
  )
}
