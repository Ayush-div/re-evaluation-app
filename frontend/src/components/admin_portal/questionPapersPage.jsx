import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QuestionPapersPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);

  // Sample data - replace with actual API call
  const [questionPapers, setQuestionPapers] = useState([
    {
      id: 1,
      subject: "Mathematics",
      date: "2023-12-15",
      totalMarks: 100,
      duration: 180,
      department: "Computer Science",
      semester: 3,
      questionsCount: 6,
      questions: [
        {
          id: 1,
          text: "Solve the integration",
          marks: 10,
          subparts: [
            { id: 1, text: "Part a", marks: 5 },
            { id: 2, text: "Part b", marks: 5 }
          ]
        },
        // More questions...
      ]
    },
    {
      id: 2,
      subject: "Physics",
      date: "2023-12-16",
      totalMarks: 80,
      duration: 120,
      department: "Electronics",
      semester: 4,
      questionsCount: 5
    }
  ]);

  const handleEdit = (paper) => {
    setSelectedPaper(paper);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Update the question papers array with edited paper
    setQuestionPapers(questionPapers.map(paper => 
      paper.id === selectedPaper.id ? selectedPaper : paper
    ));
    setShowEditModal(false);
  };

  const EditModal = () => {
    if (!showEditModal || !selectedPaper) return null;

    return (
      <div className="fixed inset-0  bg-white bg-opacity-50 flex items-center justify-center z-50 ">
        <div className="bg-white  p-6 w-[800px] max-h-[80vh] overflow-y-auto border-black border-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1E232C]">Edit Question Paper</h2>
            <button 
              onClick={() => setShowEditModal(false)}
              className="text-[#6A707C] hover:text-black"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Basic Details Form */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#1E232C] mb-2">Subject</label>
              <input
                type="text"
                value={selectedPaper.subject}
                onChange={(e) => setSelectedPaper({...selectedPaper, subject: e.target.value})}
                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E232C] mb-2">Exam Date</label>
              <input
                type="date"
                value={selectedPaper.date}
                onChange={(e) => setSelectedPaper({...selectedPaper, date: e.target.value})}
                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E232C] mb-2">Total Marks</label>
              <input
                type="number"
                value={selectedPaper.totalMarks}
                onChange={(e) => setSelectedPaper({...selectedPaper, totalMarks: e.target.value})}
                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E232C] mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={selectedPaper.duration}
                onChange={(e) => setSelectedPaper({...selectedPaper, duration: e.target.value})}
                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E232C] mb-2">Department</label>
              <input
                type="text"
                value={selectedPaper.department}
                onChange={(e) => setSelectedPaper({...selectedPaper, department: e.target.value})}
                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E232C] mb-2">Semester</label>
              <input
                type="number"
                value={selectedPaper.semester}
                onChange={(e) => setSelectedPaper({...selectedPaper, semester: e.target.value})}
                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#1E232C] mb-2">Questions</h3>
            {selectedPaper.questions?.map((question, qIndex) => (
              <div key={question.id} className="border border-[#DADADA] rounded-[8px] p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium">Question {qIndex + 1}</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={question.marks}
                      onChange={(e) => {
                        const updatedQuestions = [...selectedPaper.questions];
                        updatedQuestions[qIndex] = {...question, marks: e.target.value};
                        setSelectedPaper({...selectedPaper, questions: updatedQuestions});
                      }}
                      className="w-20 px-2 py-1 rounded-[4px] border border-[#DADADA]"
                      placeholder="Marks"
                    />
                    <button
                      onClick={() => {
                        const updatedQuestions = selectedPaper.questions.filter((_, i) => i !== qIndex);
                        setSelectedPaper({...selectedPaper, questions: updatedQuestions});
                      }}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <textarea
                  value={question.text}
                  onChange={(e) => {
                    const updatedQuestions = [...selectedPaper.questions];
                    updatedQuestions[qIndex] = {...question, text: e.target.value};
                    setSelectedPaper({...selectedPaper, questions: updatedQuestions});
                  }}
                  className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] mb-4"
                  rows="2"
                  placeholder="Enter question text"
                />

                {/* Subparts Section */}
                <div className="pl-4 space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-[#1E232C]">Subparts</h4>
                    <button
                      onClick={() => {
                        const updatedQuestions = [...selectedPaper.questions];
                        updatedQuestions[qIndex].subparts = [
                          ...(question.subparts || []),
                          { id: Date.now(), text: '', marks: '' }
                        ];
                        setSelectedPaper({...selectedPaper, questions: updatedQuestions});
                      }}
                      className="text-sm text-[#6A707C] hover:text-black flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Subpart
                    </button>
                  </div>
                  {question.subparts?.map((subpart, sIndex) => (
                    <div key={subpart.id} className="flex items-center gap-4">
                      <input
                        type="text"
                        value={subpart.text}
                        onChange={(e) => {
                          const updatedQuestions = [...selectedPaper.questions];
                          updatedQuestions[qIndex].subparts[sIndex] = {
                            ...subpart,
                            text: e.target.value
                          };
                          setSelectedPaper({...selectedPaper, questions: updatedQuestions});
                        }}
                        className="flex-1 px-4 py-2 rounded-[8px] border border-[#DADADA]"
                        placeholder="Enter subpart text"
                      />
                      <input
                        type="number"
                        value={subpart.marks}
                        onChange={(e) => {
                          const updatedQuestions = [...selectedPaper.questions];
                          updatedQuestions[qIndex].subparts[sIndex] = {
                            ...subpart,
                            marks: e.target.value
                          };
                          setSelectedPaper({...selectedPaper, questions: updatedQuestions});
                        }}
                        className="w-20 px-2 py-1 rounded-[4px] border border-[#DADADA]"
                        placeholder="Marks"
                      />
                      <button
                        onClick={() => {
                          const updatedQuestions = [...selectedPaper.questions];
                          updatedQuestions[qIndex].subparts = question.subparts.filter((_, i) => i !== sIndex);
                          setSelectedPaper({...selectedPaper, questions: updatedQuestions});
                        }}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newQuestion = {
                  id: Date.now(),
                  text: '',
                  marks: '',
                  subparts: []
                };
                setSelectedPaper({
                  ...selectedPaper,
                  questions: [...(selectedPaper.questions || []), newQuestion]
                });
              }}
              className="w-full py-2 border-2 border-dashed border-[#DADADA] rounded-[8px] text-[#6A707C] hover:text-black hover:border-black transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Question
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveEdit}
              className="px-6 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add edit button to the existing paper card actions
  const renderPaperActions = (paper) => (
    <div className="flex gap-2">
      <button 
        onClick={() => handleEdit(paper)}
        className="p-2 text-[#6A707C] hover:text-black hover:bg-gray-100 rounded-full transition-all"
        title="Edit Paper"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button 
        className="p-2 text-[#6A707C] hover:text-black hover:bg-gray-100 rounded-full transition-all"
        title="Download Paper"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
      <button 
        className="p-2 text-[#6A707C] hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        title="Delete Paper"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#1E232C]">Question Papers</h1>
          <Link to="/organization/create-question-paper">
            <button className="px-6 py-2 bg-black text-white rounded-[8px] 
                           hover:bg-gray-800 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Question Paper
            </button>
          </Link>
        </div>

        <div className="grid gap-4">
          {questionPapers.map((paper) => (
            <div 
              key={paper.id} 
              className="bg-white rounded-[12px] border border-[#DADADA] p-6 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-[#1E232C] mb-2">{paper.subject}</h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[#6A707C]">
                    <p>Department: {paper.department}</p>
                    <p>Semester: {paper.semester}</p>
                    <p>Total Marks: {paper.totalMarks}</p>
                    <p>Duration: {paper.duration} minutes</p>
                    <p>Date: {new Date(paper.date).toLocaleDateString()}</p>
                    <p>Questions: {paper.questionsCount}</p>
                  </div>
                </div>
                {renderPaperActions(paper)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditModal />
    </div>
  );
};

export default QuestionPapersPage;
