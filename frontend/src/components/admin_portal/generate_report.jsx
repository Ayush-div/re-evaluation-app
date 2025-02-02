import React from 'react'
import { Link } from 'react-router-dom';

const GenerateReport = () => {
  const reportTypes = [
    {
      title: "Student Performance Report",
      description: "Analyze re-evaluation patterns and outcomes",
      icon: (
        <svg className="w-8 h-8 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      route:'/organization/generate-report/student-report'

    },
    {
      title: "Teacher Activity Report",
      description: "Review evaluation time and efficiency",
      icon: (
        <svg className="w-8 h-8 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      route:'/organization/generate-report/teacher-report'
    },
    {
      title: "Financial Summary",
      description: "Revenue and payment analytics",
      icon: (
        <svg className="w-8 h-8 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      route:'/organization/generate-report/financial-summary'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Generate Report
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
        {/* Report Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 ">
          {reportTypes.map((report, index) => (
            <Link to={report.route}>
              <div
                key={index}
                className="bg-white p-6 rounded-[12px] border border-[#DADADA] 
              hover:shadow-lg hover:border-[#000000] hover:scale-[1.02]
              transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4 h-[55px]">
                  <div className="w-12 h-12 rounded-full bg-[#F7F8F9] flex items-center justify-center">
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E232C]">{report.title}</h3>
                    <p className="text-sm text-[#6A707C]">{report.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Report Configuration */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1E232C] mb-6">Report Configuration</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Range */}
            <div>
              <label className="block text-[#6A707C] text-sm mb-2">Date Range</label>
              <div className="flex gap-4">
                <input
                  type="date"
                  className="flex-1 h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000]"
                />
                <input
                  type="date"
                  className="flex-1 h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000]"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-[#6A707C] text-sm mb-2">Department</label>
              <select
                className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                         transition-all duration-300 
                         hover:shadow-md hover:border-gray-400 
                         focus:outline-none focus:border-[#000000]"
              >
                <option value="">All Departments</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
              </select>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <input type="checkbox" id="includeGraphs" className="rounded border-[#DADADA]" />
              <label htmlFor="includeGraphs" className="text-[#1E232C]">Include visual graphs and charts</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" id="detailedAnalysis" className="rounded border-[#DADADA]" />
              <label htmlFor="detailedAnalysis" className="text-[#1E232C]">Include detailed analysis</label>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex justify-end gap-4">
          <button
            className="px-6 py-3 border border-[#DADADA] rounded-[8px] text-[#1E232C]
                     transition-all duration-300
                     hover:border-black hover:shadow-md"
          >
            Preview Report
          </button>
          <button
            className="px-6 py-3 bg-black text-white rounded-[8px] 
                     transition-all duration-300
                     hover:bg-gray-800 hover:scale-[1.02]
                     active:scale-[0.98]"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default GenerateReport
