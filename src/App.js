// import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom"
import Welcome from "./pages/Welcome"
import Home from "./pages/Home"
import About from "./pages/About"
import Albums from "./pages/MusicApp/components-music/Albums"
import Playlists from "./pages/MusicApp/components-music/Playlists"
import Login from "./pages/users/Login"
import Signup from "./pages/users/Signup"
import Contact from "./pages/Contact"
import Header from "./components/Header"
import WelcomeHeader from "./components/WelcomeHeader"
import SignupLoginHeader from "./components/SignupLoginHeader"
import Footer from "./components/Footer"
import Private from "./components/Private"

function App() {
  console.log(useLocation())
  const user = localStorage.getItem("auth_token")

  const { pathname } = useLocation()
  let header
  if (pathname === "/") {
    header = <WelcomeHeader />
  } else if (pathname === "/signup" || pathname === "/login") {
    header = <SignupLoginHeader /> // Render the specific header for signup and login pages
  } else {
    header = <Header />
  }

  return (
    <div>
      {/* check if the current URL path is equal to '/', if it is render the <WelcomeHeader /> component and if not render the <Header /> component. */}
      {/* {useLocation().pathname === "/" ? <WelcomeHeader /> : <Header />} */}
      {header}

      <Routes>
        {/* <Route path="/welcome" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />} /> */}
        <Route path="/" element={<Welcome />} />
        {user && <Route path="/home" element={<Home />} />}
        <Route path="/about" element={<About />} />
        <Route path="/albums" element={<Private Component={Albums} />} />
        <Route path="/playlists" element={<Private Component={Playlists} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
