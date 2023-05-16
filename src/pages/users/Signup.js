import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // signup logic here

    // Reset form inputs
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <div className="login-link-container">
        <p>Already have an account? <Link onClick={ () => props.onFormSwitch('login')} to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
