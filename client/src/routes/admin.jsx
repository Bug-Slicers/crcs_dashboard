import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logoImage from "../assets/MSCS_LOGO.png";
import { url } from "../assets/proxy";
import { toast } from "react-toastify";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await fetch(url + "/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Logout Successfully");
        navigate("/signup");
      } else {
        toast.error("Something went wrong error!!!");
      }

      // Perform any additional actions after logout if needed
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <div className="flex font-poppins min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-tertiary text-white w-56 fixed top-0 left-0 bottom-0 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        {/* Close Button */}
        <button
          className="absolute top-0 right-0 m-4 p-2 bg-secondary text-white rounded-full lg:hidden"
          onClick={toggleSidebar}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo and Text */}
        <div className="h-16 flex items-center pl-4">
          <img src={logoImage} alt="Logo" className="h-8 mr-2" />
          <span className="font-poppins font-bold text-xl">CRCS</span>
        </div>

        {/* Nav Links */}
        <nav className="py-4">
          <ul className="space-y-2">
            {/* <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
                    : "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                }
                activeClassName="text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
              >
                Profile
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="registered-societies"
                className={({ isActive }) =>
                  isActive
                    ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
                    : "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                }
                activeClassName="text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
              >
                Registered Societies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="applications"
                className={({ isActive }) =>
                  isActive
                    ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
                    : "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                }
                activeClassName="text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
              >
                Applications
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto mb-4 mx-4">
          <button
            onClick={logout}
            className="block w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-grow bg-gray-100">
        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            className="bg-secondary text-white p-2"
            onClick={toggleSidebar}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isSidebarOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Your page content goes here */}
        <div className="h-screen overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
