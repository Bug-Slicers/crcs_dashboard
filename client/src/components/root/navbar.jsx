import { useState } from "react";
import logoImage from "../../assets/MSCS_LOGO.png";
import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-primary font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center">
                <img src={logoImage} alt="Logo" className="h-8 w-auto" />
                <div className="ml-2">
                  <span className="text-white font-bold text-xl truncate">
                    CRCS Portal
                  </span>
                </div>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to={"home"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium underline"
                      : isPending
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }

                  //   className="text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </NavLink>
                {/* <NavLink
                  to={"charts"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium underline"
                      : isPending
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Charts
                </NavLink> */}
                <NavLink
                  to={"applications"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium underline"
                      : isPending
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Applications
                </NavLink>
                <NavLink
                  to={"amendments"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium underline"
                      : isPending
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Amendments
                </NavLink>
                <NavLink
                  to={"reports"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium underline"
                      : isPending
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Reports
                </NavLink>
                <NavLink
                  to={"signup"}
                  title="Registration, Login, Admin"
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium underline"
                      : isPending
                      ? "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "text-dark_grey hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  CRCS-MIS
                </NavLink>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="text-dark_grey hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 sm:px-3">
          <NavLink
            to={"home"}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
                : isPending
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"charts"}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
                : isPending
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Charts
          </NavLink>
          <NavLink
            to={"applications"}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
                : isPending
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Applications
          </NavLink>
          <NavLink
            to={"amendments"}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
                : isPending
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Amendments
          </NavLink>
          <NavLink
            to={"reports"}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
                : isPending
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Reports
          </NavLink>
          <NavLink
            to={"signup"}
            title="Registration, Login, Admin"
            className={({ isActive, isPending }) =>
              isActive
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium underline"
                : isPending
                ? "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-dark_grey hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            CRCS-MIS
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
