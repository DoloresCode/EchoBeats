import React from "react"
import { Link } from "react-router-dom"
import welcomePicture from "../Pictures/Welcomepage_picture.png"

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="background-image"></div>
      <div className="left-section">
        <h1 className="echo-beats-title">EchoBeats</h1>
        <p className="description">
          Discover, connect, and let the music take you higher.Welcome to
          EchoBeats, where melodies come alive.
        </p>
        <Link to="/signup">
          <button className="see-more-button">See More</button>
        </Link>
      </div>
      <div className="right-section">
        <img
          src={welcomePicture}
          alt="Happy woman listening to music with headphones"
          className="image"
        />
      </div>
    </div>
  )
}

export default Welcome
