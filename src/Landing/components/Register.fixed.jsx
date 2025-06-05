import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { apiUrl } from "../../utilits/apiUrl";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
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
  const [loading, setLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);

  // Attempts logic
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [lockTimer, setLockTimer] = useState(0);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (lockTimer > 0) {
      const interval = setInterval(() => {
        setLockTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (lockTimer === 0 && attemptsLeft === 0) {
      // Reset attempts after lock time ends
      setAttemptsLeft(3);
    }
  }, [lockTimer, attemptsLeft]);

  const validateName = (name) => /^[a-zA-Z\s]{3,50}$/.test(name.trim());
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
      password
    );
  const validateFile = (file) => file && file.type === "application/pdf";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return setSelectedFile(null);
    if (!validateFile(file)) {
      toast.error("Please upload a valid PDF file.");
      e.target.value = null;
      return;
    }
    setSelectedFile(file);
  };

  const handleGetOtp = async (e, isResend = false) => {
    if (e) e.preventDefault();

    if (!validateName(name)) {
      toast.error(
        "Invalid Name. Only alphabets and spaces allowed (3-50 chars)."
      );
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid Email format.");
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, digit, special char."
      );
      return;
    }
    if (activeTab === "left" && !validateFile(selectedFile)) {
      toast.error("Please upload a valid PDF resume.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("password", password);
      formData.append("role", activeTab === "left" ? "jobseeker" : "hr");
      if (activeTab === "left") {
        formData.append("file", selectedFile);
      }

      const { data } = await axios.post(
        "http://localhost:3001/signup",
        formData
      );
      setTempToken(data.tempToken);
      toast.success(
        isResend ? "OTP resent!" : "OTP sent! Please check your email."
      );
    } catch (error) {
      toast.error("Failed to send OTP, please try again.");
      return;
    } finally {
      setLoading(false);
      setShowOtp(true);
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
      setResendTimer(60);
      // Reset attempts and lock on new OTP
      setAttemptsLeft(3);
      setLockTimer(0);
    }
  };

  const handleOtpChange = (e, idx) => {
    if (lockTimer > 0) return; // disable input if locked
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (idx < 5) inputRefs.current[idx + 1].focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (lockTimer > 0) return; // disable input if locked
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        inputRefs.current[idx - 1].focus();
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (lockTimer > 0) {
      toast.error(`Too many attempts. Please wait ${lockTimer}s.`);
      return;
    }
    if (otp.includes("")) {
      toast.error("Please enter complete OTP.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3001/verify-otp", {
        email,
        otp: otp.join(""),
        tempToken,
        type: "signup",
      });

      toast.success("OTP verified! Account created.");
      setShowOtp(false);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      // Wrong OTP case
      setAttemptsLeft((prev) => prev - 1);
      toast.error(
        `Incorrect OTP. Attempts left: ${
          attemptsLeft - 1 > 0 ? attemptsLeft - 1 : 0
        }`
      );
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();

      if (attemptsLeft - 1 <= 0) {
        setLockTimer(60); // lock for 60 seconds
        toast.error("Too many wrong attempts. Please wait 60 seconds.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-100 transition-colors duration-500">
      <Toaster position="top-right" />

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
          {!showOtp && (
            <div className="mb-6 flex justify-center w-full max-w-md">
              <div className="flex bg-gray-100 rounded-full p-1 relative w-[200px]">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 w-1/2 bg-blue-500 center rounded-full z-0"
                  animate={{ x: activeTab === "right" ? "100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button
                  className={`w-1/2 relative z-10 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                    activeTab === "left"
                      ? "bg-blue-500 text-white"
                      : "text-blue-600"
                  }`}
                  onClick={() => setActiveTab("left")}
                >
                  User
                </button>
                <button
                  className={`w-1/2 relative z-10 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                    activeTab === "right"
                      ? "bg-blue-500 text-white"
                      : "text-blue-600"
                  }`}
                  onClick={() => setActiveTab("right")}
                >
                  HR
                </button>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!showOtp ? (
              <motion.form
                key="signup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-4"
                onSubmit={handleGetOtp}
              >
                <h2 className="text-center text-2xl font-bold mb-6 text-gray-900">
                  Create an Account
                </h2>

                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      if (/^[a-zA-Z\s]*$/.test(e.target.value))
                        setName(e.target.value);
                    }}
                    maxLength={50}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-blue-400"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={100}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-blue-400"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="relative">
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    maxLength={30}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-m text-gray-900  placeholder-blue-400 bg-white"
                    placeholder="Min 8 chars with upper, lower, digit & special"
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
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      Upload Resume (PDF)
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
                    />
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className={`w-full font-semibold py-2 rounded-lg transition duration-300 flex items-center justify-center ${
                    loading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 text-white"
                  }`}
                >
                  {loading && <Loader2 className="animate-spin mr-2 h-5 w-5" />}
                  Get OTP
                </motion.button>

                <p
                  onClick={() => navigate("/login")}
                  className="text-center hover:underline cursor-pointer"
                >
                  Go to Login Page
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md flex flex-col items-center"
              >
                <h2 className="text-center text-2xl font-bold mb-6 text-gray-900">
                  Enter OTP
                </h2>

                <div className="flex space-x-2 mb-4">
                  {otp.map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(e, idx)}
                      onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      disabled={loading || lockTimer > 0}
                      ref={(el) => (inputRefs.current[idx] = el)}
                      className={`w-10 h-12 text-center text-lg border rounded-md ${
                        lockTimer > 0
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  ))}
                </div>

                {lockTimer > 0 && (
                  <p className="mb-4 text-red-600 font-semibold">
                    Too many wrong attempts. Please wait {lockTimer}s.
                  </p>
                )}

                <motion.button
                  onClick={handleVerifyOtp}
                  disabled={loading || lockTimer > 0}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full font-semibold py-2 rounded-lg transition duration-300 flex items-center justify-center ${
                    loading || lockTimer > 0
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 text-white"
                  }`}
                >
                  {loading && <Loader2 className="animate-spin mr-2 h-5 w-5" />}
                  Verify OTP
                </motion.button>

                <p className="mt-4 text-gray-600">
                  Didn't receive OTP?{" "}
                  <button
                    onClick={(e) => {
                      if (resendTimer === 0 && !loading) handleGetOtp(e, true);
                    }}
                    disabled={resendTimer !== 0 || loading}
                    className={`text-blue-600 underline cursor-pointer ${
                      resendTimer !== 0
                        ? "cursor-not-allowed text-gray-400"
                        : ""
                    }`}
                  >
                    Resend OTP {resendTimer > 0 && `(${resendTimer}s)`}
                  </button>
                </p>

                <p
                  onClick={() => {
                    setShowOtp(false);
                    setOtp(new Array(6).fill(""));
                    setAttemptsLeft(3);
                    setLockTimer(0);
                  }}
                  className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  Back to Signup
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
