import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../header/Header";

const MobileSidebarContent = ({ setSidebarOpen }) => {
  const pathname = useLocation();
  const [currentPath, setCurrentPath] = useState(pathname.pathname);

  useEffect(() => {
    setCurrentPath(pathname.pathname);
  }, [pathname]);

  return (
    <>
      <div className="p-4 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border-4 border-blue-100">
            <User size={48} className="text-[#0F52BA]" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Shivam Dubey
        </h2>
        <p className="text-gray-500 text-xs text-center">
          Computer Science Student
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto pb-1 px-1 space-y-1">
        {navItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <div
              onClick={() => {
                setCurrentPath(item.path);
                setSidebarOpen(false);
              }}
              className={`flex items-center p-3 rounded-lg hover:bg-[#1565C0] hover:text-white transition-all ${
                currentPath === item.path ? "bg-[#0F52BA] text-white" : "text-gray-700"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default MobileSidebarContent;
