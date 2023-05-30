import imageAbout from "../Pictures/Dolores_Crazover_picture.png"

function About() {
  return (
    <div className="about-container">
      <h3>About EchoBeats</h3>
      <div className="p-about-container">
        <p>
          EchoBeats is a musical journey, immersing you in diverse music styles
          from around the world. With its rich libraries of playlists and
          albums, it inspires creativity and connects you with the global music
          scene in a unique way.
        </p>
      </div>
      <div className="advantages-container">
      <h3>Advantages of EchoBeats</h3>
      <div className="li-advantages-container">
      <ul>
        <li>Seamless integration with a powerful music library API </li>
        <li>Intuitive user interface for effortless music exploration</li>
        <li>
          Advanced search functionality for finding songs, albums, artists, and
          playlists
        </li>
        <li>
          Broad music catalog featuring a diverse range of genres and artists
          from around the world
        </li>
      </ul>
      </div>
      </div>
      <div className="about-developer-container">
        <h3>About the Developer</h3>
        <p>
          EchoBeats was developed by Dolores Crazover, a talented full-stack
          developer with expertise in frontend development and API integration.
          With a passion for music and technology, Dolores combined her skills
          to create an innovative music player app that brings the joy of music
          inspiration to users worldwide.
        </p>
        <div className="info-container">
          <div className="linkedin-container">
            <a
              href="https://www.linkedin.com/in/dolores-crazover/"
              className="linkedin-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="image-wrapper">
                <img src={imageAbout} alt="DoloresCrazover" />
              </div>
            </a>
          </div>
          <div className="github-container">
            <a
              href="https://github.com/DoloresCode"
              className="github-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
