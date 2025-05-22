import { createContext, useState, useEffect, useContext } from "react";
import { mockJobs } from "../../utilits/mockJobs";

export const UserJobContext = createContext();

export const useUserJobContext = () => {
  return useContext(UserJobContext);
};

export const UserJobProvider = ({ children }) => {
  const [userJob, setUserJob] = useState(null);
  const [searchRole, setSearchRole] = useState("");
  const [searchExperience, setSearchExperience] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [datePosted, setDatePosted] = useState("All");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 800);
  }, []);

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  };

  const handleApplyNow = (jobId) => {
    const jobToApply = mockJobs.find((job) => job.id === jobId);

    // Check if job is already applied
    const isAlreadyApplied = appliedJobs.some((job) => job.id === jobId);

    if (!isAlreadyApplied && jobToApply) {
      setAppliedJobs((prev) => [...prev, jobToApply]);
      setSelectedJob(null);
    } else {
      console.warn("Job already applied or not found");
      // You might want to show a toast notification here
    }
  };

  // Optional: Function to remove a job from applied jobs
  const removeAppliedJob = (jobId) => {
    setAppliedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  return (
    <UserJobContext.Provider
      value={{
        userJob,
        setUserJob,
        searchRole,
        setSearchRole,
        searchExperience,
        setSearchExperience,
        searchLocation,
        setSearchLocation,
        activeFilters,
        setActiveFilters,
        datePosted,
        setDatePosted,
        urgentOnly,
        setUrgentOnly,
        savedJobs,
        setSavedJobs,
        isLoading,
        setIsLoading,
        jobs,
        setJobs,
        filteredJobs,
        setFilteredJobs,
        selectedJob,
        setSelectedJob,
        currentPage,
        setCurrentPage,
        getDaysAgo,
        appliedJobs,
        handleApplyNow,
        removeAppliedJob, // Optional: if you want to allow removing applied jobs
      }}
    >
      {children}
    </UserJobContext.Provider>
  );
};
