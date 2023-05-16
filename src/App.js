import logo from './logo.svg';
import './App.css';

// import React, { useState, useEffect } from "react";
import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import MusicDetails from "./pages/MusicDetails";
import Login from "./pages/users/Login";
import Signup from "./pages/users/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  const [currentForm, setCurrentForm] = useState('login');

const toggleForm = (formName) => {
  setCurrentForm(formName);
}


  return (
    <div>
      <Header />

      <Routes>
        <div className="App">
{
  currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Signup onFormSwitch={toggleForm}/>
}

        </div>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Music />} />
        <Route path="/music/:id" element={<MusicDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
