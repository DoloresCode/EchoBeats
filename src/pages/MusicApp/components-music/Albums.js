import React, { useState, useEffect } from "react"
import axios from "axios"
import "../MusicApp.css"

// Constants for API endpoints and Spotify authorization - Help get API Key
// https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
const ALBUMS_ENDP = "https://api.spotify.com/v1/me/albums"
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/albums"
const SPACE_DELIMITER = "%20"
const words = ["Discover", "Experience", "Transform"]
console.log(CLIENT_ID)
// Scopes for Spotify authorization - access to my Music library,
const SCOPES = [
  "user-library-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-modify-playback-state",
]
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

// Define the Albums component
function Albums() {
  // Set up state variables
  const [token, setToken] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [spfyAlbumData, setSpfyAlbumData] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  console.log(expiresAt)

  // Function to clear the fetched albums
  const resetAlbums = () => {
    setSpfyAlbumData({})
  }

  // useEffect hook for handling authorization and setting token - token and expiration duration are retrieve from URL hash fragment or local storage if they exist there.
  useEffect(() => {
    // Code to handle authorization
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    let expiresAt = window.localStorage.getItem("expiresAt")

    //If the token is expired or not present in local storage, the hook retrieves it from the URL and sets it in local storage.
    if (!token || !expiresAt || expiresAt < new Date().getTime()) {
      /* I need to sign in to get an access token; that's the token I put in Bearer Authorization here */
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
      expiresAt = new Date().getTime() + duration * 1000 // the duration comes from Spotify in seconds; localStorage only stores stuff in Strings (so we need to change the Date into a numeric value: getTime() stores a date in milliseconds since Jan 1, 1970)
      window.location.hash = ""
      window.localStorage.setItem("expiresAt", expiresAt)
      window.localStorage.setItem("token", token)
    }
    // Set the token and expiration date in state
    setExpiresAt(expiresAt)
    setToken(token)
  }, []) // This hook runs once when the component mounts

  // Function to fetch albums
  const handleAlbums = () => {
    axios
      .get(ALBUMS_ENDP, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setSpfyAlbumData(response.data)
      })
      .catch((error) => {
        console.log(error.reponse)
      })
  }

  // Function to play a playlist or album
  const play = (playlistId, playType) => {
    let context = `spotify:${playType}:${playlistId}`
    console.log(context)
    axios
      .put("https://api.spotify.com/v1/me/player/play", {
        headers: {
          Authorization: "Bearer " + token,
        },
        body: { context_uri: context },
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

  const [activeWord, setActiveWord] = useState("Discover")

  // incrementation of the index by 1 making it equal to the lengh of words so it reset it to 0.
  useEffect(() => {
    let index = 0

    const intervalId = setInterval(() => {
      index = index + 1 === words.length ? 0 : index + 1
      setActiveWord(words[index]) // updates the value of activeWord to the word at the current index of the words array
    }, 2000) // Change every 2 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array to ensure this runs once on mount and not on every update

  // All the component is render here
  // When I click "Get Albums" or "Get Playlists", the app makes a GET request to the Spotify API with the access token in the Authorization header. The access token lets Spotify know that my app is authorized to access the user's Spotify data. The API responds with the user's saved albums or playlists (mine), respectively, and these are set in the component's state and displayed in the app (EchoBeats).
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
        Dive into our expansive library of albums and playlists. Allow the
        diverse power of artists from around the globe to ignite your
        inspiration.
        <br />
        <br />
        Your journey through music starts here.
        <span
          style={{
            color:
              activeWord === "Discover"
                ? "#00C4CC"
                : activeWord === "Experience"
                ? "#BF2026"
                : activeWord === "Transform"
                ? "purple"
                : "#BF2026",
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

      {/* {/* FOR ALBUM */}
      <div className="album-button-container">
        <button onClick={handleAlbums}>Get Albums</button>
        <button onClick={resetAlbums}>Reset Albums</button>
      </div>
      {/* Artist rendering */}
      <div className="artists-container">{renderArtists()}</div>
      <div className="card-grid">
        {spfyAlbumData?.items
          ? spfyAlbumData.items.map((album, index) => (
              <div key={index}>
                <img src={album.album.images[0]?.url} alt="Album cover" />{" "}
                {/* Display album image */}
                <button onClick={() => play(album.album.id, "album")}>
                  {album.album.name} {album.album.release_date}
                </button>
              </div>
            ))
          : null}
      </div>
    </>
  )
}

export default Albums
