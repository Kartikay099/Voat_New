import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "home", label: "Home" },
  { id: "updates", label: "Announcements" },
  { id: "jobs", label: "Jobs" },
  { id: "faqs", label: "FAQs" },
  { id: "contact", label: "Contact" },
];

const StickySidebarButtons = () => {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toggle, setToggle] = useState("apply"); // 'apply' or 'hire'
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = "";
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const { top, height } = el.getBoundingClientRect();
          const sectionTop = window.scrollY + top;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + height
          ) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSectionMobile = (id) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogin = () => {
    setMobileOpen(false);
    navigate("/login");
  };

  const handleApply = () => {
    setToggle("apply");
    setTimeout(() => {
      setMobileOpen(false);
      navigate("/profile");
    }, 800); // 1 second delay before redirect
  };

  const handleHire = () => {
    setToggle("hire");
    setTimeout(() => {
      setMobileOpen(false);
      navigate("hire/hrprofile");
    }, 800); // 1 second delay before redirect
  };

  // Enhanced toggle button with bouncy animation
  const toggleButtonMobile = (
    <div className="relative flex w-full rounded-full bg-white overflow-hidden h-10 border-2 border-blue-600 mb-6">
      {/* Sliding background with bounce effect */}
      <div
        className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
          toggle === "hire" ? "translate-x-full" : "translate-x-0"
        }`}
        style={{ left: '-2px' }}
      />
      <button
        onClick={handleApply}
        className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors duration-300 ${
          toggle === "apply" ? "text-white" : "text-blue-900 hover:text-blue-700"
        }`}
      >
        Apply Job
      </button>
      <button
        onClick={handleHire}
        className={`relative z-10 w-1/2 py-2 text-sm font-semibold transition-colors duration-300 ${
          toggle === "hire" ? "text-white" : "text-blue-900 hover:text-blue-700"
        }`}
      >
        Hire Now
      </button>
    </div>
  );

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-[#0B52C0] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect y="4" width="24" height="2" rx="1" fill="currentColor"/>
          <rect y="11" width="24" height="2" rx="1" fill="currentColor"/>
          <rect y="18" width="24" height="2" rx="1" fill="currentColor"/>
        </svg>
      </button>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)}></div>
          <aside className="relative w-64 h-full bg-white p-6 flex flex-col shadow-2xl animate-slideInLeft">
            <button 
              className="self-end mb-6 text-gray-500 hover:text-gray-700 hover:scale-110 transition-transform duration-200"
              onClick={() => setMobileOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {toggleButtonMobile}
            
            <div className="flex flex-col gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSectionMobile(section.id)}
                  className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                    activeSection === section.id
                      ? "bg-[#0B52C0] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full py-3 px-4 mt-6 rounded-lg border border-[#0B52C0] text-sm font-medium text-[#0B52C0] hover:bg-gray-50 hover:scale-[1.02] transition-all duration-300 shadow-sm"
            >
              Login
            </button>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed top-16 left-0 w-44 h-[calc(100vh-15rem)] bg-[#f5faff] border-r border-none z-40 flex flex-col justify-center items-center hidden md:flex">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-36 py-2 rounded-full text-sm font-medium shadow transition-all duration-300 hover:scale-[1.03] ${
                activeSection === section.id
                  ? "bg-[#0B52C0] text-white shadow-md"
                  : "bg-white text-[#0B52C0] border border-[#0B52C0] hover:bg-[#e0efff] shadow-sm"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </aside>
      
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  );
};

export default StickySidebarButtons;