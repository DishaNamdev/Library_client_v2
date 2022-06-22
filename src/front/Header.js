import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "@components/Modal";
import { Context as AuthContext } from "@context/authContext";
import { IoMdMenu } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { IoCall } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle, FaUser } from "react-icons/fa";

function Header() {
  const { fetchUser, name, enrollment, photo, logout } =
    useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);

  function toggleSidebar() {
    setSidebar(!sidebar);
  }

  useEffect(() => {
    if (!name) {
      fetchUser();
    }
  }, []);
  return (
    <>
      <div className="p-4 py-2 flex items-center justify-between">
        <IoMdMenu
          size={32}
          className="cursor-pointer "
          onClick={toggleSidebar}
        />
        <Link to="/profile">
          <img
            alt=""
            src={photo}
            className="h-14 w-14 rounded-full object-cover"
          />
        </Link>
      </div>
      {sidebar && (
        <Modal className="">
          <div className="text-gray-700  h-full w-8/12 bg-white animate__fadeInLeft animate__animated animate__faster">
            <div className="flex items-center border-b p-4 py-2 border-gray-200 ">
              <img
                alt=""
                src={photo}
                className="h-14 w-14 rounded-full object-cover mr-2"
              />
              <div>
                <p className="text-sm font-medium flex items-center capitalize ">
                  {name}
                </p>
                <p className="text-sm text-gray-500 ">{enrollment}</p>
              </div>
            </div>
            <Link to="/">
              <div className="flex items-center px-4">
                <AiFillHome size={24} />
                <p className="ml-4 py-4 text-base">Home</p>
              </div>
            </Link>

            <Link to="/profile">
              <div className="flex items-center px-4">
                <FaUserCircle size={24} />
                <p className="ml-4 py-4 text-base">Profile</p>
              </div>
            </Link>
            <Link to="/setting">
              <div className="flex items-center px-4">
                <AiFillSetting size={24} />
                <p className="ml-4 py-4 text-base">Setting</p>
              </div>
            </Link>
            <Link to="/search">
              <div className="flex items-center px-4">
                <BiSearch size={24} />
                <p className="ml-4 py-4 text-base">Search</p>
              </div>
            </Link>

            <div className="flex items-center px-4">
              <IoCall size={24} />
              <p className="ml-4 py-4 text-base">Contact</p>
            </div>
            <div className="flex items-center px-4">
              <AiFillInfoCircle size={24} />
              <p className="ml-4 py-4 text-base">About</p>
            </div>
            <div
              onClick={logout}
              className="flex items-center px-4 cursor-pointer"
            >
              <FaUser size={24} />
              <p className="ml-4 py-4 text-base">Logout</p>
            </div>
          </div>
          <div
            onClick={toggleSidebar}
            className="flex items-center justify-center rounded-full h-14 w-14 absolute right-5 top-5 bg-white"
          >
            <AiOutlinePlus size={24} className="transform rotate-45 " />
          </div>
        </Modal>
      )}
    </>
  );
}

export default Header;
