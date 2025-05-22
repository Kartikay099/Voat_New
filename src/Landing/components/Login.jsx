import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OTPLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    } else {
      alert("Please enter your email to continue.");
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    alert(`OTP Verified: ${otp.join("")}`);
  };

  const handleTraditionalLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password to login.");
      return;
    }
    alert(`Logged in with email: ${email}`);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleResend = () => {
    alert("OTP Resent");
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#cfdcf1] to-blue-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
      >
        {/* Left Side Image */}
        <motion.div
          className="md:w-1/2 flex items-center justify-center bg-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7863.jpg?w=740"
            alt="OTP Illustration"
            className="w-full h-auto object-contain p-6"
          />
        </motion.div>

        {/* Right Side Form */}
        <motion.div
          className="md:w-1/2 p-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>

          <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              </div>
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Forgot Password Below Password */}
            <div className="mb-6 text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* OTP Section */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <div className="flex justify-center gap-2 mb-3">
                    {otp.map((digit, index) => (
                      <motion.input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center border border-gray-400 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        whileFocus={{ scale: 1.1 }}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Resend OTP
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            {step === 1 ? (
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleTraditionalLogin}
                  className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
                >
                  Login
                </button>
                <button
                  type="submit"
                  className="w-full bg-[#0f52ba] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Login with OTP
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#0f52ba] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Verify OTP
              </button>
            )}
          </form>

          {/* Register Link */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Not registered?</span>{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Register now
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
