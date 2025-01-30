import React from 'react'
import { Link } from 'react-router-dom'
const AddTeacherAdmin = () => {
  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Add New Teacher
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
          <h2 className="text-xl font-bold text-[#1E232C] mb-6">Teacher Information</h2>
          
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
              {/* <div>
                <label className="block text-[#6A707C] text-sm mb-2">Employee ID</label>
                <input
                  type="text"
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter employee ID"
                />
              </div> */}
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
              {/* <div>
                <label className="block text-[#6A707C] text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter phone number"
                />
              </div> */}
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
              <Link to='/admin/added-teacher-success'>
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white rounded-[8px] 
                          transition-all duration-300
                          hover:bg-gray-800 hover:scale-[1.02]
                          active:scale-[0.98]"
                >
                  Add Teacher
                </button>
              </Link>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTeacherAdmin
