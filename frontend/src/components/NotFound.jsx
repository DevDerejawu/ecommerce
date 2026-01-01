import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-red-600 text-7xl font-bold mb-4">404</h1>

      <p className="text-gray-700 text-lg mb-6">
        The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="inline-block rounded-md bg-green-500 px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-green-600"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
