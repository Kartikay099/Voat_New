import React, { useState } from "react";

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
    <div className="faq-container">
      <h1 className="text-3xl font-bold text-center faq-title">
        Frequently Asked Questions
      </h1>
      <div className="mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md faqs-items"
            style={{
              backgroundColor: activeIndex === i ? "#0B52C0" : "",
            }}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full text-left font-semibold text-gray-800 flex justify-between items-center"
              style={{
                color: activeIndex === i ? "#ffffff" : "",
              }}
            >
              {faq.q}
              <span className="text-lg">{activeIndex === i ? "−" : "+"}</span>
            </button>
            <div
              className={`faq-answer transition-all duration-300 ease-in-out ${
                activeIndex === i ? "open" : ""
              }`}
            >
              <p
                className="text-gray-600 text-sm mt-3"
                style={{
                  color: activeIndex === i ? "#e6e6e6" : "",
                }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}