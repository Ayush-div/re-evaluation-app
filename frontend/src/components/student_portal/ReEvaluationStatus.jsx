import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReEvaluationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const studentData = JSON.parse(localStorage.getItem('studentData'));
      if (!studentData) {
        throw new Error('No student data found');
      }

      const response = await axios.get('/api/students/reevaluation-status', {
        withCredentials: true
      });

      if (response.data.success) {
        const formattedApplications = response.data.data.map(app => ({
          id: app._id,
          subject: app.subject,
          appliedDate: new Date(app.createdAt).toLocaleDateString() ,
          expectedCompletion: new Date(app.createdAt).setDate(new Date(app.createdAt).getDate() + 14),
          status: app.status,
          questionParts: app.selectedQuestions.map(q => ({
            id: q.questionId,
            remarks: q.remarks,
            issueType: q.issueType,
            customDescription: q.customDescription
          })),
          currentStage: getStageNumber(app.status),
          organization: app.organizationId?.organizationName || 'N/A',
          teacher: app.assignedTeacher?.teacherName || 'Not assigned',
          stages: [
            { 
              name: "Applied", 
              date: new Date(app.createdAt).toLocaleDateString(), 
              completed: true 
            },
            { 
              name: "With Organization", 
              date: app.status === 'in_review' || app.status === 'completed' ? new Date(app.updatedAt).toLocaleDateString() : null, 
              completed: app.status === 'in_review' || app.status === 'completed' 
            },
            { 
              name: "Under Teacher Review", 
              date: app.assignedTeacher ? new Date(app.updatedAt).toLocaleDateString() : null, 
              completed: app.assignedTeacher !== null 
            },
            { 
              name: "Completed", 
              date: app.status === 'completed' ? new Date(app.updatedAt).toLocaleDateString() : null, 
              completed: app.status === 'completed' 
            }
          ],
          remarks: app.remarks || getDefaultRemarks(app.status)
        }));

        setApplications(formattedApplications);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStageNumber = (status) => {
    const stageMap = {
      'pending': 1,
      'in_review': 3,
      'completed': 6,
      'rejected': 6
    };
    return stageMap[status] || 1;
  };

  const getDefaultRemarks = (status) => {
    const remarkMap = {
      'pending': 'Application is being processed',
      'in_review': 'Currently under review by the organization',
      'completed': 'Review process completed',
      'rejected': 'Application was rejected'
    };
    return remarkMap[status] || 'Status unknown';
  };

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

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6A707C]">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const renderApplicationCard = (app) => (
    <div 
      key={app.id} 
      onClick={() => setSelectedApp(app.id === selectedApp ? null : app.id)}
      className={`bg-white rounded-[12px] border ${app.id === selectedApp ? 'border-black' : 'border-[#DADADA]'
        } p-6 cursor-pointer hover:shadow-md transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#1E232C]">{app.subject}</h3>
          <p className="text-[#6A707C] text-sm">Organization: {app.organization}</p>
          <p className="text-[#6A707C] text-sm">Teacher: {app.teacher}</p>
          <p className="text-[#6A707C] text-sm">Applied: {app.appliedDate}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(app.status)}`}>
          {app.status.replace('_', ' ').toUpperCase()}
        </div>
      </div>

      {/* Questions Section */}
      <div className="mt-4 mb-4">
        <h4 className="font-medium text-[#1E232C] mb-2">Selected Questions:</h4>
        <div className="space-y-2">
          {app.questionParts.map(question => (
            <div key={question.id} className="bg-gray-50 p-3 rounded">
              <p className="font-medium">Question {question.id}</p>
              {question.issueType && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  question.issueType === 'Calculation Errors' ? 'bg-orange-100 text-orange-800' :
                  question.issueType === 'Unmarked Answers' ? 'bg-purple-100 text-purple-800' :
                  question.issueType === 'Incorrect Marking' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {question.issueType}
                </span>
              )}
              {question.remarks && (
                <p className="text-sm text-gray-600 mt-2">
                  Remarks: {question.remarks}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Timeline - Only show when expanded */}
      <div className={`transition-all duration-300 overflow-hidden ${
        app.id === selectedApp ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="relative mt-4 border-t pt-4">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          {app.stages.map((stage, index) => (
            <div key={index} className="flex items-start mb-4 relative">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center relative z-10
                ${stage.completed ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                {stage.completed && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium text-[#1E232C]">{stage.name}</p>
                {stage.date && (
                  <p className="text-sm text-[#6A707C]">{stage.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1E232C] mb-6">Your Re-evaluation Applications</h1>
        
        {applications.length === 0 ? (
          <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 text-center">
            <p className="text-[#6A707C]">No re-evaluation applications found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map(renderApplicationCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReEvaluationStatus;