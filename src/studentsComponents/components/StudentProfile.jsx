import { useState } from "react";
import { FileText, Upload, X, Edit2, Check } from "lucide-react";
import Header from "./header/Header";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const initialStudentDetails = {
    name: "Shivam Dubey",
    email: "shivam.dubey@example.com",
    password: "********",
    phone: "+91 9876543210",
    gender: "Male",
    address: "123 Main Street, Mumbai, India",
    skills: "React, JavaScript, TypeScript, Node.js",
    whatsapp: "+91 9876543210",
  };

  const initialParentDetails = {
    name: "Rajesh Dubey",
    phone: "+91 9876543211",
    relation: "Father",
    email: "rajesh.dubey@example.com",
  };

  const [studentDetails, setStudentDetails] = useState(initialStudentDetails);
  const [parentDetails, setParentDetails] = useState(initialParentDetails);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!studentDetails.name.trim()) newErrors.studentName = "Name is required";
    if (!studentDetails.email.trim())
      newErrors.studentEmail = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(studentDetails.email))
      newErrors.studentEmail = "Email is invalid";
    if (!studentDetails.password)
      newErrors.studentPassword = "Password is required";
    if (!studentDetails.phone.trim())
      newErrors.studentPhone = "Phone is required";
    if (!studentDetails.gender) newErrors.studentGender = "Gender is required";
    if (!studentDetails.address.trim())
      newErrors.studentAddress = "Address is required";
    if (!studentDetails.skills.trim())
      newErrors.studentSkills = "Skills are required";
    if (!studentDetails.whatsapp.trim())
      newErrors.studentWhatsapp = "WhatsApp number is required";

    if (!parentDetails.name.trim())
      newErrors.parentName = "Parent name is required";
    if (!parentDetails.phone.trim())
      newErrors.parentPhone = "Parent phone is required";
    if (!parentDetails.relation)
      newErrors.parentRelation = "Relation is required";
    if (!parentDetails.email.trim())
      newErrors.parentEmail = "Parent email is required";
    else if (!/^\S+@\S+\.\S+$/.test(parentDetails.email))
      newErrors.parentEmail = "Parent email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[`student${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors((prev) => ({
        ...prev,
        [`student${name.charAt(0).toUpperCase() + name.slice(1)}`]: "",
      }));
    }
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[`parent${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors((prev) => ({
        ...prev,
        [`parent${name.charAt(0).toUpperCase() + name.slice(1)}`]: "",
      }));
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      const previewURL = URL.createObjectURL(file);
      setResumePreview(previewURL);

      if (errors.resume) {
        setErrors((prev) => ({ ...prev, resume: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      console.log("Student Details:", studentDetails);
      console.log("Parent Details:", parentDetails);
      console.log("Resume File:", resumeFile);
      alert("Profile updated successfully!");
      setIsEditing(false);
    }

    setIsSubmitting(false);
  };

  const renderField = (label, value) => (
    <div className="mb-3 sm:mb-4">
      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
        {label}
      </label>
      <p className="text-sm sm:text-base text-gray-900">{value}</p>
    </div>
  );

  const renderInput = (label, name, value, type = "text", options = null) => (
    <div className="mb-3 sm:mb-4">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
        {label} *
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={
            name.includes("parent") ? handleParentChange : handleStudentChange
          }
          className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
          disabled={!isEditing}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={
            name.includes("parent") ? handleParentChange : handleStudentChange
          }
          className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
          disabled={!isEditing}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="flex">
      <Header />
      <div className="flex-1 h-screen overflow-y-auto px-4 sm:px-6 pt-25 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Student Basic Details
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm sm:text-base"
              >
                {isEditing ? (
                  <>
                    <Check size={18} />
                    <span>Done</span>
                  </>
                ) : (
                  <>
                    <Edit2 size={18} />
                    <span>Edit</span>
                  </>
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="bg-[#0F52BA] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold">
                  Student Details
                </h3>
              </div>

              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {renderInput("Name", "name", studentDetails.name)}
                  {renderInput("Email", "email", studentDetails.email, "email")}
                  {renderInput(
                    "Password",
                    "password",
                    studentDetails.password,
                    "password"
                  )}
                  {renderInput(
                    "Phone Number",
                    "phone",
                    studentDetails.phone,
                    "tel"
                  )}
                  {renderInput(
                    "Gender",
                    "gender",
                    studentDetails.gender,
                    "select",
                    ["Male", "Female", "Other"]
                  )}
                  {renderInput("Address", "address", studentDetails.address)}
                  {renderInput("Skills", "skills", studentDetails.skills)}
                  {renderInput(
                    "WhatsApp No.",
                    "whatsapp",
                    studentDetails.whatsapp,
                    "tel"
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {renderField("Name", studentDetails.name)}
                  {renderField("Email", studentDetails.email)}
                  {renderField("Phone Number", studentDetails.phone)}
                  {renderField("Gender", studentDetails.gender)}
                  {renderField("Address", studentDetails.address)}
                  {renderField("Skills", studentDetails.skills)}
                  {renderField("WhatsApp No.", studentDetails.whatsapp)}
                </div>
              )}

              <div className="bg-[#0F52BA] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg mb-3 sm:mb-4 mt-6 sm:mt-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  Parent Details
                </h3>
              </div>

              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {renderInput("Parent Name", "parentName", parentDetails.name)}
                  {renderInput(
                    "Phone/WhatsApp No.",
                    "parentPhone",
                    parentDetails.phone,
                    "tel"
                  )}
                  {renderInput(
                    "Relation",
                    "parentRelation",
                    parentDetails.relation,
                    "select",
                    ["Father", "Mother", "Guardian"]
                  )}
                  {renderInput(
                    "Email",
                    "parentEmail",
                    parentDetails.email,
                    "email"
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {renderField("Parent Name", parentDetails.name)}
                  {renderField("Phone/WhatsApp No.", parentDetails.phone)}
                  {renderField("Relation", parentDetails.relation)}
                  {renderField("Email", parentDetails.email)}
                </div>
              )}

              {!isEditing && (
                <div className="mt-6 sm:mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-[#0F52BA] text-white rounded-full hover:bg-[#1565C0] transition-colors font-medium shadow-md text-sm sm:text-base"
                  >
                    Update Profile
                  </button>
                </div>
              )}

              {isEditing && (
                <div className="mt-6 sm:mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-[#0F52BA] text-white rounded-full hover:bg-[#1565C0] transition-colors font-medium shadow-md disabled:opacity-50 text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="bg-white -order-1 md:order-1 rounded-xl p-4 sm:p-6 shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Resume
            </h2>
            <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[700px] border-2 border-dashed border-blue-200 rounded-xl bg-blue-50 p-4 sm:p-6">
              {resumePreview ? (
                <div className="w-full h-full flex flex-col items-center">
                  <div className="relative w-full flex-1 mb-3 sm:mb-4">
                    <iframe
                      src={resumePreview}
                      className="w-full h-full min-h-[300px] border border-gray-200"
                      title="Resume Preview"
                    />
                  </div>
                  <div className="flex items-center">
                    <FileText size={20} className="text-[#0F52BA] mr-2" />
                    <p className="text-gray-600 text-sm sm:text-base">
                      {resumeFile.name}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setResumeFile(null);
                      setResumePreview(null);
                    }}
                    className="mt-3 text-red-500 text-xs sm:text-sm hover:text-red-700 flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Remove Resume
                  </button>
                </div>
              ) : (
                <>
                  <FileText size={60} className="text-[#0F52BA] mb-4 sm:mb-6" />
                  <p className="text-gray-600 mb-4 sm:mb-6 text-center max-w-md text-sm sm:text-base">
                    Upload your resume
                  </p>
                  <label className="px-6 sm:px-8 py-2 sm:py-3 bg-white border-2 border-[#0F52BA] text-[#0F52BA] rounded-full hover:bg-blue-50 transition-colors font-medium shadow-sm text-xs sm:text-sm cursor-pointer flex items-center gap-2">
                    <Upload size={20} />
                    <span>Upload Resume</span>
                    <input
                      type
                      type="file"
                      className="hidden"
                      accept=".pdf, .doc, .docx"
                      onChange={handleResumeUpload}
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
