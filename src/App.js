// import logo from './logo.svg';
// import './App.css';

// import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import MusicDetails from "./pages/MusicDetails";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Music />} />
        <Route path="/music/:id" element={<MusicDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
