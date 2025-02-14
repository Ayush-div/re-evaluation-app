import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTeacher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const organization = location.state?.organization;
  // console.log("roganizatio")
  console.log(organization)
  const [formData, setFormData] = useState({
    teacherName: '',
    email: '',
    phoneNumber: '',
    department: '',
    role: '',
    qualification: '',
    password: '',
    document: null
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      setFormData(prev => ({
        ...prev,
        document: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post('/api/teacher/register', {
        phoneNumber: formData.phoneNumber,
        qualification: formData.qualification,
        teacherName: formData.teacherName,
        email: formData.email,
        password: formData.password,
        department: formData.department,
        role: formData.role,
        organization: organization.name,
        orgID: organization.id
      });

      console.log("API response:", response);

      if (response?.data?.Success) {
        navigate('/teacher/register-teacher-success', { state: { role: 'teacher' } });
      } else if (response?.data?.message === "Teacher with the given fullName and email already exists") {
        setErrorMessage('Teacher already exists with this email');
        setTimeout(() => setErrorMessage(''), 3000);
      } else if (response?.data?.message === "Phone Number already in use") {
        setErrorMessage('Teacher already exists with this Phone Number');
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        setErrorMessage(response?.data?.message || 'Unexpected error');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      const errorData = error.response?.data || {};
      console.error('Error adding teacher:', error);
      setErrorMessage(errorData.message || 'Error adding teacher. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Register As Teacher
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => window.history.back()}
                className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-[12px] border border-[#DADADA] p-6">
          <h2 className="text-xl font-bold text-[#1E232C] mb-6">Enter Your Information</h2>

          {errorMessage && (
            <div
              id="error-message"
              className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg"
              style={{ animation: 'fadeOut 2s forwards' }}
            >
              {errorMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter department"
                  required
                />
              </div>
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter role"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#6A707C] text-sm mb-2">Qualification</label>
              <textarea
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full h-[100px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-3 
                         transition-all duration-300 hover:shadow-md hover:border-gray-400 
                         focus:outline-none focus:border-[#000000] focus:shadow-lg"
                placeholder="Enter qualification and experience"
                required
              ></textarea>
            </div>

            <div className="border-2 border-dashed border-[#DADADA] rounded-[12px] p-8
                         hover:border-black transition-colors duration-300">
              <div className="flex flex-col items-center text-center">
                <svg className="w-12 h-12 text-[#6A707C] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-[#1E232C] font-medium mb-2">Upload document</p>
                <p className="text-[#6A707C] text-sm mb-4">Upload CV or other relevant document</p>
                <label className="px-6 py-2 bg-black text-white rounded-[8px] 
                               cursor-pointer transition-all duration-300
                               hover:bg-gray-800 hover:scale-[1.02]
                               active:scale-[0.98]">
                  Choose Files
                  <input
                    type="file"
                    name="document"
                    onChange={handleChange}
                    className="hidden"
                    multiple
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-[#DADADA] rounded-[8px] text-[#1E232C]
                         transition-all duration-300 hover:border-black hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-[8px] 
                          transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02]
                          active:scale-[0.98]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
