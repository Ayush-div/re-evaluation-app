import React, { useState } from 'react';

const ReEvaluationStatus = () => {
  // Mock data for re-evaluation applications
  const applications = [
    {
      id: "REV-2023-001",
      subject: "Mathematics",
      appliedDate: "2023-12-01",
      expectedCompletion: "2023-12-15",
      status: "under_review", // pending, under_review, with_teacher, completed, rejected
      questionParts: ["1a", "2b", "3c"],
      currentStage: 3,
      stages: [
        { name: "Applied", date: "2023-12-01", completed: true },
        { name: "Document Verification", date: "2023-12-02", completed: true },
        { name: "With Organization", date: "2023-12-03", completed: true },
        { name: "Under Teacher Review", date: "2023-12-05", completed: false },
        { name: "Final Assessment", date: null, completed: false },
        { name: "Completed", date: null, completed: false }
      ],
      remarks: "Currently being reviewed by subject expert"
    },
    {
      id: "REV-2023-002",
      subject: "Physics",
      appliedDate: "2023-11-28",
      expectedCompletion: "2023-12-12",
      status: "completed",
      questionParts: ["4a", "4b"],
      currentStage: 6,
      stages: [
        { name: "Applied", date: "2023-11-28", completed: true },
        { name: "Document Verification", date: "2023-11-29", completed: true },
        { name: "With Organization", date: "2023-11-30", completed: true },
        { name: "Under Teacher Review", date: "2023-12-02", completed: true },
        { name: "Final Assessment", date: "2023-12-05", completed: true },
        { name: "Completed", date: "2023-12-06", completed: true }
      ],
      remarks: "Marks updated: +3 marks"
    }
  ];

  const [selectedApp, setSelectedApp] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500",
      under_review: "bg-blue-500",
      with_teacher: "bg-purple-500",
      completed: "bg-green-500",
      rejected: "bg-red-500"
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1E232C] mb-6">Re-evaluation Status</h1>
        
        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {applications.map(app => (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app.id === selectedApp ? null : app.id)}
              className={`bg-white rounded-[12px] border ${
                app.id === selectedApp ? 'border-black' : 'border-[#DADADA]'
              } p-6 cursor-pointer hover:shadow-md transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1E232C]">{app.subject}</h3>
                  <p className="text-[#6A707C] text-sm">ID: {app.id}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(app.status)}`}>
                  {app.status.replace('_', ' ').toUpperCase()}
                </div>
              </div>

              <div className="flex gap-4 text-sm text-[#6A707C] mb-4">
                <div>
                  <p>Applied: {app.appliedDate}</p>
                  <p>Expected: {app.expectedCompletion}</p>
                </div>
                <div>
                  <p>Questions: {app.questionParts.join(', ')}</p>
                  <p>{app.remarks}</p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className={`transition-all duration-300 overflow-hidden ${
                app.id === selectedApp ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="relative mt-4">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  {app.stages.map((stage, index) => (
                    <div key={index} className="flex items-start mb-4 relative">
                      <div className={`w-8 h-8 rounded-full border-2 ${
                        stage.completed 
                          ? 'bg-black border-black' 
                          : 'bg-white border-gray-300'
                      } flex items-center justify-center relative z-10`}>
                        {stage.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-[#1E232C] font-medium">{stage.name}</p>
                        {stage.date && (
                          <p className="text-[#6A707C] text-sm">{stage.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Past Applications Section */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
          <h2 className="text-lg font-bold text-[#1E232C] mb-4">Past Re-evaluations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F8F9]">
                <tr>
                  <th className="px-4 py-2 text-left text-[#1E232C]">ID</th>
                  <th className="px-4 py-2 text-left text-[#1E232C]">Subject</th>
                  <th className="px-4 py-2 text-left text-[#1E232C]">Applied Date</th>
                  <th className="px-4 py-2 text-left text-[#1E232C]">Completion Date</th>
                  <th className="px-4 py-2 text-left text-[#1E232C]">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Mock past applications */}
                <tr className="hover:bg-[#F7F8F9]">
                  <td className="px-4 py-3 text-[#6A707C]">REV-2023-001</td>
                  <td className="px-4 py-3 text-[#6A707C]">Mathematics</td>
                  <td className="px-4 py-3 text-[#6A707C]">2023-11-15</td>
                  <td className="px-4 py-3 text-[#6A707C]">2023-11-28</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      +2 Marks
                    </span>
                  </td>
                </tr>
                {/* Add more past applications... */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReEvaluationStatus;
