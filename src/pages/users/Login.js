// Import necessary libraries and components
import "../../index.css"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios" // Library for HTTP requests

// Login component
const Login = (props) => {
  // Initializing state variables for input fields and error message
  const initialState = { email: "", password: "" }
  const [input, setInput] = useState(initialState)
  const [error, setError] = useState("")

  // Handle input field changes by updating the corresponding state
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  // Function to handle login upon form submission
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const url = `${process.env.REACT_APP_API_BASEURL}/auth/login`
      const res = await axios.post(url, input) // Post request to the API
      // If successful, store token in localStorage and redirect to homepage
      localStorage.setItem("token", JSON.stringify(res.data.data))
      // Rederect to homePage after successful login
      alert("Login successful")
      window.location = "/home"
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError("An error occurred. Please try again.") // Fallback error message
      }
    }
  }

  // Render the login form
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
            name="email"
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
            name="password"
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
          Don't have an account?{" "}
          <Link onClick={() => props.onFormSwitch("signup")} to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
