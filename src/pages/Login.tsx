import '../assets/css/Login.css';

export default function Login() {
  return (
    <div className='login'>
      <div className='login-box'>
        <h1>Hi!</h1>
        <p>Sign in into the Hi world.</p>
        <form className="login-form">
          <input type="text" className="login-input" required placeholder="username"/>
          <input type="password" className="login-input" required placeholder="password"/>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className='signup-box'>
        <h3>Don't have an account?</h3>
        <button className="btn btn-primary">Register</button>
      </div>
    </div>
  )
}
