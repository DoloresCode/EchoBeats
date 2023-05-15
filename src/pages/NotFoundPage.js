import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <p>Let's get you back on track.</p>
      <p>
        <span className="fun-text">🎵 Sing with us: "404, you're out the door! We'll guide you back, just follow our score! 🎵"</span>
      </p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;
