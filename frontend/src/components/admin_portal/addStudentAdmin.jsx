import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStudentAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNumber: '',
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/organization/addStudent', formData);
      if (response.data.success) {
        navigate('/organization/added-student-success');
      } else if (response.data.message === "Student with the given rollnumber and email already exists") {
        setErrorMessage('Student already exists with this roll number or email');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setErrorMessage('Error adding student. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">Add New Student</div>
            <button 
              onClick={() => navigate(-1)}
              className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="max-w-xl mx-auto">
          {/* Form Header */}
          <div className="bg-white rounded-t-[12px] border border-b-0 border-[#DADADA] p-6">
            <h2 className="text-xl font-bold text-[#1E232C]">Student Information</h2>
            <p className="text-[#6A707C] text-sm mt-1">Add a new student to the system</p>
            {errorMessage && (
              <div className="mt-3 text-red-500 text-sm font-medium bg-red-50 p-2 rounded-md border border-red-200">
                {errorMessage}
              </div>
            )}
          </div>
          
          {/* Form Container */}
          <div className="bg-white rounded-b-[12px] border border-[#DADADA] p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#1E232C] font-medium text-sm mb-2">Roll Number</label>
                  <input
                    type="text"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                             transition-all duration-300 
                             hover:shadow-md hover:border-gray-400 
                             focus:outline-none focus:border-[#000000] focus:shadow-lg"
                    placeholder="Enter student's roll number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1E232C] font-medium text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                             transition-all duration-300 
                             hover:shadow-md hover:border-gray-400 
                             focus:outline-none focus:border-[#000000] focus:shadow-lg"
                    placeholder="Enter email address"
                    required
                  />
                  <p className="text-[#6A707C] text-xs mt-1">Student will receive login credentials on this email</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-[#DADADA]">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border border-[#DADADA] rounded-[8px] text-[#1E232C]
                           transition-all duration-300
                           hover:border-black hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white rounded-[8px] 
                            transition-all duration-300
                            hover:bg-gray-800 hover:scale-[1.02]
                            active:scale-[0.98]"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentAdmin;
