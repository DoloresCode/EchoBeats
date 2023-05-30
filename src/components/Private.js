import React from "react"
import { Navigate } from "react-router-dom"

function Private({ Component }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("token"))
  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

export default Private
