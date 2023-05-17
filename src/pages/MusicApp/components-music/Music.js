import React, { useState, useEffect } from "react"
import axios from "axios"

const PLAYLISTS_ENDP = "https://api.spotify.com/v1/me/playlists"
const ALBUMS_ENDP = "https://api.spotify.com/v1/me/albums"
const CLIENT_ID = "ee90770ebf6844819ca262204dcb0810" // insert your client id here from spotify
const CLIENT_SECRET = "1c7a7e72228a4e2fb30a1b99d7d600aa"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/music"
const SPACE_DELIMITER = "%20"
const SCOPES = [
  "user-library-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-modify-playback-state",
]
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

function Music() {
  const [token, setToken] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [spfyPlaylistData, setSpfyPlaylistData] = useState({})
  const [spfyAlbumData, setSpfyAlbumData] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    let expiresAt = window.localStorage.getItem("expiresAt")

    if ((!token && hash) || !expiresAt || expiresAt < new Date()) {
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
      expiresAt = new Date()
      expiresAt.setSeconds(expiresAt.seconds + duration)
      window.location.hash = ""
      window.localStorage.setItem("expiresAt", expiresAt)
      window.localStorage.setItem("token", token)
    }
    setExpiresAt(expiresAt)
    setToken(token)
  }, []) // run one time in the App

  // start a get request initiate at SPLYPLAYLISTS endpoint
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
        console.log(error)
      })
  }

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
        console.log(error)
      })
  }

  // start a get request initiate at SPLYPLAYLISTS endpoint
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
        href={`${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES_URL_PARAM}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&response_type=token`}
      >
        Login to Spotify
      </a>

      {/* <form onSubmit={searchArtists}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form> */}

      <button onClick={handleAlbums}>Get Albums</button>
      {renderArtists()}
      {spfyAlbumData?.items
        ? spfyAlbumData.items.map((album, index) => (
            <button key={index} onClick={() => play(album.id, "album")}>
              {album.release_date}
            </button>
          ))
        : null}
      <button onClick={handlePlaylists}>Get Playlists</button>
      {renderArtists()}
      {spfyPlaylistData?.items
        ? spfyPlaylistData.items.map((playlist, index) => (
            <button key={index} onClick={() => play(playlist.id, "playlist")}>
              {playlist.name}
            </button>
          ))
        : null}
    </>
  )
}

export default Music
