import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OTPLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [attemptsLeftLogin, setAttemptsLeftLogin] = useState(3);
  const [attemptsLeftOTP, setAttemptsLeftOTP] = useState(3);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [freezeTimerLogin, setFreezeTimerLogin] = useState(0);
  const [freezeTimerOTP, setFreezeTimerOTP] = useState(0);

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Resend OTP cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const interval = setInterval(() => setResendCooldown((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendCooldown]);

  // Freeze timer countdown for login
  useEffect(() => {
    if (freezeTimerLogin > 0) {
      const interval = setInterval(() => {
        setFreezeTimerLogin((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (freezeTimerLogin === 0 && attemptsLeftLogin === 0) {
      setAttemptsLeftLogin(3);
    }
  }, [freezeTimerLogin]);

  // Freeze timer countdown for OTP
  useEffect(() => {
    if (freezeTimerOTP > 0) {
      const interval = setInterval(() => {
        setFreezeTimerOTP((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (freezeTimerOTP === 0 && attemptsLeftOTP === 0) {
      setAttemptsLeftOTP(3);
    }
  }, [freezeTimerOTP]);

  const showToast = (type, message) => setToast({ type, message });

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
      setErrorMsg("");
      setAttemptsLeftOTP(3); // Reset OTP attempts on new send
      showToast("success", "OTP sent to your email.");
      setResendCooldown(30);
    } else {
      setErrorMsg("Please enter your email to continue.");
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (freezeTimerOTP > 0) {
      setErrorMsg(`Please wait ${freezeTimerOTP}s before trying OTP again.`);
      return;
    }
    if (otp.join("").length < 6) {
      setErrorMsg("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate OTP check; let's say OTP = "123456" is correct
      if (otp.join("") === "123456") {
        alert(`OTP Verified: ${otp.join("")}`);
        setAttemptsLeftOTP(3);
        setErrorMsg("");
      } else {
        const remaining = attemptsLeftOTP - 1;
        setAttemptsLeftOTP(remaining);
        if (remaining <= 0) {
          setErrorMsg("Too many failed OTP attempts. Try again in 60 seconds.");
          setFreezeTimerOTP(60);
        } else {
          setErrorMsg(`Incorrect OTP. ${remaining} attempt(s) left.`);
        }
      }
    }, 1500);
  };

  const handleTraditionalLogin = (e) => {
    e.preventDefault();
    if (freezeTimerLogin > 0) {
      setErrorMsg(`Please wait ${freezeTimerLogin}s before trying login again.`);
      return;
    }
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (password === "admin123") {
        alert(`Logged in with email: ${email}`);
        setAttemptsLeftLogin(3);
        setErrorMsg("");
      } else {
        const remaining = attemptsLeftLogin - 1;
        setAttemptsLeftLogin(remaining);
        if (remaining <= 0) {
          setErrorMsg("Too many failed attempts. Try again in 60 seconds.");
          setFreezeTimerLogin(60);
        } else {
          setErrorMsg(`Incorrect password. ${remaining} attempt(s) left.`);
        }
      }
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
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
    if (resendCooldown > 0) return;
    showToast("success", "OTP resent.");
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
    setResendCooldown(30);
    setAttemptsLeftOTP(3); // Reset OTP attempts on resend
  };

  const handleForgotPassword = () => navigate("/forgot-password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#bfdbfe] via-[#a5b4fc] to-[#93c5fd] p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
      >
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

        <motion.div
          className="md:w-1/2 p-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

          {errorMsg && (
            <div className="mb-4 text-sm text-red-600 font-medium bg-red-100 border border-red-300 p-2 rounded">
              {errorMsg}
            </div>
          )}

          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-4 p-3 rounded text-white font-medium text-center ${
                  toast.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {toast.message}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (step === 2) {
                      setStep(1);
                      setOtp(Array(6).fill(""));
                      setErrorMsg("");
                      setAttemptsLeftOTP(3);
                      setFreezeTimerOTP(0);
                    }
                  }}
                  required
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              </div>
            </div>

            {step === 1 && (
              <>
                <div className="mb-2 relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg("");
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="mb-6 text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-blue-600 hover:underline text-sm font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
              </>
            )}

            <AnimatePresence>
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
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
                        disabled={freezeTimerOTP > 0}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || freezeTimerOTP > 0}
                      className={`text-blue-600 hover:underline text-sm ${
                        resendCooldown > 0 || freezeTimerOTP > 0 ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      {freezeTimerOTP > 0
                        ? `Wait ${freezeTimerOTP}s to resend OTP`
                        : resendCooldown > 0
                        ? `Resend OTP in ${resendCooldown}s`
                        : "Resend OTP"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step === 1 ? (
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleTraditionalLogin}
                  disabled={attemptsLeftLogin <= 0 || loading || freezeTimerLogin > 0}
                  className={`w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300 ${
                    loading || freezeTimerLogin > 0 ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading && (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {freezeTimerLogin > 0 ? `Try again in ${freezeTimerLogin}s` : "Login"}
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Login with OTP
                </button>
              </div>
            ) : (
              <button
                type="submit"
                disabled={freezeTimerOTP > 0 || loading}
                className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ${
                  freezeTimerOTP > 0 || loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></span>
                ) : freezeTimerOTP > 0 ? (
                  `Try again in ${freezeTimerOTP}s`
                ) : (
                  "Verify OTP"
                )}
              </button>
            )}
          </form>

          <div className="text-center mt-4">
            <span
      onClick={() => navigate('/register')}
      className="text-blue-600 hover:underline text-m text-semibold font-medium cursor-pointer"
    >
      Go to Register now
    </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
