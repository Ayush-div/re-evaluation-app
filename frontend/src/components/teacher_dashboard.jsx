import React from 'react'

const TeacherDashboard = () => {
  // Sample data for statistics
  const stats = {
    pendingReviews: 15,
    papersReviewed: 47,
    totalQuestions: 180,
    questionsWithDoubts: 23
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Teacher Dashboard
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Profile</button>
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Settings</button>
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-6">
        {/* Greeting Section */}
        <div className="pt-8 pb-6">
          <h1 className="text-2xl font-bold text-[#1E232C]">
            Welcome back, Professor! 👋
          </h1>
          <p className="text-[#6A707C] mt-2">
            Here's an overview of student re-evaluation requests
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Pending Reviews</p>
            <p className="text-2xl font-bold text-[#1E232C] mt-1">{stats.pendingReviews}</p>
          </div>
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Papers Reviewed</p>
            <p className="text-2xl font-bold text-[#000000] mt-1">{stats.papersReviewed}</p>
          </div>
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Total Questions</p>
            <p className="text-2xl font-bold text-[#000000] mt-1">{stats.totalQuestions}</p>
          </div>
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Questions with Doubts</p>
            <p className="text-2xl font-bold text-orange-500 mt-1">{stats.questionsWithDoubts}</p>
          </div>
        </div>

        {/* Question Analysis Section */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1E232C] mb-4">Questions Requiring Attention</h2>
          <div className="space-y-4">
            <div className="p-4 bg-[#F7F8F9] rounded-[8px] hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-[#1E232C]">Question #5 - Mathematics</h3>
                  <p className="text-[#6A707C] text-sm">Integration by Parts</p>
                </div>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                  8 doubts
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => console.log('Review Paper clicked')}
                  className="text-sm px-3 py-1 bg-black text-white rounded-[6px] hover:bg-gray-800"
                >
                  Review Paper
                </button>
                <button 
                  onClick={() => console.log('View Doubts clicked')}
                  className="text-sm px-3 py-1 border border-[#DADADA] rounded-[6px] hover:border-black"
                >
                  View Doubts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#1E232C]">Upload Solution Video</h2>
            <span className="text-[#6A707C] text-sm">Max size: 100MB</span>
          </div>
          
          <div className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-[#DADADA] rounded-[12px] p-8
                          hover:border-black transition-colors duration-300 cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <svg className="w-12 h-12 text-[#6A707C] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-[#1E232C] font-medium mb-2">Drag and drop your video here</p>
                <p className="text-[#6A707C] text-sm mb-4">or</p>
                <label className="px-6 py-2 bg-black text-white rounded-[8px] 
                               cursor-pointer transition-all duration-300
                               hover:bg-gray-800 hover:scale-[1.02]
                               active:scale-[0.98]">
                  Browse Files
                  <input type="file" className="hidden" accept="video/*" 
                         onChange={(e) => console.log('File selected:', e.target.files[0])} />
                </label>
              </div>
            </div>

            {/* Upload Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#F7F8F9] rounded-[8px]">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-[#1E232C] font-medium">Video Details</p>
                    <select className="mt-1 text-sm text-[#6A707C] bg-transparent border-none focus:ring-0">
                      <option>Select Question Number</option>
                      <option>Question #1</option>
                      <option>Question #2</option>
                      <option>Question #3</option>
                    </select>
                  </div>
                </div>
                <button className="text-sm px-4 py-1 bg-black text-white rounded-full
                                 hover:bg-gray-800 transition-all duration-300">
                  Upload
                </button>
              </div>
              
              {/* Recent Uploads */}
              <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                <p className="text-[#6A707C] text-sm mb-2">Recent Uploads</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-[#1E232C] text-sm">Question #5 Solution.mp4</p>
                  </div>
                  <span className="text-[#6A707C] text-xs">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
            <h2 className="text-lg font-bold text-[#1E232C] mb-4">Recent Reviews</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#F7F8F9] rounded-[8px]">
                <div>
                  <p className="text-[#1E232C] font-medium">Student ID: 2021CS01</p>
                  <p className="text-[#6A707C] text-sm">Mathematics Paper</p>
                </div>
                <span className="text-[#000000] text-sm">1 hour ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
            <h2 className="text-lg font-bold text-[#1E232C] mb-4">Question Statistics</h2>
            <div className="space-y-3">
              <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                <div className="flex justify-between mb-2">
                  <span className="text-[#6A707C]">Most Doubted Question</span>
                  <span className="text-[#1E232C] font-medium">#5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-black h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
