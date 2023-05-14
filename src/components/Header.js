import { Link } from "react-router-dom"
import logo from "../Pictures/Logo_echobeats_black.png"

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <Link to="/">
              <div>Home</div>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <div>About</div>
            </Link>
          </li>
          <li>
            <Link to="/projects">
              <div>Music</div>
            </Link>
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