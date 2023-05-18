import React, { useEffect } from "react"
import Music from "./components-music/Music"
import "./MusicApp.css"

// https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists

// https://developer.spotify.com/documentation/web-api/tutorials/code-flow

// const CLIENT_ID = "61fb2532956945e294d11910dc68516d" // insert your client id here from spotify
// // const CLIENT_SECRET = "7ab393257c3e4101bc39723ebc2866de";
// const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
// const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/music"

// const SPACE_DELIMITER = "%20"
// const SCOPES = [
//   "user-read-currently-playing",
//   "user-read-playback-state",
//   "playlist-read-private",
// ]
// const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

// const getReturnedParamsFromSpotifyAuth = (hash) => {
//   const stringAfterHashtag = hash.substring(1)
//   const paramsInUrl = stringAfterHashtag.split("&")
//   const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
//     console.log(currentValue)
//     const [key, value] = currentValue.split("=")
//     accumulater[key] = value
//     return accumulater
//   }, {})

//   return paramsSplitUp
// }

const MusicApp = () => {
//   useEffect(() => {
//     if (window.location.hash) {
//       const { access_token, expires_in, token_type } =
//         getReturnedParamsFromSpotifyAuth(window.location.hash)

//       localStorage.clear()

//       localStorage.setItem("accessToken", access_token)
//       localStorage.setItem("tokenType", token_type)
//       localStorage.setItem("expiresIn", expires_in)
//     }
//   })

//   const handleLogin = () => {
//     window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
//   }

  return (
    <div className="container">
      {/* <h1>hi</h1>
      <button onClick={handleLogin}>login to EchoBeats</button> */}
      <Music />
    </div>
  )
}

export default MusicApp
