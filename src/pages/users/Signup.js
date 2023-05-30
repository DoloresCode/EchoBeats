// Import necessary libraries and components
import "../../index.css"
import React, { useState } from "react" // State hooks from React
import { Link, useNavigate } from "react-router-dom" // Component for handling internal routing
import axios from "axios" // Library for HTTP requests

// ATTENTION remove signUP below as it is not used
const Signup = ({ signUp, onFormSwitch }) => {
  const initialState = { firstname: "", lastname: "", email: "", password: "" }
  const [input, setInput] = useState(initialState)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const url = `https://echobeats-backend-auth.onrender.com/api/auth/signup`
      await axios.post(url, input)
      alert("registration successful...")
      navigate("/login")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign up and create a new account</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={input.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={input.lastname}
            onChange={handleChange}
            required
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <div className="login-link-container">
        <p>
          Already have an account?{" "}
          <Link onClick={() => onFormSwitch("login")} to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
