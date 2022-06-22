import React from "react";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";

function Footer() {
  return (
    <>
      <div className="text-xs p-4 text-gray-400">
        <p className="text-right flex items-center justify-end">
          <Link to="/">Home</Link> <BsDot /> Contact <BsDot /> About
        </p>
        <p className="text-right  ">
          &copy; 2021 Madhav Institute of Technology & Science
        </p>
      </div>
    </>
  );
}

export default Footer;
