import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left Section */}
          <div className="border-b border-slate-500 shadow-lg py-4">
            <h2 className="text-lg font-bold text-center mb-2">Bloggify</h2>
            <p className="text-center">
              Your Space for Passionate Storytelling and Engagement
            </p>
          </div>

          {/* Right Section */}
          <div className="border-b border-slate-500 shadow-lg py-4">
            <h2 className="text-lg font-bold text-center mb-2">About Me</h2>
            <p className="text-center">
              Hi, I'm Kuldeep Kumar, currently pursuing a Bachelor’s degree in
              Computer Engineering at Zakir Husain College of Engineering and
              Technology (ZHCET). As a passionate full stack web developer, I
              have honed my skills in a variety of technologies, including
              React, Tailwind CSS, JavaScript, TypeScript, Prisma, Mongoose,
              MongoDB, PostgreSQL, Node.js, and Express.js. I enjoy creating
              robust, scalable web applications and continuously seek
              opportunities to learn and grow in the ever-evolving field of web
              development.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-4 mt-4 text-center">
          <p className="flex items-center justify-center">
            Developed by Kuldeep Kumar
            <a
              href="https://github.com/Kuldeep12mohan"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-gray-700 hover:text-gray-900"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/kuldeep-kumar-881072175"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-gray-700 hover:text-gray-900"
            >
              <FaLinkedin size={24} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
