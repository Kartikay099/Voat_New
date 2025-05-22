import { useState } from 'react';
import { User, Briefcase, Mail, Phone, MapPin, Calendar, Moon, Sun, Linkedin, Save, Edit, X } from "lucide-react";

export default function Profile() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState(null); // 'profile', 'hr', 'tasks'
  
  // Initial profile data with Indian details
  const initialProfileDetails = {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Bangalore, Karnataka",
    jobsPosted: 8,
    receivedJobs: 3,
    pendingApplications: 15,
    paymentDue: 12500,
    upcomingTasks: [
      "Interview with Infosys on June 15",
      "Follow-up with TCS HR",
      "Complete HackerRank assessment",
      "Submit documents to Wipro",
      "Attend Tech Mahindra networking event",
      "Review offer from Accenture"
    ],
    hrDetails: {
      company: "TechSolutions India Pvt. Ltd.",
      role: "Senior Software Engineer",
      experience: "5 years",
      basicDetails: "Full-time position | Hybrid",
      contactPerson: "Priya Patel",
      contactEmail: "hr@techsolutionsindia.co.in"
    }
  };

  // State for editable fields
  const [profileDetails, setProfileDetails] = useState(initialProfileDetails);
  const [formData, setFormData] = useState({ ...initialProfileDetails });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle task changes
  const handleTaskChange = (index, value) => {
    const updatedTasks = [...formData.upcomingTasks];
    updatedTasks[index] = value;
    setFormData(prev => ({
      ...prev,
      upcomingTasks: updatedTasks
    }));
  };

  // Add new task
  const addNewTask = () => {
    setFormData(prev => ({
      ...prev,
      upcomingTasks: [...prev.upcomingTasks, "New task - click to edit"]
    }));
  };

  // Remove task
  const removeTask = (index) => {
    const updatedTasks = formData.upcomingTasks.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      upcomingTasks: updatedTasks
    }));
  };

  // Save changes
  const handleSave = () => {
    setProfileDetails(formData);
    setIsEditing(false);
    setEditSection(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({ ...profileDetails });
    setIsEditing(false);
    setEditSection(null);
  };

  // Start editing a section
  const startEditing = (section) => {
    setFormData({ ...profileDetails });
    setEditSection(section);
    setIsEditing(true);
  };

  return (
    <div className={`container mx-auto p-4 md:p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#D6E6F2]'} min-h-screen transition-colors`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Profile Details</h2>
            {!isEditing && (
              <button 
                onClick={() => startEditing('profile')}
                className={`flex items-center gap-1 px-3 py-1 rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0F52BA] hover:bg-[#0a3a8a]'} text-white`}
              >
                <Edit size={16} /> Edit
              </button>
            )}
          </div>

          {isEditing && editSection === 'profile' ? (
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  onClick={handleCancel}
                  className={`flex items-center gap-1 px-4 py-2 border rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X size={18} /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className={`flex items-center gap-1 px-4 py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0F52BA] hover:bg-[#0a3a8a]'} text-white rounded`}
                >
                  <Save size={18} /> Update
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="shrink-0 text-gray-500" />
                <span>{profileDetails.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="shrink-0 text-gray-500" />
                <span>{profileDetails.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="shrink-0 text-gray-500" />
                <span>{profileDetails.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="shrink-0 text-gray-500" />
                <span>{profileDetails.location}</span>
              </div>
            </div>
          )}
        </div>

        {/* HR Details */}
        <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">HR Details</h2>
            {!isEditing && (
              <button 
                onClick={() => startEditing('hr')}
                className={`flex items-center gap-1 px-3 py-1 rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0F52BA] hover:bg-[#0a3a8a]'} text-white`}
              >
                <Edit size={16} /> Edit
              </button>
            )}
          </div>

          {isEditing && editSection === 'hr' ? (
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Company</label>
                <input
                  type="text"
                  name="hrDetails.company"
                  value={formData.hrDetails.company}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Role</label>
                <input
                  type="text"
                  name="hrDetails.role"
                  value={formData.hrDetails.role}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Experience</label>
                <input
                  type="text"
                  name="hrDetails.experience"
                  value={formData.hrDetails.experience}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Position Type</label>
                <input
                  type="text"
                  name="hrDetails.basicDetails"
                  value={formData.hrDetails.basicDetails}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Contact Person</label>
                <input
                  type="text"
                  name="hrDetails.contactPerson"
                  value={formData.hrDetails.contactPerson}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Contact Email</label>
                <input
                  type="email"
                  name="hrDetails.contactEmail"
                  value={formData.hrDetails.contactEmail}
                  onChange={handleInputChange}
                  className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  onClick={handleCancel}
                  className={`flex items-center gap-1 px-4 py-2 border rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X size={18} /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className={`flex items-center gap-1 px-4 py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0F52BA] hover:bg-[#0a3a8a]'} text-white rounded`}
                >
                  <Save size={18} /> Update
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="shrink-0 text-gray-500" />
                <span>Company: {profileDetails.hrDetails.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="shrink-0 text-gray-500" />
                <span>Role: {profileDetails.hrDetails.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="shrink-0 text-gray-500" />
                <span>Experience: {profileDetails.hrDetails.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="shrink-0 text-gray-500" />
                <span>Position: {profileDetails.hrDetails.basicDetails}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="shrink-0 text-gray-500" />
                <span>Contact: {profileDetails.hrDetails.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="shrink-0 text-gray-500" />
                <span>Email: {profileDetails.hrDetails.contactEmail}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className={`lg:col-span-2 rounded-xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Upcoming Tasks</h2>
            {!isEditing && (
              <button 
                onClick={() => startEditing('tasks')}
                className={`flex items-center gap-1 px-3 py-1 rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0F52BA] hover:bg-[#0a3a8a]'} text-white`}
              >
                <Edit size={16} /> Edit
              </button>
            )}
          </div>

          {isEditing && editSection === 'tasks' ? (
            <div>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                {formData.upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      className={`flex-1 border rounded p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                    />
                    <button 
                      onClick={() => removeTask(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button 
                  onClick={addNewTask}
                  className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  + Add Task
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCancel}
                    className={`flex items-center gap-1 px-4 py-2 border rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <X size={18} /> Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className={`flex items-center gap-1 px-4 py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0F52BA] hover:bg-[#0a3a8a]'} text-white rounded`}
                  >
                    <Save size={18} /> Update
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto">
              <ul className={`list-disc list-inside space-y-2 ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {profileDetails.upcomingTasks.map((task, index) => (
                  <li key={index} className="py-1">{task}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Other Details */}
        <div className={`lg:col-span-2 rounded-xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-6">Other Details</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="shrink-0 text-gray-500" />
                <span>Jobs posted: {profileDetails.jobsPosted} Posted</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="shrink-0 text-gray-500" />
                <span>No. of received: {profileDetails.receivedJobs} Jobs Posted</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="shrink-0 text-gray-500" />
                <span>Pending applications to review: {profileDetails.pendingApplications} Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="shrink-0 text-gray-500" />
                <span>Payment Due: ₹{profileDetails.paymentDue.toLocaleString('en-IN')}/-</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#0F52BA] hover:bg-[#0a3a8a]'}`}
              >
                <Linkedin size={20} className="text-white" />
              </a>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-600 hover:bg-gray-700'}`}
              >
                {isDarkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-gray-200" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}