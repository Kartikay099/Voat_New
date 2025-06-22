import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "What is a staffing agency?",
    a: "We connect companies with skilled professionals for temporary, permanent, or contract roles.",
  },
  {
    q: "How does the hiring process work?",
    a: "We screen, interview, and match qualified candidates to your specific job requirements.",
  },
  {
    q: "Do you handle payroll for placed candidates?",
    a: "Yes, we manage payroll, taxes, and benefits for temporary and contract-based employees.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We specialize in IT, healthcare, finance, engineering, and several other major industries.",
  },
  {
    q: "Can I hire someone permanently from a temp placement?",
    a: "Yes, you can hire a temporary employee full-time after evaluating their performance on the job.",
  },
  {
    q: "How long does it take to fill a position?",
    a: "Most roles are filled within 3–10 business days, depending on the position's complexity.",
  },
  {
    q: "Is there a replacement guarantee?",
    a: "Yes, we offer a replacement guarantee if a candidate does not meet your expectations.",
  },
  {
    q: "Do you provide background checks?",
    a: "Yes, we conduct comprehensive background, employment, and reference checks for all candidates.",
  },
  {
    q: "How do you ensure candidate quality?",
    a: "We use a multi-step process, including skills testing, interviews, and reference checks.",
  },
  {
    q: "Is there a fee for job seekers?",
    a: "No, our services are always 100% free for job seekers.",
  },
];

const slideVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    height: 0
  },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1], // Custom easing for smooth motion
      height: {
        duration: 0.4
      },
      opacity: {
        duration: 0.3,
        delay: 0.1
      }
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    height: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function FAQsPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <div className="p-8 max-w-screen-2xl mx-auto">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-extrabold text-blue-700 mb-4"
        >
        Frequently Asked Questions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-gray-600 text-lg max-w-3xl mx-auto"
        >
          Find answers to common questions about our staffing services, hiring process, and how we can help your organization find the perfect talent match.
        </motion.p>
      </div>

      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={`rounded-3xl shadow-lg border transition-all duration-500 ease-in-out transform ${
              activeIndex === i
                ? "bg-blue-600 text-white border-blue-700 scale-[1.02] shadow-2xl"
                : "bg-white text-blue-900 hover:bg-blue-50 border-gray-200 hover:scale-[1.01] hover:shadow-xl"
            }`}
            whileHover={{ 
              y: activeIndex === i ? 0 : -2,
              transition: { duration: 0.2 }
            }}
          >
            <motion.button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center text-lg font-semibold p-6 focus:outline-none"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span>{faq.q}</span>
              <motion.div
                animate={{ 
                  rotate: activeIndex === i ? 180 : 0
                }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.33, 1, 0.68, 1]
                }}
                whileHover={{ scale: 1.1 }}
              >
                {activeIndex === i ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
            <AnimatePresence initial={false}>
              {activeIndex === i && (
                <motion.div
                  key="content"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-base leading-relaxed">
                    {faq.a}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
