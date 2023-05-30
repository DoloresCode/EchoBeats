import { Link, useNavigate } from "react-router-dom"
import ".././index.css"
import logo from "../Pictures/Logo_echobeats_black.png"

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    alert("You have been logged out!")
    navigate("/")
  }
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/home">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <Link to="/home">
              <div>Home</div>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <div>About</div>
            </Link>
          </li>
          <li>
            <Link to="/albums">
              <div>Albums</div>
            </Link>
          </li>
          <li>
            <Link to="/playlists">
              <div>Playlists</div>
            </Link>
          </li>
          <li>
            <div className="logout-nav" onClick={handleLogout}>
              Logout
            </div>
          </li>
          <li>
            <Link to="/contact">
              <div>Contact</div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
