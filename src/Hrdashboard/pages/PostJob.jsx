import React, { useState } from 'react';
import { UploadIcon, Calendar, XIcon, CheckIcon } from 'lucide-react';

const PostJob = () => {

  const initialFormState = {
    jobTitle: '',
    jobDescription: '',
    location: '',
    salaryRange: '',
    jobType: 'Full-time',
    companyName: '',
    experienceLevel: '',
    skillsRequired: []
  };

  const initialSettingsState = {
    autoStopHiring: false,
    limitApplications: false,
    stopAfterApplications: 100,
    stopAfterDays: "",
    applicationLimit: "",
    isUrgentHiring: false,
    isRemote: false,
    hasBenefits: false
  };

  const experienceLevels = [
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Executive'
  ];

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Temporary',
    'Internship',
    'Remote'
  ];

  const [formData, setFormData] = useState(initialFormState);
  const [settings, setSettings] = useState(initialSettingsState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentSkill, setCurrentSkill] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check all required fields
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
      isValid = false;
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    }
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
      isValid = false;
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }
    if (!formData.salaryRange.trim()) {
      newErrors.salaryRange = 'Salary range is required';
      isValid = false;
    }
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Experience level is required';
      isValid = false;
    }
    if (formData.skillsRequired.length === 0) {
      newErrors.skillsRequired = 'At least one skill is required';
      isValid = false;
    }
    if (uploadedFiles.length === 0) {
      newErrors.uploadedFiles = 'At least one attachment is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
   
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSettingsChange = (name, value) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNumericInput = (e, setter) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setter(value);
    }
  };

  const handleSkillAdd = () => {
    if (currentSkill.trim() && !formData.skillsRequired.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, currentSkill.trim()]
      }));
      setCurrentSkill('');
 
      if (errors.skillsRequired) {
        setErrors(prev => ({ ...prev, skillsRequired: '' }));
      }
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  
    if (errors.uploadedFiles) {
      setErrors(prev => ({ ...prev, uploadedFiles: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const jobData = {
      ...formData,
      settings: {
        ...settings,
        stopAfterApplications: settings.autoStopHiring ? settings.stopAfterApplications : null,
        stopAfterDays: settings.autoStopHiring ? settings.stopAfterDays : null,
        applicationLimit: settings.limitApplications ? settings.applicationLimit : null
      },
      attachments: uploadedFiles
    };

    try {

      console.log('Submitting job:', jobData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData(initialFormState);
      setSettings(initialSettingsState);
      setUploadedFiles([]);
      setErrors({});
      
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-7xl rounded-3xl p-6 shadow-lg bg-white">

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
            <CheckIcon className="h-5 w-5 mr-2" />
            Job posted successfully!
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Job Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Job Title*</label>
                    <input
                      type="text"
                      name="jobTitle"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. Senior Frontend Developer"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                    />
                    {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Company Name*</label>
                    <input
                      type="text"
                      name="companyName"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.companyName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your company name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                    {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Job Description*</label>
                  <textarea
                    name="jobDescription"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px] ${
                      errors.jobDescription ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe the job responsibilities and requirements"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                  />
                  {errors.jobDescription && <p className="mt-1 text-sm text-red-600">{errors.jobDescription}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Location*</label>
                    <input
                      type="text"
                      name="location"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. New York, NY or Remote"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Salary Range*</label>
                    <input
                      type="text"
                      name="salaryRange"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.salaryRange ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. $90,000 - $120,000 per year"
                      value={formData.salaryRange}
                      onChange={handleInputChange}
                    />
                    {errors.salaryRange && <p className="mt-1 text-sm text-red-600">{errors.salaryRange}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Job Type</label>
                    <select
                      name="jobType"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.jobType}
                      onChange={handleInputChange}
                    >
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Experience Level*</label>
                    <select
                      name="experienceLevel"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                    >
                      <option value="">Select experience level</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    {errors.experienceLevel && <p className="mt-1 text-sm text-red-600">{errors.experienceLevel}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Skills Required*</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add a skill (e.g. React, Python)"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSkillAdd()}
                    />
                    <button
                      type="button"
                      onClick={handleSkillAdd}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg"
                    >
                      Add
                    </button>
                  </div>
                  {errors.skillsRequired && <p className="mt-1 text-sm text-red-600">{errors.skillsRequired}</p>}
                  <div className="flex flex-wrap gap-2">
                    {formData.skillsRequired.map(skill => (
                      <div key={skill} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleSkillRemove(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Attachments*</h3>
              <p className="text-gray-600 mb-4">
                Upload job description files or images (PDF, DOCX, JPG, PNG)
              </p>
              
              <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                errors.uploadedFiles ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }">
                <div className="flex flex-col items-center justify-center">
                  <UploadIcon className="h-8 w-8 text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Max file size: 5MB</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </label>
              {errors.uploadedFiles && <p className="mt-1 text-sm text-red-600">{errors.uploadedFiles}</p>}
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Uploaded files:</h4>
                  <ul className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="truncate">{file.name}</span>
                        <span className="ml-2 text-gray-400">({(file.size / 1024).toFixed(1)}KB)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Hiring Settings</h3>
              
 
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="urgentHiring" className="text-gray-700 font-medium cursor-pointer">Urgent Hiring</label>
                  <p className="text-sm text-gray-500">Highlight this job as urgent</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.isUrgentHiring}
                    onChange={() => handleSettingsChange('isUrgentHiring', !settings.isUrgentHiring)}
                    id="urgentHiring"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="isRemote" className="text-gray-700 font-medium cursor-pointer">Remote Position</label>
                  <p className="text-sm text-gray-500">This job can be done remotely</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.isRemote}
                    onChange={() => handleSettingsChange('isRemote', !settings.isRemote)}
                    id="isRemote"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>


            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Auto Stop Hiring</h3>
      <p className="text-sm text-gray-500">Automatically close this job posting</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer"
        checked={settings.autoStopHiring}
        onChange={() => handleSettingsChange('autoStopHiring', !settings.autoStopHiring)}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
  
  {settings.autoStopHiring && (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">After number of applications</label>
          <input 
            type="number" 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            value={settings.stopAfterApplications}
            onChange={(e) => handleSettingsChange('stopAfterApplications', e.target.value)}
            placeholder="Enter number of applications"
            min="1"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">After number of days</label>
          <input 
            type="number" 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={settings.stopAfterDays}
            onChange={(e) => handleSettingsChange('stopAfterDays', e.target.value)}
            placeholder="Enter number of days"
            min="1"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Or on specific date</label>
          <input 
            type="date" 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={settings.stopOnDate}
            onChange={(e) => handleSettingsChange('stopOnDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  )}
</div>


            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting Job...
                </>
              ) : 'Post Job Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;