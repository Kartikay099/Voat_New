import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "What is a staffing agency?",
    a: "A staffing agency helps companies find and hire temporary, permanent, or contract-based employees.",
  },
  {
    q: "How does the hiring process work?",
    a: "We screen, interview, and match candidates with your requirements, saving you time and effort.",
  },
  {
    q: "Do you handle payroll for placed candidates?",
    a: "Yes, for temp and contract hires, we manage payroll, taxes, and compliance.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We serve IT, healthcare, finance, engineering, and more.",
  },
  {
    q: "Can I hire someone permanently from a temp placement?",
    a: "Absolutely. Many of our clients convert temp hires into full-time employees.",
  },
  {
    q: "How long does it take to fill a position?",
    a: "Most roles are filled within 3–10 business days, depending on complexity.",
  },
  {
    q: "Is there a replacement guarantee?",
    a: "Yes, if a placement doesn't work out, we offer a free replacement period.",
  },
  {
    q: "Do you provide background checks?",
    a: "Yes, all candidates undergo background checks as part of our screening process.",
  },
  {
    q: "How do you ensure candidate quality?",
    a: "We use skills testing, behavioral interviews, and reference verification.",
  },
  {
    q: "Is there a fee for job seekers?",
    a: "No, our services are completely free for job seekers.",
  },
];

export default function FAQsPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <div className="p-8 max-w-screen-2xl mx-auto"> {/* Badha di max-width */}
      <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-12">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`rounded-3xl shadow-lg border transition-all duration-300 ${
              activeIndex === i
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-white text-blue-900 hover:bg-blue-50 border-gray-200"
            }`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center text-lg font-semibold p-6 focus:outline-none"
            >
              <span>{faq.q}</span>
              <motion.div
                animate={{ rotate: activeIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeIndex === i ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {activeIndex === i && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden px-6 pb-6"
                >
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-base leading-relaxed"
                  >
                    {faq.a}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
