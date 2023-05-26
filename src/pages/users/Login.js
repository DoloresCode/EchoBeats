import '../../index.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Login = (props) => {
  const initialState = { email: "", password: "" }
  const [input, setInput] = useState(initialState)
  const [error, setError] = useState("")

  const handleChange = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }


  //   // Reset form inputs
  //   setEmail("")
  //   setPassword("")
  // }
// export default Login



const handleLogin = async (e) => {
  e.preventDefault()
  try {
    const url = "https://localhost:4000/api/auth";
    const res = await axios.post(url, input); // Post request to the API
    localStorage.setItem("token", res.data);
    window.location = "/";
  } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message); 
        } else {
      setError(error.response.data.message)
    }
  }
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
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              placeholder="*********"
              id="password"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
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

export default Login;
