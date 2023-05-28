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
import Footer from "./components/Footer"

function App() {
  // const [currentForm, setCurrentForm] = useState("login");

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };
  console.log(useLocation())
  const user = localStorage.getItem("token")
  return (
    <div>
      {/* check if the current URL path is equal to '/', if it is render the <WelcomeHeader /> component and if not render the <Header /> component. */}
      {useLocation().pathname === "/" ? <WelcomeHeader /> : <Header />}

      <Routes>
        {/* <Route path="/welcome" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />} /> */}
        <Route path="/" element={<Welcome />} />
        {user && <Route path="/home" element={<Home />} />}
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Albums />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
