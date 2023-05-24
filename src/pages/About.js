import imageAbout from '../Pictures/Dolores_Crazover_picture.png'


function About() {
  return (
    <div className="about-container">
      <h2>About EchoBeats</h2>
      <div className="p-about-container">
        <p>
          EchoBeats is a revolutionary music player app designed to provide an
          immersive music listening experience. With a vast library of songs
          spanning various genres, EchoBeats allows users to discover, connect,
          and explore the world of music like never before.
        </p>
      </div>
      <h3>Advantages of EchoBeats</h3>
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
        <li>Personalized playlists to curate your own music collection</li>
      </ul>
      <h3>About the Developer</h3>
      <p>
        EchoBeats was developed by Dolores Crazover, a talented full-stack
        developer with expertise in frontend development and API integration.
        With a passion for music and technology, Dolores combined her skills to
        create an innovative music player app that brings the joy of music
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
            <img
              src={imageAbout}
              alt="DoloresCrazover"
            />
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
  )
}

export default About
