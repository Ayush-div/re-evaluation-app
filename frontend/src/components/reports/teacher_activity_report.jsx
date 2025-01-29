import React from 'react'

const TeacherActivityReport = () => {
  const teacherStats = [
    { 
      name: 'Dr. Sarah Johnson',
      department: 'Physics',
      evaluated: 28,
      avgTime: '3.2',
      accuracy: '95%'
    },
    { 
      name: 'Prof. Michael Chen',
      department: 'Mathematics',
      evaluated: 32,
      avgTime: '2.8',
      accuracy: '98%'
    },
    { 
      name: 'Dr. Emily Brown',
      department: 'Chemistry',
      evaluated: 24,
      avgTime: '3.5',
      accuracy: '92%'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Teacher Activity Analysis
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
            <h3 className="text-[#6A707C] text-sm mb-2">Active Teachers</h3>
            <p className="text-3xl font-bold text-[#1E232C]">45</p>
            <p className="text-sm text-green-500 mt-2">All departments</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Papers Reviewed</h3>
            <p className="text-3xl font-bold text-[#1E232C]">284</p>
            <p className="text-sm text-[#6A707C] mt-2">This semester</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Avg. Response Time</h3>
            <p className="text-3xl font-bold text-[#1E232C]">3.2</p>
            <p className="text-sm text-[#6A707C] mt-2">Days per paper</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Accuracy Rate</h3>
            <p className="text-3xl font-bold text-green-500">95%</p>
            <p className="text-sm text-[#6A707C] mt-2">Overall</p>
          </div>
        </div>

        {/* Teacher Performance Table */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1E232C] mb-6">Teacher Performance Metrics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F8F9] text-[#6A707C]">
                <tr>
                  <th className="text-left p-4 rounded-l-[8px]">Teacher Name</th>
                  <th className="text-left p-4">Department</th>
                  <th className="text-center p-4">Papers Evaluated</th>
                  <th className="text-center p-4">Avg. Time (days)</th>
                  <th className="text-center p-4 rounded-r-[8px]">Accuracy Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADADA]">
                {teacherStats.map((teacher, index) => (
                  <tr key={index} className="hover:bg-[#F7F8F9] transition-colors">
                    <td className="p-4 font-medium text-[#1E232C]">{teacher.name}</td>
                    <td className="p-4 text-[#6A707C]">{teacher.department}</td>
                    <td className="text-center p-4">{teacher.evaluated}</td>
                    <td className="text-center p-4">{teacher.avgTime}</td>
                    <td className="text-center p-4 text-green-500 font-medium">{teacher.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Insights */}
        <div className="grid md:grid-cols-2 gap-6 mb-8"></div>
          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
            <h2 className="text-lg font-bold text-[#1E232C] mb-4">Workload Distribution</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#6A707C]">Morning (8AM - 12PM)</span>
                <div className="w-48 bg-[#F7F8F9] rounded-full h-2">
                  <div className="bg-black w-3/4 h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
}

export default TeacherActivityReport;
