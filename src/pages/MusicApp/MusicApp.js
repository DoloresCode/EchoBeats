import React from "react"
import Albums from "./components-music/Albums"
import Playlists from "./components-music/Playlists"
import "./MusicApp.css"

const MusicApp = () => {
  return (
    <div className="container">
      <Albums />
      <Playlists />
    </div>
  )
}

export default MusicApp
