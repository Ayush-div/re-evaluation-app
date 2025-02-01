import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from '../../../public/icons/arrow';

const AdminDashboard = () => {
  const stats = {
    totalReEvaluations: 156,
    activeTeachers: 45,
    totalRevenue: "₹45,250",
    pendingReviews: 23
  }

  // Updated re-evaluation requests data with issue types
  const reEvaluationRequests = [
    {
      id: "REV-2023-001",
      studentName: "John Doe",
      studentId: "2021CS01",
      subject: "Mathematics",
      issueType: "CALCULATION_ERROR", // CALCULATION_ERROR, UNMARKED_ANSWER, INCORRECT_MARKING
      questionNumber: "4a",
      submittedAt: "2023-12-20T10:30:00",
      status: "pending_assignment",
      doubt: "The integration method used seems incorrect, expecting partial marks for correct steps",
      assignedTeacher: null
    },
    // Add more requests...
  ];

  // Issue type configuration with colors and labels
  const ISSUE_TYPES = {
    CALCULATION_ERROR: {
      label: "Calculation Errors",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 7h6m0 10H9m3 0v-6m3 0H9M3 3l18 18" />
        </svg>
      )
    },
    UNMARKED_ANSWER: {
      label: "Unmarked Answers",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20 12H4m16 0l-4 4m4-4l-4-4" />
        </svg>
      )
    },
    INCORRECT_MARKING: {
      label: "Incorrect Marking",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
  };

  // Enhanced subject analytics with more detailed metrics
  const subjectAnalytics = [
    {
      subject: "Mathematics",
      requests: 45,
      avgMarksChange: 2.5,
      issueBreakdown: {
        CALCULATION_ERROR: 20,
        UNMARKED_ANSWER: 15,
        INCORRECT_MARKING: 10
      },
      successRate: 75, // percentage of successful re-evaluations
      averageResponseTime: "2.5 days",
      pendingRequests: 8
    },
    {
      subject: "Physics",
      requests: 32,
      avgMarksChange: 1.8,
      issueBreakdown: {
        CALCULATION_ERROR: 12,
        UNMARKED_ANSWER: 10,
        INCORRECT_MARKING: 10
      },
      successRate: 68,
      averageResponseTime: "2.8 days",
      pendingRequests: 5
    },
    {
      subject: "Chemistry",
      requests: 28,
      avgMarksChange: 2.1,
      issueBreakdown: {
        CALCULATION_ERROR: 15,
        UNMARKED_ANSWER: 8,
        INCORRECT_MARKING: 5
      },
      successRate: 72,
      averageResponseTime: "2.2 days",
      pendingRequests: 6
    }
  ];

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState({
    requestId: null,
    teacherId: null,
    teacherName: null
  });

  const handleAutoAssign = (requestId) => {
    // Logic to automatically assign to available teachers
    console.log("Auto-assigning request:", requestId);
  };

  const handleManualAssign = (requestId, teacherId) => {
    // Get teacher name from value
    const selectElement = document.getElementById(`teacher-select-${requestId}`);
    const teacherName = selectElement.options[selectElement.selectedIndex].text;

    setSelectedAssignment({
      requestId,
      teacherId,
      teacherName
    });
    setShowConfirmModal(true);
  };

  const confirmAssignment = () => {
    // Implement the actual assignment logic here
    console.log("Confirmed assignment:", selectedAssignment);
    // Add your API call here to assign the teacher

    setShowConfirmModal(false);
    setSelectedAssignment({ requestId: null, teacherId: null, teacherName: null });
  };

  // Enhanced subject analytics card render
  // const renderSubjectAnalytics = () => (
  //   <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 ">
  //     <h2 className="text-lg font-bold text-[#1E232C] mb-4">Subject Analytics</h2>
  //     <div className="space-4 gap-4 grid grid-cols-1 ">
  //       {subjectAnalytics.map((subject, index) => (
  //         <div key={index} className="p-4 bg-[#F7F8F9] rounded-[8px] ">
  //           <div className="flex justify-between items-start mb-3">
  //             <h3 className="font-semibold text-[#1E232C]">{subject.subject}</h3>
  //             <span className="text-sm text-[#6A707C]">{subject.requests} requests</span>
  //           </div>

  //           { /* Progress bar */}
  //           <div className='flex justify-center flex-col items-center'>

  //             <div className="flex items-center gap-2 mb-3 ">
  //               <div className="flex-1 h-2 bg-gray-200 rounded-full">
  //                 <div
  //                   className="h-2 bg-black rounded-full"
  //                   style={{ width: `${(subject.requests / stats.totalReEvaluations) * 100}%` }}
  //                 />
  //               </div>
  //               <span className="text-xs text-green-600">
  //                 Avg. +{subject.avgMarksChange} marks
  //               </span>
  //             </div>

  //             {/* Issue breakdown */}
  //             <div className="grid grid-cols-3 gap-2 text-xs mb-3 ">
  //               {Object.entries(subject.issueBreakdown).map(([issue, count]) => (
  //                 <div key={issue} className="text-center">
  //                   <div className={`${ISSUE_TYPES[issue].bgColor} ${ISSUE_TYPES[issue].textColor} p-1 rounded-md`}>
  //                     {count}
  //                   </div>
  //                   <p className="text-[#6A707C] mt-1 text-[10px]">
  //                     {ISSUE_TYPES[issue].label}
  //                   </p>
  //                 </div>
  //               ))}
  //             </div>

  //           </div>
  //           {/* Additional metrics */}
  //           <div className="flex justify-between text-xs text-[#6A707C] pt-2 border-t border-gray-200">
  //             <span>Success Rate: {subject.successRate}%</span>
  //             <span>Avg Response: {subject.averageResponseTime}</span>
  //             <span>Pending: {subject.pendingRequests}</span>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  const renderConfirmationModal = () => {
    if (!showConfirmModal) return null;

    return (
      <div className="fixed inset-0 bg-opacity-50  backdrop-blur-sm flex items-center justify-center z-50 ">
        <div className="bg-white rounded-[12px] p-6 max-w-md w-full mx-4  border-black border-[0.69px] ">
          <h3 className="text-lg font-bold text-[#1E232C] mb-4">Confirm Assignment</h3>
          <p className="text-[#6A707C] mb-4">
            Are you sure you want to assign this re-evaluation request to {selectedAssignment.teacherName}?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 text-sm border border-[#DADADA] rounded-[8px] hover:border-black transition-all"
            >
              Cancel
            </button>
            <button
              onClick={confirmAssignment}
              className="px-4 py-2 text-sm bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all"
            >
              Confirm Assignment
            </button>
          </div>
        </div>
      </div>
    );
  };

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
            <p className="text-[#6A707C] text-sm">Total Re-evaluations</p>
            <p className="text-2xl font-bold text-[#1E232C] mt-1">{stats.totalReEvaluations}</p>
          </div>
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Active Teachers</p>
            <p className="text-2xl font-bold text-[#000000] mt-1">{stats.activeTeachers}</p>
          </div>
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Pending Reviews</p>
            <p className="text-2xl font-bold text-orange-500 mt-1">{stats.pendingReviews}</p>
          </div>
          <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <p className="text-[#6A707C] text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.totalRevenue}</p>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions Card - Replacing Verification Tasks */}
          <div className="group bg-white rounded-[12px] border border-[#DADADA] p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#1E232C]">Quick Actions</h2>
              <ArrowIcon />
            </div>
            <div className="space-y-3">
              <Link to='/admin/add-teacher'>
                <div className="p-4 bg-[#F7F8F9] rounded-[8px] hover:shadow-sm transition-all cursor-pointer group ">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-[#1E232C] group-hover:text-black">Add New Teacher</p>
                      <p className="text-sm text-[#6A707C] ">Register teacher account</p>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link to='/admin/add-student'>
                <div className="p-4 bg-[#F7F8F9] rounded-[8px] hover:shadow-sm transition-all cursor-pointer group mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-[#1E232C] group-hover:text-black">Add New Student</p>
                      <p className="text-sm text-[#6A707C]">Register student account</p>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </Link>
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
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
                <p className="text-[#6A707C] text-sm">Pending Payments</p>
                <p className="text-xl font-bold text-orange-500">₹5,240</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
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

        {/* Re-evaluation Requests Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 ">
          {/* Recent Requests - Now takes exactly one column */}
          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 w-full h-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#1E232C]">Recent Re-evaluation Requests</h2>
                <p className="text-sm text-[#6A707C] mt-1">Manage and assign requests to teachers</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 text-sm border border-[#DADADA] rounded-[8px] 
                             hover:border-black transition-all flex items-center gap-2 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Auto-assign All
                </button>
                <button
                  className="px-4 py-2 text-sm bg-black text-white rounded-[8px] 
                             hover:bg-gray-800 transition-all flex items-center gap-2"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {reEvaluationRequests.map(request => (
                <div key={request.id} className="p-4 bg-[#F7F8F9] rounded-[8px] hover:shadow-md transition-all">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                    {/* Request Details */}
                    <div className="flex-grow w-full lg:w-auto">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-semibold text-[#1E232C]">
                          {request.subject} - Question {request.questionNumber}
                        </h3>
                        <span className={`px-3 py-1 ${ISSUE_TYPES[request.issueType].bgColor} 
                                ${ISSUE_TYPES[request.issueType].textColor} 
                                text-xs rounded-full flex items-center gap-1 whitespace-nowrap`}>
                          {ISSUE_TYPES[request.issueType].icon}
                          {ISSUE_TYPES[request.issueType].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-[#6A707C] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-sm text-[#6A707C]">{request.studentName} ({request.studentId})</p>
                      </div>
                      <p className="text-sm text-[#6A707C] bg-white p-3 rounded-md border border-[#DADADA]">
                        "{request.doubt}"
                      </p>
                    </div>

                    {/* Actions Section */}
                    <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[200px]">
                      <span className="text-xs text-[#6A707C] bg-[#F0F1F3] px-2 py-1 rounded-full self-end">
                        {new Date(request.submittedAt).toLocaleString()}
                      </span>
                      <div className='grid md:grid-cols-2 gap-4 '> 
                        <div className="flex flex-col gap-2  ">
                          <button
                            onClick={() => handleAutoAssign(request.id)}
                            className=" px-3 py-2 text-xs bg-black text-white rounded-[8px] 
                          hover:bg-gray-800 transition-all flex items-center justify-center gap-2 "
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M5 13l4 4L19 7" />
                            </svg>
                            Auto-assign
                          </button>
                        </div>
                        <select
                          id={`teacher-select-${request.id}`}
                          onChange={(e) => handleManualAssign(request.id, e.target.value)}
                          className="w-full px-3 py-2 text-xs border rounded-[8px] 
                                   focus:outline-none focus:border-black bg-white"
                        >
                          <option value="">Select Teacher</option>
                          <option value="1">Dr. Smith (Mathematics)</option>
                          <option value="2">Prof. Johnson (Mathematics)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 w-full h-full w-[50vw]">
            <h2 className="text-lg font-bold text-[#1E232C] mb-4">Subject Analytics</h2>
            <div className="space-y-4">
              {subjectAnalytics.map((subject, index) => (
                <div key={index} className="p-4 bg-[#F7F8F9] rounded-[8px]">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-[#1E232C]">{subject.subject}</h3>
                    <span className="text-sm text-[#6A707C]">{subject.requests} requests</span>
                  </div>
                  <div className='flex justify-center flex-col items-center'>
                    <div className="flex items-center gap-2 mb-3 w-[70vw]">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-black rounded-full"
                          style={{ width: `${(subject.requests / stats.totalReEvaluations) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-green-600">
                        Avg. +{subject.avgMarksChange} marks
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs mb-3 w-[50vw]">
                      {Object.entries(subject.issueBreakdown).map(([issue, count]) => (
                        <div key={issue} className="text-center">
                          <div className={`${ISSUE_TYPES[issue].bgColor} ${ISSUE_TYPES[issue].textColor} p-1 rounded-md`}>
                            {count}
                          </div>
                          <p className="text-[#6A707C] mt-1 text-[10px]">
                            {ISSUE_TYPES[issue].label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-[#6A707C] pt-2 border-t border-gray-200">
                    <span>Success Rate: {subject.successRate}%</span>
                    <span>Avg Response: {subject.averageResponseTime}</span>
                    <span>Pending: {subject.pendingRequests}</span>
                  </div>
                </div>
              ))}
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
      {((selectedAssignment.teacherName != 'Select Teacher')) ? renderConfirmationModal() : null}
    </div>
    // </div>
  )
}

export default AdminDashboard
