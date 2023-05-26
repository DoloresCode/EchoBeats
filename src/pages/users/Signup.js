// Import necessary libraries and components
import '../../index.css';
import React, { useState } from "react"; // State hooks from React
import { Link, useNavigate } from "react-router-dom"; // Component for handling internal routing
import axios from "axios"; // Library for HTTP requests


// ATTENTION remove signUP below aas it is not used
const Signup = ({ signUp, onFormSwitch }) => {
  const initialState = { firstName: "", lastName: "", email: "", password: "" }
  const [input, setInput] = useState(initialState)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  //     // Reset form inputs
  //     setFirstName("");
  //     setLastName("");
  //     setEmail("");
  //     setPassword("");
  //   };
  //     setInput(initialState)
  //   }

  const handleChange = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const url = "https://localhost:4000/api/users";
      const { data: res } = await axios.post(url, input)
      navigate("/login")
      console.log(res.message)
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message); 
          } else {
        setError(error.response.data.message)
      }
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
            id="firstName"
            value={input.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            value={input.lastName}
            onChange={handleChange}
            required
          />
        </div>
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

export default Signup;
