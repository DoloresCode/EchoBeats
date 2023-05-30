import React, { useState, useEffect } from "react"
import axios from "axios"
import "../MusicApp.css"

// Constants for API endpoints and Spotify authorization
const PLAYLISTS_ENDP = "https://api.spotify.com/v1/me/playlists?limit=50"
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/playlists"
const SPACE_DELIMITER = "%20"
// const words = ['Discover', 'Experience', 'Transform'];

// Scopes for Spotify authorization
const SCOPES = [
  "user-library-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-modify-playback-state",
]
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

// Define the Playlists component
function Playlists() {
  // Set up state variables
  const [token, setToken] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [spfyPlaylistData, setSpfyPlaylistData] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  console.log(expiresAt)
  // Function to clear the fetched playlists
  const resetPlaylists = () => {
    setSpfyPlaylistData({})
  }

  // useEffect hook for handling authorization and setting token
  useEffect(() => {
    // Code to handle authorization
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    let expiresAt = window.localStorage.getItem("expiresAt")

    // If the token is expired or not present in local storage, the hook retrieves it from the URL and sets it in local storage.
    if (!token || !expiresAt || parseInt(expiresAt) < new Date().getTime()) {
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES_URL_PARAM}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&response_type=token`
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1]
      let duration = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("expires_in"))
        .split("=")[1]
      expiresAt = new Date().getTime() + duration * 1000
      window.location.hash = ""
      window.localStorage.setItem("expiresAt", expiresAt)
      window.localStorage.setItem("token", token)
    }
    // Set the token and expiration date in state
    setExpiresAt(expiresAt)
    setToken(token)
  }, []) // This hook runs once when the component mounts

  // Function to fetch playlists
  const handlePlaylists = () => {
    axios
      .get(PLAYLISTS_ENDP, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setSpfyPlaylistData(response.data)
      })
      .catch((error) => {
        console.log(error.reponse)
      })
  }

  // Function to play a playlist
  const play = (playlistId) => {
    let context = `spotify:playlist:${playlistId}`
    axios
      .put("https://api.spotify.com/v1/me/player/play", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { context_uri: context },
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Function to search for artists
  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    })

    setArtists(data.artists.items)
  }

  // Function to render artist information
  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ))
  }

  const [activeWord, setActiveWord] = useState("Explore")

  // incrementation of the index by 1 making it equal to the lengh of words so it reset it to 0.
  useEffect(() => {
    const words = ["Explore", "Immerse", "Inspire"]
    let index = 0

    const intervalId = setInterval(() => {
      index = index + 1 === words.length ? 0 : index + 1
      setActiveWord(words[index]) // updates the value of activeWord to the word at the current index of the words array
    }, 2000) // Change every 2 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array to ensure this runs once on mount and not on every update

  // All the component is render here
  return (
    <>
      <h1
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "30px",
          marginLeft: "5%",
          paddingBottom: "20px",
          width: "60%",
        }}
      >
        Browse through our extensive collection of playlists. Discover the
        diverse range of artists and genres represented.
        <br />
        <br />
        Your exploration of music begins here.
        <span
          style={{
            color:
              activeWord === "Explore"
                ? "#FF6347"
                : activeWord === "Immerse"
                ? "#32CD32"
                : activeWord === "Inspire"
                ? "#4169E1"
                : "#FF6347",
            fontSize: "40px",
          }}
        >
          {" "}
          {activeWord}
        </span>
        .
      </h1>

      {/* Search form */}
      <form className="search-music-form" onSubmit={searchArtists}>
        <input
          type="text"
          onChange={(e) => setSearchKey(e.target.value)}
          id="search-field"
        />
        <button type={"submit"}>Search</button>
      </form>

      {/* Artist rendering */}
      <div className="artists-container">{renderArtists()}</div>

      <div className="playlist-button-container">
        <button onClick={handlePlaylists}>Get Playlists</button>
        <button onClick={resetPlaylists}>Reset Playlists</button>
      </div>
      <div className="card-grid">
        {spfyPlaylistData?.items
          ? spfyPlaylistData.items.map((playlist, index) => (
              <div key={index}>
                <img src={playlist.images[0]?.url} alt="Playlist cover" />{" "}
                {/* Display playlist image */}
                <button onClick={() => play(playlist.id)}>
                  {playlist.name}
                </button>
              </div>
            ))
          : null}
      </div>
    </>
  )
}

export default Playlists
