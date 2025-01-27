import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const stats = {
    totalStudents: 1240,
    activeTeachers: 45,
    pendingVerifications: 12,
    totalRevenue: "₹45,250"
  }

  const ArrowIcon = () => (
    <svg 
      className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors duration-300" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Organization Dashboard
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Settings</button>
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Reports</button>
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-6">
        {/* Greeting & Quick Actions */}
        <div className="pt-8 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1E232C]">
              Welcome, Admin! 👋
            </h1>
            <p className="text-[#6A707C] mt-2">
              Here's your organization's overview
            </p> 
          </div>
          <div className="flex gap-4 cursor-pointer">
            <Link to='/admin/add-teacher'>
            <button className="cursor-pointer px-4 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all">
              Add Teacher
            </button>
            </Link>
            <Link to='/admin/generate-report'>
              <button className="cursor-pointer px-4 py-2 border border-[#DADADA] rounded-[8px] hover:border-black transition-all">
                Generate Report
              </button>
            </Link>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Total Students</p>
            <p className="text-2xl font-bold text-[#1E232C] mt-1">{stats.totalStudents}</p>
          </div>
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Active Teachers</p>
            <p className="text-2xl font-bold text-[#000000] mt-1">{stats.activeTeachers}</p>
          </div>
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Pending Verifications</p>
            <p className="text-2xl font-bold text-orange-500 mt-1">{stats.pendingVerifications}</p>
          </div>
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.totalRevenue}</p>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Verification Tasks */}
          <div className="group bg-white rounded-[12px] border border-[#DADADA] p-6 hover:shadow-md transition-all cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#1E232C]">Pending Verifications</h2>
              <ArrowIcon />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-[#F7F8F9] rounded-[8px] hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-[#1E232C]">New Teacher Registration</p>
                    <p className="text-sm text-[#6A707C]">Mathematics Department</p>
                  </div>
                  <button className="text-xs px-3 py-1 bg-black text-white rounded-full hover:bg-gray-800">
                    Verify
                  </button>
                </div>
              </div>
              <div className="p-3 bg-[#F7F8F9] rounded-[8px] hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-[#1E232C]">Student Documents</p>
                    <p className="text-sm text-[#6A707C]">5 pending requests</p>
                  </div>
                  <button className="text-xs px-3 py-1 bg-black text-white rounded-full hover:bg-gray-800">
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Overview */}
          <div className="group bg-white rounded-[12px] border border-[#DADADA] p-6 hover:shadow-md transition-all cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#1E232C]">Payment Overview</h2>
              <ArrowIcon />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                <p className="text-[#6A707C] text-sm">Today's Collections</p>
                <p className="text-xl font-bold text-[#1E232C]">₹12,450</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>
              <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                <p className="text-[#6A707C] text-sm">Pending Payments</p>
                <p className="text-xl font-bold text-orange-500">₹5,240</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Reminders */}
          <div className="group bg-white rounded-[12px] border border-[#DADADA] p-6 hover:shadow-md transition-all cursor-pointer">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#1E232C]">Teacher Reminders</h2>
              <ArrowIcon />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-[#F7F8F9] rounded-[8px] border-l-4 border-red-500">
                <p className="font-medium text-[#1E232C]">Review Deadline</p>
                <p className="text-sm text-[#6A707C]">5 papers pending review</p>
                <p className="text-xs text-red-500 mt-1">Due in 2 days</p>
              </div>
              <div className="p-3 bg-[#F7F8F9] rounded-[8px] border-l-4 border-yellow-500">
                <p className="font-medium text-[#1E232C]">Monthly Report</p>
                <p className="text-sm text-[#6A707C]">Submit student progress report</p>
                <p className="text-xs text-yellow-600 mt-1">Due next week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#1E232C]">Recent Activity</h2>
            <button className="text-sm text-[#6A707C] hover:text-black">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#F7F8F9] rounded-[8px]">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-[#1E232C] font-medium">New Teacher Verified</p>
                  <p className="text-[#6A707C] text-sm">Prof. Sarah Johnson - Physics Department</p>
                </div>
              </div>
              <span className="text-[#6A707C] text-sm">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#F7F8F9] rounded-[8px]">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-[#1E232C] font-medium">Payment Received</p>
                  <p className="text-[#6A707C] text-sm">₹2,450 - Student ID: 2021CS01</p>
                </div>
              </div>
              <span className="text-[#6A707C] text-sm">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
