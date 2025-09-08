import React, { useState } from "react";
import { Link } from "react-router"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-400 text-black p-5">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + tagline */}
        <div>
          <Link to="/Homepage" className="text-lg font-extrabold">
            APPLYWISE
          </Link>
          <div className="text-sm font-normal">
            Make your planning for further studies easier with us!
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-baseline space-x-10">
          <a href="#" className="hover:underline">
            Notifications
          </a>
          <a href="#" className="hover:underline">
            Study Plan
          </a>
          <Link to="/Place" className="hover:underline">
            Lifestyle Plan
          </Link>
          <Link to="/Profile" className="btn btn-neutral">
            Profile
          </Link>
          <Link to="/" className="btn btn-neutral">
            Logout
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-black border-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-2 space-y-2">
          <a href="#" className="block hover:underline">
            Notifications
          </a>
          <a href="#" className="block hover:underline">
            Study Plan
          </a>
          <Link to="/Place" className="block hover:underline">
            Lifestyle Plan
          </Link>
          <Link to="/Profile" className=" btn btn-neutral w-full items-center text-center justify-center">
            Profile
          </Link>
          <Link to="/" className=" btn btn-neutral w-full items-center text-center justify-center">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
