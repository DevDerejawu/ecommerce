import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404</h1>
      <p>Page not found!</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
