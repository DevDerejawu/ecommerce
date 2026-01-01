const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">

        <h1 className="text-3xl font-bold mb-6">
          About Me
        </h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          Hello, my name is <strong>Derejawu</strong>. I am a junior
          full-stack developer who enjoys learning by building real projects.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          I took my training at <strong>WabiSkills Bootcamp</strong>,
          where I learned modern web development using technologies like
          React, Node.js, and relational databases.
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          This project is part of my portfolio to demonstrate my skills,
          coding style, and understanding of full-stack development concepts.
        </p>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-4">
          Contact Information
        </h2>

        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>Email:</strong> derejawubaye09@gmail.com
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/DevDerejawu"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              DevDerejawu
            </a>
          </li>
          <li>
            <strong>Telegram:</strong>{" "}
            <a
              href="https://t.me/DevDerejawu"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              @DevDerejawu
            </a>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default AboutPage;
