import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReEvaluationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([{ id: '', name: '', fee: '', paper: '' }])

  const [questionsBySubject, setQuestionsBySubject] = useState({});
  const [formData, setFormData] = useState({
    subject: '',
    questionPaper: null,
    selectedQuestions: [],
    remarks: {},
    doubts: {},
    issueTypes: {},
    customIssueDescriptions: {}
  });
  const [expandedStats, setExpandedStats] = useState({});

  useEffect(() => {
    fetchReEvaluationData();
  }, []);

  const fetchReEvaluationData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/students/get-papers-for-reevaluation', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Raw API Response:', response.data);

      if (response.data?.data) {
        const papers = response.data.data; 

        const formattedSubjects = papers.map(paperData => ({
          id: paperData._id,
          name: paperData.subjectName,
          examDate  : new Date(paperData.examDate).toLocaleDateString(),
          department: paperData.department,
          semester: paperData.semester,
          totalMarks: paperData.totalMarks,
          duration: paperData.duration,
          fee: 500,
          paper: paperData.questionPdfPath
        }));

        const formattedQuestionsBySubject = papers.reduce((acc, paperData) => {
          const formattedQuestions = paperData.questions.map(question => ({
            number: question.id,
            title: `Question ${question.id}`,
            marks: question.marks,
            stats: {
              doubts: question.doubts || 0,
              commonIssues: question.commonIssues || 'No common issues reported',
              marksChangeProb: question.marksChangePercentage || '0%',
              avgMarksChange: question.averageMarksChange || '+0'
            },
            subpart: (question.subparts || []).map(subpart => ({
              id: `q${question.id}_${subpart.id}`, 
              marks: subpart.marks,
              text: `Part ${subpart.id}`,
              stats: {
                doubts: subpart.doubts || 0,
                commonIssues: subpart.commonIssues || 'No common issues reported',
              },
              subpartOfSubpart: (subpart.subsubparts || []).map(subsub => ({
                id: `q${question.id}_${subpart.id}_${subsub.id}`, 
                text: `Subpart ${subsub.id}`,
                marks: subsub.marks,
                stats: {
                  doubts: subsub.doubts || 0,
                  commonIssues: subsub.commonIssues || 'No common issues reported',
                }
              }))
            }))
          }));

          acc[paperData.subjectName] = formattedQuestions;
          return acc;
        }, {});

        setSubjects(formattedSubjects);
        setQuestionsBySubject(formattedQuestionsBySubject);

        console.log('Formatted Subjects:', formattedSubjects);
        console.log('Formatted Questions by Subject:', formattedQuestionsBySubject);

      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('API Error Details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError('Failed to load question paper data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStats = (subpartId) => {
    setExpandedStats(prev => ({
      ...prev,
      [subpartId]: !prev[subpartId]
    }));
  };
 
  const ISSUE_TYPES = {
    CALCULATION: 'Calculation Errors',
    UNMARKED: 'Unmarked Answers',
    INCORRECT: 'Incorrect Marking',
    OTHERS: 'Others'
  };

  const handleSubjectSelect = (subject) => {
    setFormData({
      ...formData,
      subject,
      questionPaper: null,
      selectedQuestions: []
    });
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

  const handleIssueTypeSelect = (questionId, issueType) => {
    setFormData(prev => ({
      ...prev,
      issueTypes: {
        ...prev.issueTypes,
        [questionId]: issueType
      }
    }));
  };

  const handleCustomIssueDescription = (questionId, description) => {
    setFormData(prev => ({
      ...prev,
      customIssueDescriptions: {
        ...prev.customIssueDescriptions,
        [questionId]: description
      }
    }));
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const BackButton = () => (
    <button
      onClick={handleBack}
      className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-[#DADADA]"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span>Back</span>
    </button>
  );

  const renderStats = (stats) => (
    <div className="mt-4 p-4 bg-[#F7F8F9] rounded-[12px] border border-[#DADADA]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start p-3 bg-white rounded-[8px] shadow-sm">
          <div className="mr-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1E232C]">{stats.doubts}</p>
            <p className="text-sm text-[#6A707C]">Students requested re-evaluation</p>
          </div>
        </div>

        <div className="flex items-start p-3 bg-white rounded-[8px] shadow-sm">
          <div className="mr-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-[#1E232C] font-semibold mb-1">Common Issue:</p>
            <p className="text-sm text-[#6A707C]">{stats.commonIssues}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const StatsToggleButton = ({ id, expanded, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm bg-[#F7F8F9] px-4 py-2 rounded-full
        hover:bg-gray-200 transition-all duration-300"
    >
      {expanded ? 'Hide Stats' : 'View Stats'}
      <svg
        className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  const renderSubpart = (subpart) => (
    <div key={subpart.id} className="bg-white rounded-[8px] p-4 border border-[#DADADA]">
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-start space-x-3">
              {(!subpart.subpartOfSubpart || subpart.subpartOfSubpart.length === 0) && (
                <input
                  type="checkbox"
                  checked={formData.selectedQuestions.includes(subpart.id)}
                  onChange={() => handleQuestionSelect(subpart.id)}
                  className="mt-1"
                />
              )}
              <div>
                <p className="text-[#1E232C] font-bold">Part {subpart.id} ({subpart.marks} marks)</p>
              </div>
            </div>
            {subpart.stats && (
              <StatsToggleButton
                id={subpart.id}
                expanded={expandedStats[subpart.id]}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStats(subpart.id);
                }}
              />
            )}
          </div>

          {expandedStats[subpart.id] && subpart.stats && renderStats(subpart.stats)}

          {(!subpart.subpartOfSubpart || subpart.subpartOfSubpart.length === 0) &&
            formData.selectedQuestions.includes(subpart.id) && (
              <div className="mt-3">
                {renderIssueSelectionAndRemarks(subpart.id)}
              </div>
            )}

          {subpart.subpartOfSubpart && subpart.subpartOfSubpart.length > 0 && (
            <div className="ml-4 mt-3 space-y-3">
              {subpart.subpartOfSubpart.map(renderSubSubpart)}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderIssueSelectionAndRemarks = (itemId, stats = null) => (
    <div className="mt-3 space-y-3">
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start p-3 bg-white rounded-[8px] shadow-sm">
            <div className="mr-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-[#1E232C]">{stats.doubts}</p>
              <p className="text-sm text-[#6A707C]">Students requested re-evaluation</p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-white rounded-[8px] shadow-sm">
            <div className="mr-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-[#1E232C] font-semibold mb-1">Common Issue:</p>
              <p className="text-sm text-[#6A707C]">{stats.commonIssues}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {Object.entries(ISSUE_TYPES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleIssueTypeSelect(itemId, value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${formData.issueTypes[itemId] === value
                ? 'bg-black text-white'
                : 'bg-white text-[#6A707C] hover:bg-gray-100'
              }`}
          >
            {value}
          </button>
        ))}
      </div>

      {formData.issueTypes[itemId] === 'Others' && (
        <input
          type="text"
          placeholder="Please specify the issue..."
          className="w-full p-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-[#000000] text-sm"
          onChange={(e) => handleCustomIssueDescription(itemId, e.target.value)}
          value={formData.customIssueDescriptions[itemId] || ''}
        />
      )}

      {['Calculation Errors', 'Unmarked Answers', 'Incorrect Marking'].includes(formData.issueTypes[itemId]) && (
      <textarea
        placeholder="Enter your specific remarks/doubts for this part..."
        className="w-full p-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-[#000000] text-sm"
        onChange={(e) => handleRemarkChange(itemId, e.target.value)}
        value={formData.remarks[itemId] || ''}
      />
    )}

    </div>
  );

  const renderQuestion = (question) => (
    <div key={`q${question.number}`} className="bg-[#F7F8F9] rounded-[12px] p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[#1E232C] text-lg font-bold">
          Question {question.number}: {question.title}
        </h4>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-black text-white rounded-full text-sm">
            {question.marks} marks
          </span>
          {question.stats && (!question.subpart || question.subpart.length === 0) && (
            <StatsToggleButton
              id={`q${question.number}`}
              expanded={expandedStats[`q${question.number}`]}
              onClick={(e) => {
                e.stopPropagation();
                toggleStats(`q${question.number}`);
              }}
            />
          )}
        </div>
      </div>

      {(!question.subpart || question.subpart.length === 0) ? (
        <div className="flex flex-col bg-white p-4 rounded-[8px]">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.selectedQuestions.includes(`q${question.number}`)}
                onChange={() => handleQuestionSelect(`q${question.number}`)}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="text-[#1E232C] font-medium">Select entire question</p>
              </div>
            </div>
          </div>

          {expandedStats[`q${question.number}`] && question.stats && renderStats(question.stats)}

          {formData.selectedQuestions.includes(`q${question.number}`) && (
            <div className="mt-3 ml-7">
              {renderIssueSelectionAndRemarks(`q${question.number}`)}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {question.subpart.map(renderSubpart)}
        </div>
      )}
    </div>
  );

  const renderSubSubpart = (subSubpart) => (
    <div key={subSubpart.id} className="bg-[#F7F8F9] p-3 rounded-[6px]">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.selectedQuestions.includes(subSubpart.id)}
            onChange={() => handleQuestionSelect(subSubpart.id)}
            className="mt-1"
          />
          <div>
            <p className="text-[#1E232C] font-medium">Part {subSubpart.id} ({subSubpart.marks} marks)</p>
            <p className="text-[#6A707C] text-sm">{subSubpart.text}</p>
          </div>
        </div>
        {subSubpart.stats && (
          <StatsToggleButton
            id={subSubpart.id}
            expanded={expandedStats[subSubpart.id]}
            onClick={() => toggleStats(subSubpart.id)}
          />
        )}
      </div>

      {expandedStats[subSubpart.id] && subSubpart.stats && renderStats(subSubpart.stats)}

      {formData.selectedQuestions.includes(subSubpart.id) && (
        <div className="mt-3 ml-7 space-y-3">
          <div className="flex flex-wrap gap-2">
            {Object.entries(ISSUE_TYPES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleIssueTypeSelect(subSubpart.id, value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                  ${formData.issueTypes[subSubpart.id] === value
                    ? 'bg-black text-white'
                    : 'bg-white text-[#6A707C] hover:bg-gray-100'
                  }`}
              >
                {value}
              </button>
            ))}
          </div>

          {/* {formData.issueTypes[subSubpart.id] === 'Others' && (
            <input
              type="text"
              placeholder="Please specify the issue..."
              className="w-full p-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-[#000000] text-sm"
              onChange={(e) => handleCustomIssueDescription(subSubpart.id, e.target.value)}
              value={formData.customIssueDescriptions[subSubpart.id] || ''}
            />
          )}

          <textarea
            placeholder="Enter your specific remarks/doubts for this part..."
            className="w-full p-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-[#000000] text-sm"
            onChange={(e) => handleRemarkChange(subSubpart.id, e.target.value)}
            value={formData.remarks[subSubpart.id] || ''}
          /> */}
          {formData.issueTypes[subSubpart.id] === 'Others' ? (
      <input
        type="text"
        placeholder="Please specify the issue..."
        className="w-full p-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-[#000000] text-sm"
        onChange={(e) => handleCustomIssueDescription(subSubpart.id, e.target.value)}
        value={formData.customIssueDescriptions[subSubpart.id] || ''}
      />
    ) : ['Calculation Errors', 'Unmarked Answers', 'Incorrect Marking'].includes(formData.issueTypes[subSubpart.id]) ? (
      <textarea
        placeholder="Enter your specific remarks/doubts for this part..."
        className="w-full p-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-[#000000] text-sm"
        onChange={(e) => handleRemarkChange(subSubpart.id, e.target.value)}
        value={formData.remarks[subSubpart.id] || ''}
      />
  ) : null}
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    switch (step) {
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
              <div className="mt-6 space-y-6">
                {questionsBySubject[formData.subject.name]?.map(renderQuestion)}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              {/* <button
                onClick={() => setStep(1)}
                className="px-6 py-2 border border-[#DADADA] rounded-[8px] text-[#6A707C] 
                  hover:text-[#000000] hover:border-[#000000] transition-all duration-300"
              >
                Back
              </button> */}
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
                onClick={async () => {
                  alert('Payment processing...');
                  console.log("Form data given by ayush is : ",formData)

                  try {
                    const response = await axios.post('/api/students/apply-reevaluation', formData);
                    console.log("Server Response:", response.data);
                  } catch (error) {
                    console.error("Error submitting reevaluation request:", error.response ? error.response.data : error.message);
                  }
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

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6A707C]">Loading re-evaluation data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-[12px] shadow-lg">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-[#1E232C] mb-2">Error Loading Data</h3>
          <p className="text-[#6A707C] mb-4">{error}</p>
          <button
            onClick={() => fetchReEvaluationData()}
            className="px-6 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <BackButton />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map(stepNo => (
              <div
                key={stepNo}
                className={`w-1/3 h-2 rounded-full ${step >= stepNo ? 'bg-[#000000]' : 'bg-[#DADADA]'
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
