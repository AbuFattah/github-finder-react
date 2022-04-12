import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="navbar bg-neutral">
      <div className="flex justify-between container mx-auto px-4">
        <p className="">
          <FaGithub className="inline text-3xl mr-2"></FaGithub>
          <Link to="/" className="align-middle text-lg">
            Github Finder
          </Link>
        </p>
        <div className="flex items-center font-semibold">
          <Link to="/" className="btn btn-ghost btn-sm rounded">
            Home
          </Link>
          <Link to="/about" className="btn btn-ghost btn-sm rounded">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
