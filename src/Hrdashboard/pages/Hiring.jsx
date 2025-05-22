import { useState } from 'react';

export default function HRJobsDashboard() {
  // Mock data for all jobs
  const [allJobs, setAllJobs] = useState([
    { id: 1, title: "Job1", status: "Active - Hiring", applications: 1500 },
    { id: 2, title: "Job2", status: "Active - Reviewing", applications: 2000 },
    { id: 3, title: "Job3", status: "Closed - Filled", applications: 1800 },
    { id: 4, title: "Job4", status: "Active - Hiring", applications: 2200 },
    { id: 5, title: "Job5", status: "Draft", applications: 0 },
    { id: 6, title: "Job6", status: "Active - Reviewing", applications: 1900 },
    { id: 7, title: "Job7", status: "Closed - Filled", applications: 2100 },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="p-6 h-[calc(100vh-48px)]">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Left Box - Job Listings (scrollable) */}
        <div className="bg-white rounded-xl p-6 flex-1 overflow-y-auto">
          <div className="space-y-5 mb-6">
            {currentJobs.map((job) => (
              <div key={job.id} className="flex justify-between items-center bg-gray-50 rounded-xl p-5 hover:shadow-sm transition-all">
                {/* Job Title - Takes 70% width */}
                <div className="w-[70%]">
                  <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                </div>
                
                {/* Status and Action - Fixed 30% width */}
                <div className="w-[30%] flex flex-col space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">{job.status}</p>
                    <p className="text-base font-medium text-gray-800">
                      {job.applications.toLocaleString()} Apps
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    View Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, allJobs.length)} of {allJobs.length} jobs
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Box - Analytics (fixed and smaller) */}
        <div className="bg-white rounded-xl p-6 w-full lg:w-[25%] h-[calc(100vh-96px)] lg:h-auto lg:sticky lg:top-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Job Analytics</h2>
          <div className="flex-1 grid place-items-center bg-gray-50 rounded-lg mb-4">
            <p className="text-gray-400 text-center p-4">Visual charts and metrics will appear here</p>
          </div>
          
          {/* Vertical Action Buttons */}
          <div className="space-y-3">
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              View All Applicants
            </button>
            <button className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium transition-colors">
              Manage Reminders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}