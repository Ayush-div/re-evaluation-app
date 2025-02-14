import React, { useState } from 'react';
import ReviewModal from './ReviewModal';

function TeacherDashboard() {
  const [isDoubtModalOpen, setIsDoubtModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [reviewData, setReviewData] = useState({
    marks: '',
    comments: '',
    status: 'pending'
  });

  const doubts = [
    {
      id: 1,
      questionNumber: 5,
      subject: 'Mathematics',
      topic: 'Integration by Parts',
      studentName: 'John Doe',
      rollNumber: '2021CS01',
      doubtCount: 8,
      status: 'pending',
      description: 'I have a doubt regarding the integration method used in part (b)',
      attachments: ['doubt1.jpg', 'workings.pdf'],
      timestamp: '2024-01-20T10:30:00',
    },
  ];

  const stats = {
    pendingReviews: 15,
    papersReviewed: 47,
    totalQuestions: 180,
    questionsWithDoubts: 23
  }

  const handleViewDoubt = (doubt) => {
    setSelectedDoubt(doubt);
    setIsReviewModalOpen(true);
    setReviewData({
      marks: '',
      comments: '',
      status: 'pending'
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <div className="text-xl font-bold text-[#1E232C]">
                Teacher Dashboard
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search doubts, students..."
                  className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
        <div className="pt-8 pb-6">
          <h1 className="text-2xl font-bold text-[#1E232C]">
            Welcome back, Professor! 👋
          </h1>
          <p className="text-[#6A707C] mt-2">
            Here's an overview of student re-evaluation requests
          </p>
        </div>

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

        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#1E232C]">Questions Requiring Attention</h2>
            <div className="flex gap-3">
              <select 
                className="px-3 py-1 border rounded-md focus:outline-none focus:border-black"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {doubts.map((doubt) => (
              <div key={doubt.id} className="p-4 bg-[#F7F8F9] rounded-[8px] hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-[#1E232C]">
                      Question #{doubt.questionNumber} - {doubt.subject}
                    </h3>
                    <p className="text-[#6A707C] text-sm">{doubt.topic}</p>
                    <p className="text-[#6A707C] text-sm mt-1">
                      Student: {doubt.studentName} ({doubt.rollNumber})
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                      {doubt.doubtCount} doubts
                    </span>
                    <span className="text-[#6A707C] text-xs">
                      {new Date(doubt.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => handleViewDoubt(doubt)}
                    className="text-sm px-4 py-2 bg-black text-white rounded-[6px] hover:bg-gray-800"
                  >
                    View Details
                  </button>
                  <button 
                    className="text-sm px-4 py-2 border border-[#DADADA] rounded-[6px] hover:border-black"
                  >
                    Mark as Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isDoubtModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsDoubtModalOpen(false)}></div>
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="relative bg-white rounded-lg max-w-3xl w-full mx-4 p-6 z-50">
                {selectedDoubt && (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#1E232C]">
                          Doubt Details
                        </h3>
                        <p className="text-[#6A707C] mt-1">
                          Question #{selectedDoubt.questionNumber} - {selectedDoubt.subject}
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsDoubtModalOpen(false)}
                        className="text-gray-500 hover:text-black"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-600">Student Name</p>
                          <p className="font-medium">{selectedDoubt.studentName}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-600">Roll Number</p>
                          <p className="font-medium">{selectedDoubt.rollNumber}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">Doubt Description</p>
                        <p className="mt-1">{selectedDoubt.description}</p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600 mb-2">Attachments</p>
                        <div className="flex gap-2">
                          {selectedDoubt.attachments.map((file, index) => (
                            <button
                              key={index}
                              className="px-3 py-1 text-sm border rounded-md hover:border-black"
                            >
                              View {file}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button 
                          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                          onClick={() => {
                            setIsDoubtModalOpen(false);
                            setIsReviewModalOpen(true);
                          }}
                        >
                          Review Paper
                        </button>
                        <button 
                          className="px-4 py-2 border border-gray-300 rounded-md hover:border-black"
                          onClick={() => setIsDoubtModalOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#1E232C]">Upload Solution Video</h2>
            <span className="text-[#6A707C] text-sm">Max size: 100MB</span>
          </div>
          
          <div className="space-y-4">
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

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4"> {/* Changed to 3 columns */}
                <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                  <p className="text-[#1E232C] font-medium mb-2">Subject</p>
                  <select className="w-full text-sm text-[#6A707C] bg-transparent border border-[#DADADA] rounded-md 
                                   focus:outline-none focus:border-black p-2">
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>

                <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                  <p className="text-[#1E232C] font-medium mb-2">Paper</p>
                  <select className="w-full text-sm text-[#6A707C] bg-transparent border border-[#DADADA] rounded-md 
                                   focus:outline-none focus:border-black p-2">
                    <option value="">Select Paper</option>
                    <option value="mid">Mid Semester</option>
                    <option value="end">End Semester</option>
                  </select>
                </div>

                <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                  <p className="text-[#1E232C] font-medium mb-2">Question</p>
                  <select className="w-full text-sm text-[#6A707C] bg-transparent border border-[#DADADA] rounded-md 
                                   focus:outline-none focus:border-black p-2">
                    <option value="">Select Question</option>
                    <option value="1">Question 1</option>
                    <option value="2">Question 2</option>
                    <option value="3">Question 3</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                  <p className="text-[#1E232C] font-medium mb-2">Part</p>
                  <select className="w-full text-sm text-[#6A707C] bg-transparent border border-[#DADADA] rounded-md 
                                   focus:outline-none focus:border-black p-2">
                    <option value="">Select Part</option>
                    <option value="a">Part A</option>
                    <option value="b">Part B</option>
                    <option value="c">Part C</option>
                  </select>
                </div>

                <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                  <p className="text-[#1E232C] font-medium mb-2">Title</p>
                  <input
                    type="text"
                    placeholder="Enter video title"
                    className="w-full text-sm text-[#6A707C] bg-transparent border border-[#DADADA] rounded-md 
                             focus:outline-none focus:border-black p-2"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button className="px-8 py-2.5 bg-black text-white rounded-full
                                 hover:bg-gray-800 transition-all duration-300
                                 active:scale-95">
                  Upload Video
                </button>
              </div>

              <div className="mt-6 p-3 bg-[#F7F8F9] rounded-[8px]">
                <p className="text-[#6A707C] text-sm font-medium mb-3">Recent Uploads</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
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
        </div>

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
      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        selectedDoubt={selectedDoubt}
        reviewData={reviewData}
        setReviewData={setReviewData}
      />
    </div>
  );
}

export default TeacherDashboard;
