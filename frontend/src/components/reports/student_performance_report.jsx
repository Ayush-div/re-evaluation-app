import React from 'react'

const StudentPerformanceReport = () => {
  const departmentStats = [
    { name: 'Mathematics', reevaluations: 45, approved: 32, rejected: 13, avgScore: '+2.3' },
    { name: 'Physics', reevaluations: 38, approved: 28, rejected: 10, avgScore: '+1.8' },
    { name: 'Chemistry', reevaluations: 29, approved: 20, rejected: 9, avgScore: '+2.1' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Student Performance Analysis
            </div>
            <button 
              onClick={() => window.history.back()}
              className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300"
            >
              Back to Reports
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Total Re-evaluations</h3>
            <p className="text-3xl font-bold text-[#1E232C]">112</p>
            <p className="text-sm text-green-500 mt-2">+12% from last semester</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Approved Changes</h3>
            <p className="text-3xl font-bold text-[#1E232C]">80</p>
            <p className="text-sm text-[#6A707C] mt-2">71.4% success rate</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Average Score Change</h3>
            <p className="text-3xl font-bold text-green-500">+2.1</p>
            <p className="text-sm text-[#6A707C] mt-2">Points per approval</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Processing Time</h3>
            <p className="text-3xl font-bold text-[#1E232C]">4.2</p>
            <p className="text-sm text-[#6A707C] mt-2">Days average</p>
          </div>
        </div>

        {/* Trend Analysis - Fixed Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
            <h2 className="text-lg font-bold text-[#1E232C] mb-4">Common Reasons for Re-evaluation</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#6A707C] w-32">Calculation Errors</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-[#F7F8F9] rounded-full h-2">
                    <div className="bg-black h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
                <span className="text-[#1E232C] font-medium w-12 text-right">80%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6A707C] w-32">Unmarked Answers</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-[#F7F8F9] rounded-full h-2">
                    <div className="bg-black h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <span className="text-[#1E232C] font-medium w-12 text-right">60%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6A707C] w-32">Incorrect Marking</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-[#F7F8F9] rounded-full h-2">
                    <div className="bg-black h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
                <span className="text-[#1E232C] font-medium w-12 text-right">40%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
            <h2 className="text-lg font-bold text-[#1E232C] mb-4">Student Satisfaction</h2>
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-black mb-4">
                  <p className="text-4xl font-bold text-[#1E232C]">92%</p>
                </div>
                <p className="text-[#6A707C]">Satisfied with re-evaluation process</p>
              </div>
            </div>
          </div>
        </div>

        {/* Department-wise Analysis */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#1E232C]">Department-wise Analysis</h2>
            <select className="bg-[#F7F8F9] border border-[#DADADA] rounded-[8px] px-4 py-2 text-[#6A707C]
                           focus:outline-none focus:border-black">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F8F9] text-[#6A707C]">
                <tr>
                  <th className="text-left p-4 rounded-l-[8px]">Department</th>
                  <th className="text-center p-4">Total Re-evaluations</th>
                  <th className="text-center p-4">Approved</th>
                  <th className="text-center p-4">Rejected</th>
                  <th className="text-center p-4 rounded-r-[8px]">Avg. Score Change</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((dept, index) => (
                  <tr key={index} className="hover:bg-[#F7F8F9] transition-colors">
                    <td className="text-left p-4">{dept.name}</td>
                    <td className="text-center p-4">{dept.reevaluations}</td>
                    <td className="text-center p-4 text-green-500">{dept.approved}</td>
                    <td className="text-center p-4 text-red-500">{dept.rejected}</td>
                    <td className="text-center p-4 font-medium text-green-500">{dept.avgScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex justify-end gap-4"></div>
          <button className="px-6 py-2 border border-[#DADADA] rounded-[8px] text-[#1E232C] 
                         hover:border-black transition-all duration-300">
            Download PDF
          </button>
          <button className="px-6 py-2 bg-black text-white rounded-[8px] 
                         hover:bg-gray-800 transition-all duration-300">
            Share Report
          </button>
        </div>
      </div>
    // </div>
  )
}

export default StudentPerformanceReport
