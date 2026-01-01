import { Link } from "react-router-dom";

function LogoForNavbar() {
  return (
    <Link
      to="/"
      className="text-2xl font-bold tracking-wide text-gray-800 hover:text-indigo-600 transition-colors"
    >
      MyShop
    </Link>
  );
}

export default LogoForNavbar;
