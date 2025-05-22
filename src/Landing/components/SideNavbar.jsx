import { useEffect, useState } from "react";
import { Home, RefreshCw, Briefcase, HelpCircle, Phone } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "updates", label: "Updates" },
  { id: "jobs", label: "Jobs" },
  { id: "faqs", label: "FAQs" },
  { id: "contact", label: "Contact" },
];

const StickySidebarButtons = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isFooterVisible, setIsFooterVisible] = useState(false);

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

      const footer = document.getElementById("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setIsFooterVisible(footerRect.top < window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={`sidebar-buttons fixed top-1/4 left-4 flex flex-col gap-4 z-50 transition-opacity duration-300 ${
        isFooterVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`flex items-center justify-center py-2 w-32 rounded-full transition-all duration-200 ${
            activeSection === section.id
              ? "bg-[#0B52C0] text-white"
              : "hover:bg-[#f0f7ff] text-black border-2 border-[#0B52C0]"
          }`}
        >
          <span className="md:inline-block lg:hidden">{section.icon}</span>
          <span className="hidden lg:inline-block capitalize ml-2 text-center w-full">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default StickySidebarButtons;
