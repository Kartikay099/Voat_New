import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      return;
    }
    setError("");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-[#f9fafc] flex flex-col items-center animate-fadeIn">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Contact <span className="text-blue-600">Us</span>
      </h1>

      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4 animate-slideUp">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Submit
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {isSubmitted && !error && (
            <p className="text-green-600">Submitted successfully!</p>
          )}
        </form>

        <div className="rounded-md overflow-hidden shadow-md animate-slideUp delay-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3309788625803!2d78.37717691466714!3d17.445604788030075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91693eb085dd%3A0x4edc387e6d7369d!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1617819348333!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
            style={{ minHeight: "300px" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
