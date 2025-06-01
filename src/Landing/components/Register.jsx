import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
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

  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [timer, setTimer] = useState(0);
  const [inputsDisabled, setInputsDisabled] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) {
      setInputsDisabled(false);
      return;
    }
    if (inputsDisabled) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, inputsDisabled]);

  const validateName = (name) => /^[a-zA-Z\s]{3,50}$/.test(name.trim());
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(password);
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

  const handleGetOtp = async (e) => {
    e.preventDefault();

    if (!validateName(name)) {
      toast.error("Invalid Name. Only alphabets and spaces allowed (3-50 chars).");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid Email format.");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be 8+ chars with uppercase, lowercase, digit, special char.");
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

      const { data } = await axios.post("http://localhost:3001/signup", formData);
      setTempToken(data.tempToken);
      toast.success("OTP sent! Please check your email.");
    } catch (error) {
      // Commented out for debugging OTP UI
      /*
      if (error.response?.data?.message) {
        toast.error(`Signup failed: ${error.response.data.message}`);
        return;
      } else {
        toast.error("Signup failed due to server error.");
        return;
      }
      */
      toast("Bypassing error temporarily for OTP screen...", { icon: "⚠️" });
    } finally {
      setLoading(false);
      setShowOtp(true);
      setAttemptsLeft(3);
      setOtp(new Array(6).fill(""));
    }
  };

  const handleOtpChange = (e, idx) => {
    if (inputsDisabled) return;
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (idx < 5) inputRefs.current[idx + 1].focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (inputsDisabled) return;
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
    if (inputsDisabled || loading) return;
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
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      if (error.response?.data?.message) {
        toast.error(`Incorrect OTP: ${error.response.data.message}`);
      } else {
        toast.error("Incorrect OTP.");
      }

      if (newAttempts <= 0) {
        setInputsDisabled(true);
        setTimer(60);
        toast.error("Too many failed attempts. Please wait 60 seconds.");
      }

      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
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
          {/* Show tabs ONLY if NOT on OTP page */}
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-blue-400 transition-colors duration-300"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-blue-400 transition-colors duration-300"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-gray-900 bg-white placeholder-blue-400 transition-colors duration-300"
                    placeholder="At least 8 chars, uppercase, lowercase, digit, special"
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 transition-colors duration-300"
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
                  {loading && (
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  )}
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
                className="w-full max-w-md text-center"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Enter OTP
                </h2>

                <p className="mb-4 text-gray-700">
                  {inputsDisabled
                    ? `Please wait ${timer}s before retrying`
                    : `You have ${attemptsLeft} attempt${attemptsLeft > 1 ? "s" : ""} left`}
                </p>

                <div className="flex justify-center space-x-2 mb-6">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, idx)}
                      onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      disabled={inputsDisabled}
                      className={`w-12 h-12 text-center text-xl border-2 rounded transition-all focus:outline-none focus:ring-2 ${
                        inputsDisabled
                          ? "border-gray-400 focus:ring-gray-400 cursor-not-allowed"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={inputsDisabled || loading}
                  className={`w-full py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${
                    inputsDisabled || loading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800"
}`}
>
{loading ? (
<Loader2 className="animate-spin inline mr-2" />
) : null}
Verify OTP
</button>

<div className="flex justify-between mt-4 w-full text-sm text-blue-600">
  <p
    onClick={() => {
      setShowOtp(false);
      setOtp(new Array(6).fill(""));
      setAttemptsLeft(3);
      setInputsDisabled(false);
    }}
    className="hover:underline cursor-pointer"
  >
     Back to Register
  </p>
  <p
    onClick={() => navigate("/login")}
    className="hover:underline cursor-pointer"
  >
    Go to Login 
  </p>
</div>

</motion.div>



)}
</AnimatePresence>
</div>
</motion.div>
</section>
);
}