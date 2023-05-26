import React, { useState } from "react"
import { Link } from "react-router-dom"

export function Login(props) {
  const [email, setEmail] = useState("") // initial value empthy that will be updated
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email);
    // login logic here

    // Reset form inputs
    setEmail("")
    setPassword("")
  }

  return (
    
      <div className="login-container">
        <h1>Welcome Back</h1>
        <h2>Login to your account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              placeholder="*********"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
        <div className="signup-link-container">
          <p>
            Don't have an account? <Link onClick={ () => props.onFormSwitch('signup')} to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
  )
}

export default Login
