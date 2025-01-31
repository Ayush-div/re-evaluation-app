import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTeacherAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/addTeacher', formData);
      if (response.data.success) {
        navigate('/admin/added-teacher-success');
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">Add New Teacher</div>
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
            <h2 className="text-xl font-bold text-[#1E232C]">Teacher Information</h2>
            <p className="text-[#6A707C] text-sm mt-1">Add a new teacher to the system</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-b-[12px] border border-[#DADADA] p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#1E232C] font-medium text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                             transition-all duration-300 
                             hover:shadow-md hover:border-gray-400 
                             focus:outline-none focus:border-[#000000] focus:shadow-lg"
                    placeholder="Enter teacher's full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1E232C] font-medium text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                             transition-all duration-300 
                             hover:shadow-md hover:border-gray-400 
                             focus:outline-none focus:border-[#000000] focus:shadow-lg"
                    placeholder="Enter email address"
                    required
                  />
                  <p className="text-[#6A707C] text-xs mt-1">Teacher will use this email for loggin in </p>
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
                  Add Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacherAdmin;
