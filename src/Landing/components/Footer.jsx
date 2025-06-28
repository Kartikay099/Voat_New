const Footer = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
        
        {/* Left: Copyright - Same as original */}
        <div className="text-sm text-center md:text-left">
          © 2025 Voat Staffing. All rights reserved.
        </div>

        {/* Center: Links - Adjusted for mobile */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          <a href="#" className="hover:underline whitespace-nowrap">Terms of Service</a>
          <span className="text-gray-500 hidden md:inline">|</span>
          <a href="#" className="hover:underline whitespace-nowrap">Privacy Policy</a>
          <span className="text-gray-500 hidden md:inline">|</span>
          <a href="#" className="hover:underline whitespace-nowrap">Contact Us</a>
        </div>

        {/* Right: Social Media - Same spacing as original */}
        <div className="text-sm text-center md:text-right flex flex-wrap justify-center items-center gap-x-2">
          <span className="text-gray-400 whitespace-nowrap">Follow us on:</span>
          <a href="#" className="text-blue-400 hover:underline whitespace-nowrap">Facebook</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="text-blue-400 hover:underline whitespace-nowrap">Twitter</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="text-blue-400 hover:underline whitespace-nowrap">LinkedIn</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="text-blue-400 hover:underline whitespace-nowrap">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;