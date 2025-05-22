import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../utilits/apiUrl";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Register() {
  const [activeTab, setActiveTab] = useState("left");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTabClick = (direction) => {
    if (activeTab !== direction) setActiveTab(direction);
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", activeTab === "left" ? "user" : "hr");
    if (selectedFile) formData.append("file", selectedFile);

    try {
      const response = await axios.post(`${apiUrl}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response?.data?.message);
      setName("");
      setEmail("");
      setPassword("");
      setSelectedFile(null);
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#d4e4ff]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
      >
        {/* Left Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-1807.jpg"
            alt="Register"
            className="h-full w-full object-cover p-6"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-center text-2xl font-bold mb-6">
            Create an Account
          </h2>

          {/* Animated Toggle Switch */}
          <div className="flex justify-center mb-6 relative">
            <div className="flex bg-gray-100 rounded-full p-1 relative w-[200px]">
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-1/2 bg-blue-700 rounded-full z-0"
                animate={{ x: activeTab === "right" ? "100%" : "0%" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
              <button
                className={`w-1/2 relative z-10 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  activeTab === "left"
                    ? "text-white"
                    : "text-blue-700 hover:text-blue-800"
                }`}
                onClick={() => handleTabClick("left")}
              >
                User
              </button>
              <button
                className={`w-1/2 relative z-10 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  activeTab === "right"
                    ? "text-white"
                    : "text-blue-700 hover:text-blue-800"
                }`}
                onClick={() => handleTabClick("right")}
              >
                HR
              </button>
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value.replace(/[^a-z]/g, ""))
                }
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter username"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 pr-10"
                placeholder="Enter password"
              />
              <span
                className="absolute top-9 right-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <AnimatePresence>
              {activeTab === "left" && (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-4 overflow-hidden"
                >
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Upload File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 hover:bg-blue-800"
            >
              Sign Up
            </motion.button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Login here
              </Link>
            </p>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}

export default Register;
