import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Brain, ArrowRight } from "lucide-react";

const dummyJobs = Array(15)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    role: ["UI/UX Designer", "Graphic Designer", "Frontend Dev", "Motion Designer"][i % 4],
    company: ["Google", "Spotify", "Tesla", "Netflix"][i % 4],
    location: i % 2 === 0 ? "Remote" : "Onsite",
    experience: ["Junior", "Mid-Level", "Senior"][i % 3],
    salary: 3000 + i * 250,
    posted: `2025-04-${(i % 28) + 1}`,
    level: ["Full-time", "Part-time", "Contract"][(i + 1) % 3],
  }));

export default function JobBoard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-20 px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Recommended <span className="text-blue-600">Jobs</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {dummyJobs.map((job) => (
          <div
            key={job.id}
            className="group relative bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.025] overflow-hidden hover:ring-1 hover:ring-blue-500"
          >
            <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full"></span>

            <div className="transition-opacity duration-300 group-hover:opacity-90">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-400">{job.posted}</p>
                <div className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {job.level}
                </div>
              </div>

              <h2 className="text-xl font-bold text-blue-800 mb-1 flex items-center gap-2">
                <Briefcase size={18} className="text-blue-600" /> {job.role}
              </h2>
              <p className="text-blue-600 mb-2 font-medium">{job.company}</p>

              <div className="text-sm text-gray-700 space-y-1 mt-2">
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" /> <span>{job.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Brain size={16} className="text-blue-500" /> <span>{job.experience}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-blue-600 font-semibold text-sm flex items-center gap-1">
                <span>${job.salary}/mo</span>
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm px-5 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 ease-in-out flex items-center gap-2">
                Apply Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <button
          onClick={() => navigate("/jobs")}
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300"
        >
          Show More Jobs
        </button>
      </div>
    </div>
  );
}
