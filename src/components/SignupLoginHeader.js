import React from "react"
import { Link } from "react-router-dom"
import logo from "../Pictures/Logo_echobeats_black.png"

function SignupLoginHeader() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/home">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
    </header>
  )
}

export default SignupLoginHeader
