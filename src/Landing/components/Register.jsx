import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("left");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [tempToken, setTempToken] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isLocked, setIsLocked] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(0);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (lockCountdown > 0) {
      const timerId = setTimeout(() => setLockCountdown(lockCountdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (lockCountdown === 0 && isLocked) {
      setIsLocked(false);
      setAttemptsLeft(3);
      toast.success("You can try registering again.");
    }
  }, [lockCountdown, isLocked]);

  const handleTabClick = (direction) => {
    if (!isLocked) setActiveTab(direction);
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleValidateClick = async (e) => {
    e.preventDefault();
    if (isLocked) {
      toast.error(`Too many attempts. Please wait ${lockCountdown} seconds.`);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", activeTab === "left" ? "jobseeker" : "hr");
      if (activeTab === "left") {
        formData.append("file", selectedFile);
      }

      const response = await axios.post("http://localhost:3001/signup", formData);

      const tempKey = Object.keys(response.data.tempToken)[0];
      setTempToken(tempKey);
      setShowOtp(true);
      setOtpError(false);
      toast.success("Signup successful! Please verify OTP.");

      setAttemptsLeft(3);
    } catch (err) {
      setAttemptsLeft((prev) => prev - 1);
      if (attemptsLeft - 1 <= 0) {
        setIsLocked(true);
        setLockCountdown(60);
        toast.error("Too many failed attempts. Try again in 60 seconds.");
      } else {
        toast.error(err.response?.data?.error || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post("http://localhost:3001/verify-otp", {
        email,
        otp: otp.join(""),
        tempToken,
        type: "signup",
      });

      toast.success("OTP Verified! Account created.");
      setShowOtp(false);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setOtpError(true);
      toast.error("Incorrect OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-100 transition-colors duration-500">
      <Toaster position="top-right" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden bg-white"
      >
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-1807.jpg"
            alt="Register"
            className="h-full w-full object-cover p-6"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
          <div className="mb-6 flex justify-between w-full max-w-md">
            <div className="flex bg-gray-100 rounded-full p-1 relative w-[200px]">
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-1/2 bg-blue-500 center rounded-full z-0 "
                animate={{ x: activeTab === "right" ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                disabled={isLocked}
                className={`w-1/2 relative z-10 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  activeTab === "left"
                    ? "bg-blue-500 text-white"
                    : "text-blue-600"
                }`}
                onClick={() => handleTabClick("left")}
              >
                User
              </button>
              <button
                disabled={isLocked}
                className={`w-1/2 relative z-10 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  activeTab === "right"
                    ? "bg-blue-500 text-white"
                    : "text-blue-600"
                }`}
                onClick={() => handleTabClick("right")}
              >
                HR
              </button>
            </div>

            {!showOtp && (
              <div className="text-sm text-gray-700">
                Attempts Left: <span className="font-bold">{attemptsLeft}</span>
              </div>
            )}

            {isLocked && (
              <div className="text-sm text-red-400 font-semibold ml-4">
                Locked: {lockCountdown}s
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!showOtp ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                <h2 className="text-center text-2xl font-bold mb-6 text-gray-900">
                  Create an Account
                </h2>

                <form onSubmit={handleValidateClick} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value.replace(/[^a-z]/gi, ""))
                      }
                      required
                      disabled={isLocked}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 transition-colors duration-300"
                      placeholder="Enter username"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLocked}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 transition-colors duration-300"
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="relative">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLocked}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-gray-900 bg-white placeholder-gray-400 transition-colors duration-300"
                      placeholder="Enter password"
                    />
                    <span
                      className="absolute top-9 right-3 cursor-pointer text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>

                  {activeTab === "left" && (
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Upload Resume (PDF)
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        required
                        disabled={isLocked}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 transition-colors duration-300"
                      />
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading || isLocked}
                    className={`w-full font-semibold py-2 rounded-lg transition duration-300 flex items-center justify-center ${
                      loading || isLocked
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-800 text-white"
                    }`}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    ) : null}
                    Get OTP
                  </motion.button>

                  <p className="text-center text-sm mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 300 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 300 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl shadow-lg w-full max-w-sm bg-white"
              >
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
                  Enter OTP
                </h3>
                <div className="flex justify-center space-x-2 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className={`w-12 h-12 text-center text-xl border-2 rounded transition-all focus:outline-none focus:ring-2 ${
                        otpError
                          ? "border-red-400 focus:ring-red-400"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      disabled={loading}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={handleOtpVerify}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className={`w-full py-2 rounded-lg font-semibold ${
                    loading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 text-white"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2 h-5 w-5 inline" />
                  ) : (
                    "Verify OTP"
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

export default Register;
