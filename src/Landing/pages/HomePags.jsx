import React from "react";

function HomePags() {
  return (
    <div className="home-page-container flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold underline">
        This Platform make easy to <br />
        <span> find job & Hire Job </span>
      </h1>
      <div
        className="bg-white p-4 shadow-sm border-b border-gray-200 w-full rounded"
        style={{ padding: "1rem", marginBottom: "2rem" }}
      >
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
              className="absolute left-3 top-3 text-black"
              size={20}
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
            </svg>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="rating-container w-full">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/boy-working-on-creative-building-website-front-page-illustration-download-in-svg-png-gif-file-formats--design-web-template-layout-agency-activity-pack-business-illustrations-9890601.png?f=webp"
          alt="search-png"
          width="400px"
        />
        <div className="flex flex-wrap gap-10 items-center justify-center text-white p-4">
          <div className="flex flex-col bg-gray-400 items-center justify-center text-center rounded h-32">
            <h2 style={{ color: "#ffffff", fontWeight: "bold" }}>2k+</h2>
            <p className="w-32">Qualified Candidates</p>
          </div>
          <div className="flex flex-col bg-gray-400 items-center justify-center text-center rounded h-32">
            <h2 style={{ color: "#ffffff", fontWeight: "bold" }}>2k+</h2>
            <p className="w-32">Qualified Candidates</p>
          </div>
          <div className="flex flex-col bg-gray-400 items-center justify-center text-center rounded h-32">
            <h2 style={{ color: "#ffffff", fontWeight: "bold" }}>2k+</h2>
            <p className="w-32">Qualified Candidates</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePags;
