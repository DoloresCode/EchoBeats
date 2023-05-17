import React, { useState, useEffect } from "react"
import axios from "axios"

const SPLYPLAYLISTS_ENDP = "https://api.spotify.com/v1/me/playlists"
const CLIENT_ID = "61fb2532956945e294d11910dc68516d" // insert your client id here from spotify
const CLIENT_SECRET = "7ab393257c3e4101bc39723ebc2866de"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/music"
const SPACE_DELIMITER = "%20"
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-modify-playback-state",
]
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

function Music() {
  const [token, setToken] = useState("")
  const [spfyData, setSpfyData] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, []) // run on time in the App

  // start a get request initiate at SPLYPLAYLISTS endpoint
  const handleMusic = () => {
    axios
      .get(SPLYPLAYLISTS_ENDP, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setSpfyData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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

  return (
    <>
      {/* You need to sign in to get an access token; that's the token you stuff in Bearer Authorization here */}
      <a
        href={`${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&response_type=token`}
      >
        Login to Spotify
      </a>

      <form onSubmit={searchArtists}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>

      {handleMusic()}
      {renderArtists()}
      {spfyData?.items
        ? spfyData.items.map((item, index) => <p key={index}> {item.name}</p>)
        : null}
    </>
  )
}

export default Music
