import { MdOutlineBusinessCenter } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitterSquare, FaYoutube } from 'react-icons/fa';
import { AiFillInstagram, AiFillMail } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="bg-gray-950  text-white py-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols:4 gap-6">
      {/* Navigation Links */}
      <div className="flex  md:flex-row justify-center items-center  gap-4">
        <Link to="/" className="text-white hover:text-blue-400 hover:underline">
          Home
        </Link>
        <Link to="/jobs" className="text-white hover:text-blue-400 hover:underline">
          Jobs
        </Link>
        <Link to="/about" className="text-white hover:text-blue-400 hover:underline">
          About
        </Link>
        <Link to="/contact" className="text-white hover:text-blue-400 hover:underline">
          Contact
        </Link>
      </div>

      {/* Logo and Tagline */}
      <div className="flex flex-col items-center pt-5">
        <p className="text-2xl flex items-center">
          <MdOutlineBusinessCenter /> JOBLANE
        </p>
        <p className="text-sm text-gray-300 text-center">
          Giving best opportunities to best peoples.
        </p>

        {/* Social Media Icons */}
        <div className="flex gap-5 py-2 justify-center items-center">
          <FaFacebook className="cursor-pointer hover:text-[#2D68C4] duration-200 ease" size={22} />
          <FaTwitterSquare className="cursor-pointer hover:text-[#1DA1F2] duration-200 ease" size={22} />
          <FaYoutube className="cursor-pointer hover:text-[#FF0000] duration-200 ease" size={22} />
          <AiFillInstagram className="cursor-pointer hover:text-[#C13584] duration-200 ease" size={22} />
          <AiFillMail className="cursor-pointer hover:text-[#D44638] duration-200 ease" size={22} />
        </div>
      </div>

      {/* Developer Information */}
      <div className="flex flex-col  justify-center md:mr-3 items-center pt-3">
        <p className="text-sm md:text-base text-center">
          Designed and Developed by{' '}
          <Link
            target="_blank"
            className="underline  textwhite md:text-sm"
            to="https://www.github.com/osamaayub/job-lane-frontend"
          >
            Osama Ayub
          </Link>
        </p>
        <p className="text-sm text-center">&copy; Copyright, All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
