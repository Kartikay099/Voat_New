import React, { useState, useEffect } from "react";

function HomePags() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://cdni.iconscout.com/illustration/premium/thumb/boy-working-on-creative-building-website-front-page-illustration-download-in-svg-png-gif-file-formats--design-web-template-layout-agency-activity-pack-business-illustrations-9890601.png?f=webp",
    "https://cdni.iconscout.com/illustration/premium/thumb/recruitment-process-illustration-9890602.png?f=webp",
    "https://cdni.iconscout.com/illustration/premium/thumb/job-interview-illustration-9890603.png?f=webp",
    "https://cdni.iconscout.com/illustration/premium/thumb/team-collaboration-illustration-9890604.png?f=webp",
    "https://cdni.iconscout.com/illustration/premium/thumb/career-growth-illustration-9890605.png?f=webp"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page-container flex flex-col items-center min-h-screen bg-[#f5faff]">
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl text-center font-bold mb-8">
          This Platform make easy to <br />
          <span className="text-blue-600"> find job & Hire Job </span>
        </h1>
        
        <div className="bg-white p-6 shadow-lg rounded-lg mb-12">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              >
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Job title, keywords, or company"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Experience level"
              />
            </div>
            <div className="flex-1 relative">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-width="2"
                  d="M12,22 C12,22 4,16 4,10 C4,5 8,2 12,2 C16,2 20,5 20,10 C20,16 12,22 12,22 Z M12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 L12,13 Z"
                ></path>
              </svg>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Location"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
              style={{ padding: "0.5rem 1.5rem" }}
            >
              Search jobs
            </button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-[400px] h-[400px] bg-[#f5faff] rounded-lg">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Professional Staffing Illustration ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-in-out ${
                    currentImageIndex === index 
                      ? 'opacity-100 scale-100 rotate-0' 
                      : 'opacity-0 scale-95 rotate-1'
                  }`}
                  style={{ 
                    backgroundColor: 'transparent',
                    filter: 'brightness(1.05) contrast(1.05)',
                    mixBlendMode: 'multiply',
                    transformOrigin: 'center center',
                    willChange: 'transform, opacity'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">2k+</h2>
              <p className="text-gray-600">Qualified Candidates</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">500+</h2>
              <p className="text-gray-600">Active Jobs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">100+</h2>
              <p className="text-gray-600">Companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePags;
