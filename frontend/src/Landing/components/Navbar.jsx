import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Power } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("left");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setTimeout(() => {
      if (tab === "left") {
        navigate("/apply-for-jobs");
      } else if (tab === "right") {
        navigate("/hire/hrprofile");
      }
    }, 500);
  };

  const handleProfileClick = () => setDropdownOpen((open) => !open);

  const handleProfileOption = (option) => {
    setDropdownOpen(false);
    if (option === "profile") navigate("/profile");
    if (option === "logout") navigate("/login"); // Replace with real logout logic
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#0b52c0] shadow-md transition-shadow duration-300 ${
        scrolled ? "breathing-effect" : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Profile section (where search bar was) */}
          <div className="relative ml-2 hidden md:flex" ref={profileRef}>
            <button
              className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-md focus:outline-none"
              onClick={handleProfileClick}
            >
              <FaUserCircle className="text-blue-600 w-6 h-6" />
              <span className="text-blue-900 font-semibold text-sm">Hi, Shivam</span>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => handleProfileOption("profile")}
                >
                  Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => handleProfileOption("logout")}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-5 flex-1">
          <span className="text-white text-xl font-bold">ASK FINANCE</span>
        </div>

        <div className="flex items-center gap-6">
          {/* Add hidden md:flex to show only on medium screens and above */}
          <div className="relative hidden md:flex w-40 rounded-full bg-white overflow-hidden h-9 border-2 border-blue-600">
            <div
              className={`absolute top-0 bottom-0 left-[-2px] w-[calc(52%)] bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-transform duration-300 ${
                activeTab === "right" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            {[
              "left",
              "right"
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative z-10 w-1/2 py-1.5 text-xs font-semibold ${
                  activeTab === tab ? "text-white" : "text-blue-900"
                }`}
              >
                {tab === "left" ? "Apply Job" : "Hire Now"}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 h-9 rounded-full transition-all duration-300 flex items-center gap-2 shadow-md"
          >
            <Power className="w-4 h-4" />
            <span>
              Login
            </span>
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-40 bg-[#0b52c0] p-6 transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="text-white text-3xl mb-8"
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>

        <ul className="flex flex-col gap-4 text-white text-sm">
          <li>
            <div className="relative flex w-full rounded-full bg-white overflow-hidden h-7 border-2 border-blue-600">
              <div
                className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-blue-600 to-blue-500 transition-transform duration-350 ${
                  activeTab === "right" ? "translate-x-full" : "translate-x-0"
                }`}
              />
              {["left", "right"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    handleTabClick(tab);
                    setMenuOpen(false);
                  }}
                  className={`relative z-10 w-1/2 text-xs font-semibold py-1 ${
                    activeTab === tab ? "text-white" : "text-blue-900"
                  }`}
                >
                  {tab === "left" ? "Apply Job" : "Hire Now"}
                </button>
              ))}
            </div>
          </li>
          {["Home", "Updates", "FAQs", "Support"].map((item) => (
            <li
              key={item}
              className="border border-white text-center rounded-full py-1 cursor-pointer"
            >
              {item}
            </li>
          ))}
          <li
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="border border-white text-center rounded-full py-1 cursor-pointer"
          >
            Login
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
