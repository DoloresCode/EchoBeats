// import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/MusicApp/components-music/Music";
import MusicDetails from "./pages/MusicApp/components-music/MusicDetails";
import Login from "./pages/users/Login";
import Signup from "./pages/users/Signup";
import Contact from "./pages/Contact";
import Header from "./components/Header";
// import WelcomeHeader from "./components/WelcomeHeader";
import Footer from "./components/Footer";

function App() {
  // const [currentForm, setCurrentForm] = useState("login");

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };


  return (
    <div>
      <Header />

      <Routes>
      {/* <Route path="/welcome" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />} /> */}
      <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Music />} />
        <Route path="/music/:id" element={<MusicDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
