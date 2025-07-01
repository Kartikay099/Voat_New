import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X (formerly Twitter)

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          
          {/* Logo & Social */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <img
              src="https://dummyimage.com/200x60/0b52c0/ffffff&text=Voat+Staffing"
              alt="Voat Staffing Logo"
              className="w-40 h-auto mb-4"
            />
            <p className="text-gray-400 text-sm mb-4">
              Empowering your career and hiring journey.<br />
              Connecting talent with opportunity.
            </p>
            <div className="flex space-x-3 mt-4 justify-center md:justify-start">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="bg-black hover:bg-gray-800 text-white rounded-full p-2 transition">
                <FaXTwitter size={18} />
              </a>
              <a href="#" className="bg-blue-700 hover:bg-blue-800 text-white rounded-full p-2 transition">
                <FaLinkedinIn size={18} />
              </a>
              <a href="#" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 transition">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Company</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Team</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Support</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="block text-gray-400">Email:</span>
                <a href="mailto:support@voatstaffing.com" className="hover:text-blue-400 transition">support@voatstaffing.com</a>
              </li>
              <li>
                <span className="block text-gray-400">Phone:</span>
                <a href="tel:+911234567890" className="hover:text-blue-400 transition">+91 12345 67890</a>
              </li>
              <li>
                <span className="block text-gray-400">Address:</span>
                <span>Hyderabad, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-4 text-center text-gray-500 text-xs">
          © 2025 Voat Staffing. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
