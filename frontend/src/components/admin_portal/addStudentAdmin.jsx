import React, { useState } from 'react';
import { UNSAFE_NavigationContext, useNavigate } from 'react-router-dom';
import axios from "axios"

const AddStudentAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log('Submitting form data:', formData);
        
        const response = await axios.post('/api/organization/addStudent', formData);
        console.log('Response:', response);

        if (response.data.success) {
            // ...existing success handling...
            console.log("here i am ")
            navigate('/organization/added-student-success')
        }
    } catch (error) {
        console.error('Full error:', error);
        setErrorMessage(
            error.response?.data?.message || 
            'Network error - please try again'
        );
        
        // If unauthorized, check if user is logged in
        if (error.response?.status === 401) {
            const orgData = localStorage.getItem('organizationData');
            if (!orgData) {
                navigate('/organization/login');
            }
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
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
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
              <div className="text-sm mt-2">
                Redirecting to student management...
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorMessage}
            </div>
          )}

          <div className="bg-white rounded-t-[12px] border border-b-0 border-[#DADADA] p-6">
            <h2 className="text-xl font-bold text-[#1E232C]">Student Information</h2>
            <p className="text-[#6A707C] text-sm mt-1">Add a new student to the system</p>
          </div>

          <div className="bg-white rounded-b-[12px] border border-[#DADADA] p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#1E232C] font-medium text-sm mb-2">Roll Number</label>
                  <input
                    type="text"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                             transition-all duration-300 
                             hover:shadow-md hover:border-gray-400 
                             focus:outline-none focus:border-[#000000] focus:shadow-lg"
                    placeholder="Enter student's roll number"
                    required
                    disabled={loading}
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
                    disabled={loading}
                  />
                  <p className="text-[#6A707C] text-xs mt-1">Student will receive login credentials on this email</p>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-[#DADADA]">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border border-[#DADADA] rounded-[8px] text-[#1E232C]
                           transition-all duration-300
                           hover:border-black hover:shadow-md"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-3 bg-black text-white rounded-[8px] 
                            transition-all duration-300
                            hover:bg-gray-800 hover:scale-[1.02]
                            active:scale-[0.98]
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={loading}
                >
                  {loading ? 'Adding Student...' : 'Add Student'}
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
