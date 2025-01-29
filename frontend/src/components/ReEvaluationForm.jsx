import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReEvaluationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    subject: '',
    questionPaper: null,
    selectedQuestions: [],
    remarks: {},
    doubts: {},
    issueTypes: {} // Add this to track issue types for each question
  });
  const [expandedStats, setExpandedStats] = useState({});

  const toggleStats = (subpartId) => {
    setExpandedStats(prev => ({
      ...prev,
      [subpartId]: !prev[subpartId]
    }));
  };

  // Mock data (replace with actual API data)
  const subjects = [
    { id: 1, name: 'Mathematics', fee: 500, paper: '/path/to/math-paper.pdf' },
    { id: 2, name: 'Physics', fee: 500, paper: '/path/to/physics-paper.pdf' },
    { id: 3, name: 'Chemistry', fee: 500, paper: '/path/to/chemistry-paper.pdf' }
  ];

  // Update the questions mock data structure
  const questions = [
    {
      number: 1,
      title: "Calculus Integration",
      subparts: [
        { 
          id: '1a', 
          text: 'First part of question 1', 
          marks: 5,
          stats: {
            doubts: 12,
            marksChangeProb: "80%",
            commonIssues: "Calculation error",
            avgMarksChange: "+2"
          }
        },
        { 
          id: '1b', 
          text: 'Second part of question 1', 
          marks: 5,
          stats: {
            doubts: 8,
            marksChangeProb: "45%",
            commonIssues: "Concept misunderstanding",
            avgMarksChange: "+1"
          }
        },
        { 
          id: '1c', 
          text: 'Third part of question 1', 
          marks: 5,
          stats: {
            doubts: 3,
            marksChangeProb: "30%",
            commonIssues: "Incomplete answer",
            avgMarksChange: "+0.5"
          }
        }
      ]
    },
    {
      number: 2,
      title: "Differential Equations",
      subparts: [
        { 
          id: '2a', 
          text: 'First part of question 2', 
          marks: 8,
          stats: {
            doubts: 15,
            marksChangeProb: "65%",
            commonIssues: "Method selection",
            avgMarksChange: "+3"
          }
        },
        { 
          id: '2b', 
          text: 'Second part of question 2', 
          marks: 7,
          stats: {
            doubts: 20,
            marksChangeProb: "75%",
            commonIssues: "Final step error",
            avgMarksChange: "+2"
          }
        }
      ]
    }
  ];

  // Add issue types constant
  const ISSUE_TYPES = {
    CALCULATION: 'Calculation Errors',
    UNMARKED: 'Unmarked Answers',
    INCORRECT: 'Incorrect Marking'
  };

  const handleSubjectSelect = (subject) => {
    setFormData({ ...formData, subject });
    setStep(2);
  };

  const handleQuestionSelect = (questionId) => {
    setFormData(prev => ({
      ...prev,
      selectedQuestions: prev.selectedQuestions.includes(questionId)
        ? prev.selectedQuestions.filter(id => id !== questionId)
        : [...prev.selectedQuestions, questionId]
    }));
  };

  const handleRemarkChange = (questionNo, remark) => {
    setFormData({
      ...formData,
      remarks: { ...formData.remarks, [questionNo]: remark }
    });
  };

  // Add handler for issue type selection
  const handleIssueTypeSelect = (questionId, issueType) => {
    setFormData(prev => ({
      ...prev,
      issueTypes: {
        ...prev.issueTypes,
        [questionId]: issueType
      }
    }));
  };

  const renderSubpart = (subpart) => (
    <div key={subpart.id} className="bg-white rounded-[8px] p-4 border border-[#DADADA]">
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={formData.selectedQuestions.includes(subpart.id)}
          onChange={() => handleQuestionSelect(subpart.id)}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-[#1E232C] font-bold">Part {subpart.id.slice(-1)} ({subpart.marks} marks)</p>
              <p className="text-[#6A707C] text-sm">{subpart.text}</p>
            </div>
            <button
              onClick={() => toggleStats(subpart.id)}
              className="flex items-center gap-2 text-sm text-[#6A707C] hover:text-[#1E232C] transition-colors px-3 py-1 rounded-md hover:bg-[#F7F8F9]"
            >
              View Stats
              <svg 
                className={`w-4 h-4 transition-transform ${expandedStats[subpart.id] ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {expandedStats[subpart.id] && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2 mt-3">
              <div className="flex flex-col bg-[#F7F8F9] p-3 rounded-[6px]">
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-[#1E232C] font-medium">{subpart.stats.doubts} students</span>
                </div>
                <p className="text-[#6A707C] text-xs">
                  have requested re-evaluation (last 30 days)
                </p>
              </div>
              
              <div className="flex flex-col bg-[#F7F8F9] p-3 rounded-[6px]">
                <div className="flex items-center mb-1">
                  <div className={`w-2 h-2 rounded-full ${
                    parseInt(subpart.stats.marksChangeProb) > 70 
                      ? 'bg-green-500' 
                      : parseInt(subpart.stats.marksChangeProb) > 40 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                  } mr-2`}></div>
                  <span className="text-[#1E232C] font-medium">{subpart.stats.marksChangeProb} success rate</span>
                </div>
                <p className="text-[#6A707C] text-xs">
                  received marks revision
                </p>
              </div>
              
              <div className="flex flex-col bg-[#F7F8F9] p-3 rounded-[6px]">
                <p className="text-[#1E232C]  font-medium mb-1">Common Issue:</p>
                <p className="text-[#6A707C] text-xs">"{subpart.stats.commonIssues}"</p>
              </div>
              
              <div className="flex flex-col bg-[#F7F8F9] p-3 rounded-[6px]">
                <p className="text-[#1E232C] font-medium mb-1">Avg. Marks Increase:</p>
                <p className="text-[#6A707C] text-xs">+{subpart.stats.avgMarksChange} marks</p>
              </div>
            </div>
          )}
          
          {formData.selectedQuestions.includes(subpart.id) && (
            <div className="mt-3 space-y-3">
              <div className="flex flex-wrap gap-2">
                {Object.entries(ISSUE_TYPES).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleIssueTypeSelect(subpart.id, value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                      ${formData.issueTypes[subpart.id] === value
                        ? 'bg-black text-white'
                        : 'bg-[#F7F8F9] text-[#6A707C] hover:bg-gray-200'
                      }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              
              <textarea
                placeholder="Enter your specific remarks/doubts for this part..."
                className="w-full p-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-[#000000] text-sm"
                onChange={(e) => handleRemarkChange(subpart.id, e.target.value)}
                value={formData.remarks[subpart.id] || ''}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#1E232C] mb-4">Select Subject</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.map(subject => (
                <div
                  key={subject.id}
                  onClick={() => handleSubjectSelect(subject)}
                  className="bg-white p-4 rounded-[12px] border border-[#DADADA] 
                    hover:shadow-md cursor-pointer transition-all duration-300
                    hover:border-[#000000] hover:scale-[1.02]
                    active:scale-[0.98]"
                >
                  <h4 className="text-[#1E232C] text-base font-bold mb-1">{subject.name}</h4>
                  <p className="text-[#6A707C] text-sm">Re-evaluation fee: ₹{subject.fee}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#1E232C] mb-4">Question Paper Review</h3>
            <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
              <div className="bg-[#F7F8F9] p-4 rounded-[12px]">
                Question Paper Viewer
              </div>
              
              <div className="mt-6 space-y-6">
                {questions.map((question) => (
                  <div key={question.number} className="bg-[#F7F8F9] rounded-[12px] p-4">
                    <h4 className="text-[#1E232C] text-lg font-bold mb-4">
                      Question {question.number}: {question.title}
                    </h4>

                    <div className="space-y-3">
                      {question.subparts.map(renderSubpart)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 border border-[#DADADA] rounded-[8px] text-[#6A707C] 
                  hover:text-[#000000] hover:border-[#000000] transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2 bg-[#000000] text-white rounded-[8px] 
                  hover:bg-[#FFFFFF] hover:text-black hover:border-[.69px] transition-all duration-300"
                disabled={formData.selectedQuestions.length === 0}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#1E232C] mb-4">Payment</h3>
            <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
              <div className="space-y-2">
                <p className="text-[#6A707C]">Selected Parts: {formData.selectedQuestions.length}</p>
                <p className="text-[#6A707C]">Fee per Part: ₹{formData.subject.fee}</p>
                <p className="text-xl font-bold text-[#1E232C]">Total: ₹{formData.selectedQuestions.length * formData.subject.fee}</p>
              </div>
              
              <button
                className="mt-6 w-full py-2 bg-[#000000] text-white rounded-[8px] 
                  hover:bg-[#FFFFFF] hover:text-black hover:border-[.69px] transition-all duration-300"
                onClick={() => {
                  alert('Payment processing...');
                }}
              >
                Pay Now
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map(stepNo => (
              <div
                key={stepNo}
                className={`w-1/3 h-2 rounded-full ${
                  step >= stepNo ? 'bg-[#000000]' : 'bg-[#DADADA]'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className={step >= 1 ? 'text-[#1E232C]' : 'text-[#6A707C]'}>Select Subject</span>
            <span className={step >= 2 ? 'text-[#1E232C]' : 'text-[#6A707C]'}>Review Questions</span>
            <span className={step >= 3 ? 'text-[#1E232C]' : 'text-[#6A707C]'}>Payment</span>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

export default ReEvaluationForm;
