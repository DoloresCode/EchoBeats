import React from "react"
import { Navigate } from "react-router-dom"

function Private({ Component }) {
  const isAuthenticated = localStorage.getItem("auth_status")
  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

export default Private
