import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">About Me</h3>
          <p className="text-sm">
            I am a junior full-stack developer learning WabiSkills bootcamp and
            building different kind of projects projects.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-white">
                Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: derejawubaye09@gmail.com</li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/DevDerejawu"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                DevDerejawu
              </a>
            </li>
            <li>
              Telegram:
              <a
                href="https://t.me/DevDerejawu"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                @DevDerejawu
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 border-t border-gray-700 py-4">
        © {new Date().getFullYear()} Derejawu — Portfolio Project
      </div>
    </footer>
  );
};

export default Footer;
