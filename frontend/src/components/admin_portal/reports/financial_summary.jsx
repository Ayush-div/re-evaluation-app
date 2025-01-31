import React from 'react'

const FinancialSummary = () => {
  const financialStats = {
    totalRevenue: "₹2,45,680",
    pendingPayments: "₹32,450",
    averagePerRequest: "₹850",
    successRate: "92%"
  }

  const monthlyData = [
    { month: 'January', revenue: '₹42,450', requests: 52 },
    { month: 'February', revenue: '₹38,720', requests: 45 },
    { month: 'March', revenue: '₹45,890', requests: 58 }
  ]

  const departments = [
    { name: 'Mathematics', amount: '₹85,450', percentage: 35 },
    { name: 'Physics', amount: '₹65,230', percentage: 27 },
    { name: 'Chemistry', amount: '₹52,800', percentage: 22 },
    { name: 'Computer Science', amount: '₹42,200', percentage: 16 }
  ]

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Financial Summary
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
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-[#1E232C]">{financialStats.totalRevenue}</p>
            <p className="text-sm text-green-500 mt-2">+8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-orange-500">{financialStats.pendingPayments}</p>
            <p className="text-sm text-[#6A707C] mt-2">42 pending requests</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Average per Request</h3>
            <p className="text-3xl font-bold text-[#1E232C]">{financialStats.averagePerRequest}</p>
            <p className="text-sm text-[#6A707C] mt-2">Last 30 days</p>
          </div>
          <div className="bg-white p-6 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
            <h3 className="text-[#6A707C] text-sm mb-2">Payment Success Rate</h3>
            <p className="text-3xl font-bold text-green-500">{financialStats.successRate}</p>
            <p className="text-sm text-[#6A707C] mt-2">All transactions</p>
          </div>
        </div>

        {/* Monthly Revenue Breakdown */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#1E232C]">Monthly Revenue Breakdown</h2>
            <select className="bg-[#F7F8F9] border border-[#DADADA] rounded-[8px] px-4 py-2 text-[#6A707C]
                           focus:outline-none focus:border-black">
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F8F9] text-[#6A707C]">
                <tr>
                  <th className="text-left p-4 rounded-l-[8px]">Month</th>
                  <th className="text-center p-4">Total Revenue</th>
                  <th className="text-center p-4 rounded-r-[8px]">Total Requests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADADA]">
                {monthlyData.map((month, index) => (
                  <tr key={index} className="hover:bg-[#F7F8F9] transition-colors">
                    <td className="p-4 font-medium text-[#1E232C]">{month.month}</td>
                    <td className="text-center p-4 text-green-500 font-medium">{month.revenue}</td>
                    <td className="text-center p-4">{month.requests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department-wise Revenue */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
            <h2 className="text-lg font-bold text-[#1E232C] mb-6">Revenue by Department</h2>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#1E232C] font-medium">{dept.name}</span>
                    <span className="text-[#6A707C]">{dept.amount}</span>
                  </div>
                  <div className="w-full bg-[#F7F8F9] rounded-full h-2">
                    <div 
                      className="bg-black h-2 rounded-full transition-all duration-500" 
                      style={{width: `${dept.percentage}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
            <h2 className="text-lg font-bold text-[#1E232C] mb-6">Payment Methods</h2>
            <div className="space-y-4">
              <div className="flex justify-between p-4 bg-[#F7F8F9] rounded-[8px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span className="text-[#1E232C] font-medium">Credit/Debit Cards</span>
                </div>
                <span className="text-[#6A707C]">65%</span>
              </div>
              <div className="flex justify-between p-4 bg-[#F7F8F9] rounded-[8px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[#1E232C] font-medium">UPI Payments</span>
                </div>
                <span className="text-[#6A707C]">35%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex justify-end gap-4">
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
    </div>
  )
}

export default FinancialSummary
