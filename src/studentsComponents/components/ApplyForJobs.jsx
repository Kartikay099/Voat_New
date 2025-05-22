import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import {
  Search,
  MapPin,
  ChevronDown,
  X,
  Bookmark,
  Clock,
  Briefcase,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { mockJobs } from "../../utilits/mockJobs";
import { useUserJobContext } from "../contexts/UserJobContext";
import ViewJob from "./sideBar/Viewjob";

function ApplyForJobs() {
  // Get context
  const {
    jobs,
    setJobs,
    savedJobs,
    setSavedJobs,
    toggleSaveJob,
    filteredJobs,
    setFilteredJobs,
    searchRole,
    setSearchRole,
    searchExperience,
    setSearchExperience,
    searchLocation,
    setSearchLocation,
    datePosted,
    setDatePosted,
    urgentOnly,
    setUrgentOnly,
    activeFilters,
    setActiveFilters,
    currentPage,
    setCurrentPage,
    getDaysAgo,
    selectedJob,
    setSelectedJob,
  } = useUserJobContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const JOBS_PER_PAGE = 10;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load mock jobs data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 800);
  }, [setJobs, setFilteredJobs]);

  // Filter jobs based on search criteria
  useEffect(() => {
    let results = [...jobs];

    // Filter by role/company
    if (searchRole) {
      const searchTerm = searchRole.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by experience
    if (searchExperience) {
      results = results.filter((job) =>
        job.experience.toLowerCase().includes(searchExperience.toLowerCase())
      );
    }

    // Filter by location
    if (searchLocation) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Filter by date posted
    const now = new Date();
    if (datePosted !== "All") {
      const days = {
        "Last 24 hours": 1,
        "Last 3 days": 3,
        "Last 7 days": 7,
      }[datePosted];

      results = results.filter((job) => {
        const jobDate = new Date(job.postedDate);
        const diffTime = Math.abs(now - jobDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
      });
    }

    // Filter urgent jobs
    if (urgentOnly) {
      results = results.filter((job) => job.isUrgent);
    }

    setFilteredJobs(results);
    setCurrentPage(1);
  }, [
    jobs,
    searchRole,
    searchExperience,
    searchLocation,
    datePosted,
    urgentOnly,
    setFilteredJobs,
    setCurrentPage,
  ]);

  // Helper functions
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchRole("");
    setSearchExperience("");
    setSearchLocation("");
  };

  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filterToRemove) => {
    setActiveFilters(
      activeFilters.filter((filter) => filter !== filterToRemove)
    );
  };

  const clearAllFilters = () => {
    setSearchRole("");
    setSearchExperience("");
    setSearchLocation("");
    setActiveFilters([]);
    setDatePosted("All");
    setUrgentOnly(false);
  };

  const handleJobClick = (job) => setSelectedJob(job);

  // Pagination
  const indexOfLastJob = currentPage * JOBS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Render job details view
  if (selectedJob) {
    return <Outlet />;
  }
  // Render job listing view
  <ViewJob/> 
  return (

    <div className="flex">
      <Header />
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-25 max-w-[1800px] mx-auto p-2 h-screen flex flex-col">
        <div className="flex flex-col h-screen">
          {/* Search header */}
          <div className="bg-white p-4 shadow-sm border-b border-gray-200">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
  type="text"
  value={searchRole}
  onChange={(e) => setSearchRole(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission / page refresh
      handleSearch();
    }
  }}
  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Job title, keywords, or company"
  style={{ paddingLeft: "2.5rem" }}
/>
              </div>
              <div className="flex-1 relative">
               <input
  type="text"
  value={searchExperience}
  onChange={(e) => setSearchExperience(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Stop form from submitting
      handleSearch();
      
    }
  }}
  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Experience level"
/>

              </div>
              <div className="flex-1 relative">
                <MapPin
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Location"
                  style={{ paddingLeft: "2.5rem" }}
                  onKeyDown={(e) => {
  if (e.key === 'Enter') e.preventDefault();
handleSearch();
}}
                />
              </div>
                
            <button
  type="button"
  onSubmit={(e) => e.preventDefault()}
  // onClick={handleSearch} // your custom search function
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
>
  Search jobs
</button>
            </form>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {!isMobile && (
              <div className="w-64 bg-white p-4 border-r border-gray-200 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-700">Date posted</h3>
                      <ChevronDown size={16} className="text-gray-500" />
                    </div>
                    <div className="space-y-2">
                      {[
                        "All",
                        "Last 24 hours",
                        "Last 3 days",
                        "Last 7 days",
                      ].map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="date"
                            checked={datePosted === option}
                            onChange={() => setDatePosted(option)}
                            className="accent-blue-600"
                          />
                          <span className="text-sm text-gray-700">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-700">
                        Urgently hiring
                      </h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={urgentOnly}
                          onChange={() => setUrgentOnly(!urgentOnly)}
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-gray-600">
                    Showing {indexOfFirstJob + 1} -{" "}
                    {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
                    {filteredJobs.length} job
                    {filteredJobs.length !== 1 ? "s" : ""} based on your filter
                  </span>
                </div>

                {(activeFilters.length > 0 ||
                  searchRole ||
                  searchLocation ||
                  datePosted !== "All" ||
                  urgentOnly) && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      Filters (
                      {activeFilters.length +
                        (searchRole ? 1 : 0) +
                        (searchLocation ? 1 : 0) +
                        (datePosted !== "All" ? 1 : 0) +
                        (urgentOnly ? 1 : 0)}
                      )
                    </span>

                    {searchRole && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {searchRole}
                        <button
                          onClick={() => setSearchRole("")}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}

                    {searchLocation && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {searchLocation}
                        <button
                          onClick={() => setSearchLocation("")}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}

                    {activeFilters.map((filter) => (
                      <span
                        key={filter}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                      >
                        {filter}
                        <button
                          onClick={() => removeFilter(filter)}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}

                    {datePosted !== "All" && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {datePosted}
                        <button
                          onClick={() => setDatePosted("All")}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}

                    {urgentOnly && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        Urgent
                        <button
                          onClick={() => setUrgentOnly(false)}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}

                    <button
                      onClick={clearAllFilters}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              {/* Job listings */}
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-700">
                    No jobs found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {currentJobs.map((job) => (
                      <Link
                        key={job.id}
                        to={`/apply-for-jobs/job-details/${job.id}`}
                        className="bg-white rounded-lg p-4 inline-block w-full md:p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleJobClick(job)}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {job.isUrgent && (
                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  🔥 Urgently hiring
                                </span>
                              )}
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock size={12} />
                                {getDaysAgo(job.postedDate)}
                              </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold mb-1 text-gray-800">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{job.company}</p>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 md:gap-4 text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin size={16} className="text-gray-500" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase
                                  size={16}
                                  className="text-gray-500"
                                />
                                <span>{job.salary}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                {job.workMode}
                              </span>
                              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                {job.type}
                              </span>
                              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                {job.experience}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 self-end md:self-auto">
                            {job.isNew && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full translate-x-25 translate-y-0">
                                New
                              </span>
                            )}
                            
                            {/* <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaveJob(job.id);
                              }}
                              className={`p-2 rounded-full ${
                                savedJobs.includes(job.id)
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-400 hover:text-blue-600"
                              }`}
                              aria-label={
                                savedJobs.includes(job.id)
                                  ? "Unsave job"
                                  : "Save job"
                              }
                            >
                              <Bookmark
                                size={18}
                                fill={
                                  savedJobs.includes(job.id)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button> */}
                          
                          </div>
      <button
          onClick={() => navigate(`/job/${job._id}`)}
          className="bg-blue-600 text-white text-xs sm:text-sm px-4 py-1.5 rounded-b-lg hover:bg-blue-700 transition transform translate-y-30"
        >
          View Job
        </button>
                        </div>
                 
                      </Link>
                      
                      
                    
                    ))}
                  </div>
                     
                  

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 mb-28 gap-2">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 rounded-md ${
                              currentPage === number
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600 hover:bg-blue-50"
                            }`}
                          >
                            {number}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        Next
                      </button>
                      
                    </div>
                  )}
                </>
              )}
              
            </main>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ApplyForJobs;