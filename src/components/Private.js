import React from "react"
import { Navigate } from "react-router-dom"

function Private({ Component }) {
  const token = localStorage.getItem("auth_token")
  const isAuthenticated = token ? true : false
  return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

export default Private
