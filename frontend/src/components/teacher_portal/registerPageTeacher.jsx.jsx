import React from 'react'
import { Link } from 'react-router-dom'
const RegisterCardTeacher = () => {
  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {/* Navbar */}
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
        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white rounded-[12px] border border-[#DADADA] p-6">
          <h2 className="text-xl font-bold text-[#1E232C] mb-6">Enter Your Information</h2>
          
          <form className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Employee ID</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter employee ID"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Department & Role */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Department</label>
                <input
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter Department"
                />
                
              </div>
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Role</label>
                <input
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter Role"
                />
                
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-[#6A707C] text-sm mb-2">Qualifications</label>
              <textarea
                className="w-full h-[100px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-3 
                         transition-all duration-300 
                         hover:shadow-md hover:border-gray-400 
                         focus:outline-none focus:border-[#000000] focus:shadow-lg"
                placeholder="Enter qualifications and experience"
              ></textarea>
            </div>

            {/* Upload Documents Section */}
            <div className="border-2 border-dashed border-[#DADADA] rounded-[12px] p-8
                         hover:border-black transition-colors duration-300">
              <div className="flex flex-col items-center text-center">
                <svg className="w-12 h-12 text-[#6A707C] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-[#1E232C] font-medium mb-2">Upload Documents</p>
                <p className="text-[#6A707C] text-sm mb-4">Upload CV and other relevant documents</p>
                <label className="px-6 py-2 bg-black text-white rounded-[8px] 
                               cursor-pointer transition-all duration-300
                               hover:bg-gray-800 hover:scale-[1.02]
                               active:scale-[0.98]">
                  Choose Files
                  <input type="file" className="hidden" multiple />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-[#DADADA] rounded-[8px] text-[#1E232C]
                         transition-all duration-300
                         hover:border-black hover:shadow-md"
              >
                Cancel
              </button>
              <Link to='/organization/added-teacher-success'>
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white rounded-[8px] 
                          transition-all duration-300
                          hover:bg-gray-800 hover:scale-[1.02]
                          active:scale-[0.98]"
                >
                  Register
                </button>
              </Link>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterCardTeacher
