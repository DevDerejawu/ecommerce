import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
function MiddleNavbar({ setOpenMobileCategory }) {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <>
      <div className="hidden md:flex flex gap-6 justify-center items-end">
        {navLinks.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-500 transition-colors duration-300 font-medium ${
                isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
              }`
            }
          >
            {name}
          </NavLink>
        ))}

        <NavLink
          key="login"
          to="login"
          className={({ isActive }) =>
            `bg-orange-500 px-4 py-2 cursor-pointer rounded-full hover:bg-orange-400 ${
              isActive ? " border-b-2 border-blue-500" : ""
            }`
          }
        >
          Login
        </NavLink>
      </div>

      <div className="md:hidden">
        <button onClick={() => setOpenMobileMenu((pre) => !pre)}>
          <Menu className="h-6 w-7 cursor-pointer" />
        </button>

        {openMobileMenu && (
          <div
            className={`
    absolute top-full left-0 w-full bg-blue-200 shadow-md z-50
    flex flex-col items-start space-y-5 p-4
    transform transition-all duration-1000 ease-in-out
    ${openMobileMenu ? "translate-x-0" : "-translate-x-full"}
  `}
          >
            {navLinks.map(({ name, path }) => (
              <NavLink
                onClick={() => setOpenMobileMenu((pre) => !pre)}
                className="hover:text-blue-300 hover:bg-orange-400 p-2 rounded"
                key={name}
                to={path}
              >
                {name}
              </NavLink>
            ))}

            <button
              onClick={() => {
                setOpenMobileCategory((pre) => !pre);
                setOpenMobileMenu((pre) => !pre);
              }}
              className="bg-orange-500 rounded py-2 px-3 text-lg hover:bg-orange-300 cursor-pointer"
            >
              Products
            </button>

            <NavLink
              onClick={() => setOpenMobileMenu((pre) => !pre)}
              key="login"
              to="login"
              className={({ isActive }) =>
                `bg-orange-500 px-4 py-2 cursor-pointer rounded-full hover:bg-orange-400 ${
                  isActive ? "border-b-2 border-blue-500" : ""
                }`
              }
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

export default MiddleNavbar;
