import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuestionPapersPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [questionPapers, setQuestionPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchQuestionPapers();
  }, []);

  const fetchQuestionPapers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/organization/get-all-papers');
      if (response.data.success) {
        console.log('Fetched papers:', response.data.data);
        setQuestionPapers(response.data.data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load question papers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (paperId) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      try {
        console.log('Deleting paper:', paperId);
        const response = await axios.delete(`/api/organization/delete-paper/${paperId}`);
        
        if (response.data.success) {
          console.log('Delete successful');
          fetchQuestionPapers();
          alert('Paper deleted successfully');
        } else {
          throw new Error(response.data.message || 'Failed to delete paper');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert(error.response?.data?.message || 'Error deleting paper. Please try again.');
      }
    }
  };

  const handleEdit = (paper) => {
    setSelectedPaper(paper);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setQuestionPapers(questionPapers.map(paper => 
      paper.id === selectedPaper.id ? selectedPaper : paper
    ));
    setShowEditModal(false);
  };

  const calculateTotalMarks = (questions) => {
    return questions.reduce((total, question) => {
      if (!question.subparts || question.subparts.length === 0) {
        return total + (parseInt(question.marks) || 0);
      }

      const subpartsTotal = question.subparts.reduce((subTotal, subpart) => {
        if (!subpart.subsubparts || subpart.subsubparts.length === 0) {
          return subTotal + (parseInt(subpart.marks) || 0);
        }

        const subsubpartsTotal = subpart.subsubparts.reduce((sTotal, ssp) => 
          sTotal + (parseInt(ssp.marks) || 0), 0);
        return subTotal + subsubpartsTotal;
      }, 0);

      return total + subpartsTotal;
    }, 0);
  };

  const validateMarks = (questions, totalMarks) => {
    const currentTotal = calculateTotalMarks(questions);
    return {
      isValid: currentTotal === parseInt(totalMarks),
      currentTotal,
      difference: parseInt(totalMarks) - currentTotal
    };
  };

  const handleUpdate = async (editedPaper) => {
    setIsUpdating(true);
    setUpdateError(null);
    
    try {
      const { isValid, currentTotal, difference } = validateMarks(
        editedPaper.questions, 
        editedPaper.totalMarks
      );

      if (!isValid) {
        throw new Error(
          difference > 0 
            ? `Total marks are ${currentTotal}, which is ${difference} less than the required ${editedPaper.totalMarks} marks`
            : `Total marks are ${currentTotal}, which is ${Math.abs(difference)} more than the required ${editedPaper.totalMarks} marks`
        );
      }

      console.log('Updating paper:', editedPaper);
      const formattedPaper = {
        subjectName: editedPaper.subjectName,
        examDate: editedPaper.examDate,
        totalMarks: parseInt(editedPaper.totalMarks),
        duration: parseInt(editedPaper.duration),
        department: editedPaper.department,
        semester: parseInt(editedPaper.semester),
        questions: editedPaper.questions.map(q => ({
          ...q,
          marks: parseInt(q.marks),
          subparts: q.subparts?.map(sp => ({
            ...sp,
            marks: parseInt(sp.marks),
            subsubparts: sp.subsubparts?.map(ssp => ({
              ...ssp,
              marks: parseInt(ssp.marks)
            }))
          }))
        }))
      };

      const response = await axios.put(
        `/api/organization/update-paper/${editedPaper._id}`,
        formattedPaper
      );

      if (response.data.success) {
        console.log('Update successful:', response.data);
        await fetchQuestionPapers();
        setShowEditModal(false);
        alert('Paper updated successfully');
      } else {
        throw new Error(response.data.message || 'Failed to update paper');
      }
    } catch (error) {
      console.error('Update error:', error);
      setUpdateError(
        error.response?.data?.message || 
        'Failed to update paper. Please check your connection and try again.'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const calculateHierarchicalMarks = (questions) => {
    return questions.map(question => {
      if (!question.subparts || question.subparts.length === 0) {
        return {
          ...question,
          marks: parseInt(question.marks) || 0
        };
      }

      const updatedSubparts = question.subparts.map(subpart => {
        if (!subpart.subsubparts || subpart.subsubparts.length === 0) {
          return {
            ...subpart,
            marks: parseInt(subpart.marks) || 0
          };
        }

        const subsubpartsTotal = subpart.subsubparts.reduce((total, ssp) => 
          total + (parseInt(ssp.marks) || 0), 0);
        return { ...subpart, marks: subsubpartsTotal };
      });

      const questionTotal = updatedSubparts.reduce((total, sp) => 
        total + (parseInt(sp.marks) || 0), 0);

      return {
        ...question,
        marks: questionTotal,
        subparts: updatedSubparts
      };
    });
  };

  const handleMarksChange = (editedPaper, path, value) => {
    const [questionIndex, subpartIndex, subsubpartIndex] = path;
    const updatedQuestions = [...editedPaper.questions];
    
    if (subsubpartIndex !== undefined) {
      updatedQuestions[questionIndex].subparts[subpartIndex].subsubparts[subsubpartIndex].marks = parseInt(value) || 0;
    } else if (subpartIndex !== undefined) {
      if (!updatedQuestions[questionIndex].subparts[subpartIndex].subsubparts?.length) {
        updatedQuestions[questionIndex].subparts[subpartIndex].marks = parseInt(value) || 0;
      }
    } else {
      if (!updatedQuestions[questionIndex].subparts?.length) {
        updatedQuestions[questionIndex].marks = parseInt(value) || 0;
      }
    }

    const updatedHierarchicalQuestions = calculateHierarchicalMarks(updatedQuestions);
    return { ...editedPaper, questions: updatedHierarchicalQuestions };
  };

  const EditModal = () => {
    if (!showEditModal || !selectedPaper) return null;

    const [editedPaper, setEditedPaper] = useState({
      _id: selectedPaper._id,
      subjectName: selectedPaper.subjectName,
      examDate: selectedPaper.examDate?.split('T')[0],
      totalMarks: selectedPaper.totalMarks,
      duration: selectedPaper.duration,
      department: selectedPaper.department,
      semester: selectedPaper.semester,
      questions: selectedPaper.questions || []
    });

    const [marksValidation, setMarksValidation] = useState({
      isValid: true,
      currentTotal: 0,
      difference: 0
    });

    useEffect(() => {
      const validation = validateMarks(editedPaper.questions, editedPaper.totalMarks);
      setMarksValidation(validation);
    }, [editedPaper.questions, editedPaper.totalMarks]);

    const addSubpart = (questionIndex) => {
      const updatedQuestions = [...editedPaper.questions];
      if (!updatedQuestions[questionIndex].subparts) {
        updatedQuestions[questionIndex].subparts = [];
      }
      updatedQuestions[questionIndex].subparts.push({
        id: Date.now(),
        marks: 0,
        subsubparts: []
      });
      setEditedPaper({ ...editedPaper, questions: updatedQuestions });
    };

    const addSubSubpart = (questionIndex, subpartIndex) => {
      const updatedQuestions = [...editedPaper.questions];
      updatedQuestions[questionIndex].subparts[subpartIndex].subsubparts.push({
        id: Date.now(),
        marks: 0
      });
      setEditedPaper({ ...editedPaper, questions: updatedQuestions });
    };

    // Calculate sum of subsubparts for a subpart
    const calculateSubsubpartsTotal = (subsubparts) => {
      return (subsubparts || []).reduce((total, ssp) => total + (parseInt(ssp.marks) || 0), 0);
    };

    // Calculate sum of subparts for a question
    const calculateSubpartsTotal = (subparts) => {
      return (subparts || []).reduce((total, sp) => {
        const subsubpartsTotal = calculateSubsubpartsTotal(sp.subsubparts);
        // If subpart has subsubparts, use their total, otherwise use subpart's marks
        return total + (sp.subsubparts?.length > 0 ? subsubpartsTotal : (parseInt(sp.marks) || 0));
      }, 0);
    };

    const updateMarksHierarchy = (questions) => {
      return questions.map(question => {
        if (question.subparts?.length > 0) {
          const updatedSubparts = question.subparts.map(subpart => {
            if (subpart.subsubparts?.length > 0) {
              const subsubpartsTotal = calculateSubsubpartsTotal(subpart.subsubparts);
              return { ...subpart, marks: subsubpartsTotal };
            }
            return subpart;
          });
          const subpartsTotal = calculateSubpartsTotal(updatedSubparts);
          return { ...question, marks: subpartsTotal, subparts: updatedSubparts };
        }
        return question;
      });
    };

    const handleMarksChange = (questionIndex, subpartIndex = null, subsubpartIndex = null, value) => {
      const updatedQuestions = [...editedPaper.questions];
      
      if (subsubpartIndex !== null) {
        updatedQuestions[questionIndex].subparts[subpartIndex].subsubparts[subsubpartIndex].marks = parseInt(value) || 0;
      } else if (subpartIndex !== null) {
        if (!updatedQuestions[questionIndex].subparts[subpartIndex].subsubparts?.length) {
          updatedQuestions[questionIndex].subparts[subpartIndex].marks = parseInt(value) || 0;
        }
      } else {
        if (!updatedQuestions[questionIndex].subparts?.length) {
          updatedQuestions[questionIndex].marks = parseInt(value) || 0;
        }
      }

      const updatedHierarchy = updateMarksHierarchy(updatedQuestions);
      setEditedPaper({ ...editedPaper, questions: updatedHierarchy });
    };

    const deleteQuestion = (questionIndex) => {
      const updatedQuestions = [...editedPaper.questions];
      updatedQuestions.splice(questionIndex, 1);
      setEditedPaper({ ...editedPaper, questions: updatedQuestions });
    };

    const deleteSubpart = (questionIndex, subpartIndex) => {
      const updatedQuestions = [...editedPaper.questions];
      updatedQuestions[questionIndex].subparts.splice(subpartIndex, 1);
      if (updatedQuestions[questionIndex].subparts.length === 0) {
        delete updatedQuestions[questionIndex].subparts;
      }
      const updatedHierarchy = updateMarksHierarchy(updatedQuestions);
      setEditedPaper({ ...editedPaper, questions: updatedHierarchy });
    };

    const deleteSubsubpart = (questionIndex, subpartIndex, subsubpartIndex) => {
      const updatedQuestions = [...editedPaper.questions];
      updatedQuestions[questionIndex].subparts[subpartIndex].subsubparts.splice(subsubpartIndex, 1);
      if (updatedQuestions[questionIndex].subparts[subpartIndex].subsubparts.length === 0) {
        delete updatedQuestions[questionIndex].subparts[subpartIndex].subsubparts;
      }
      const updatedHierarchy = updateMarksHierarchy(updatedQuestions);
      setEditedPaper({ ...editedPaper, questions: updatedHierarchy });
    };

    const renderSubsubpart = (subsubpart, sspIndex, questionIndex, subpartIndex) => (
      <div 
        key={subsubpart._id || sspIndex} 
        className="bg-white rounded-lg border border-gray-200 p-4 ml-12 mb-2 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">Subpart {sspIndex + 1}</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={subsubpart.marks || 0}
              onChange={(e) => handleMarksChange(questionIndex, subpartIndex, sspIndex, e.target.value)}
              className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Marks"
            />
            <span className="text-sm text-gray-500">marks</span>
          </div>
        </div>
        <button
          onClick={() => deleteSubsubpart(questionIndex, subpartIndex, sspIndex)}
          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all"
          title="Delete Subsubpart"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );

    const renderSubpart = (subpart, spIndex, questionIndex) => (
      <div 
        key={subpart._id || spIndex} 
        className="bg-gray-50 rounded-lg p-4 ml-8 mb-4"
      >
        <div className="flex items-center justify-between mb-4 border-b pb-3">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">
              Part {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'][spIndex] || spIndex + 1}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={subpart.marks || 0}
                onChange={(e) => handleMarksChange(questionIndex, spIndex, null, e.target.value)}
                className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Marks"
                disabled={subpart.subsubparts?.length > 0}
              />
              <span className="text-sm text-gray-500">marks</span>
            </div>
            {subpart.subsubparts?.length > 0 && (
              <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">Auto-calculated</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => addSubSubpart(questionIndex, spIndex)}
              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-all flex items-center gap-1"
              title="Add Subpart"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm">Add Subpart</span>
            </button>
            <button
              onClick={() => deleteSubpart(questionIndex, spIndex)}
              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all"
              title="Delete Part"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {subpart.subsubparts?.length > 0 && (
          <div className="space-y-2 mt-3">
            <div className="text-sm font-medium text-gray-600 mb-2 ml-2">Subparts:</div>
            {subpart.subsubparts.map((subsubpart, sspIndex) => 
              renderSubsubpart(subsubpart, sspIndex, questionIndex, spIndex)
            )}
          </div>
        )}
      </div>
    );

    // Add marks validation UI
    const MarksValidationAlert = () => (
      <div className={`mb-4 p-3 rounded-md ${marksValidation.isValid 
        ? 'bg-green-50 border border-green-200 text-green-600' 
        : 'bg-red-50 border border-red-200 text-red-600'
      }`}>
        <p>Current total marks: {marksValidation.currentTotal}</p>
        {!marksValidation.isValid && (
          <p>
            {marksValidation.difference > 0 
              ? `Need to add ${marksValidation.difference} more marks`
              : `Need to remove ${Math.abs(marksValidation.difference)} marks`
            }
          </p>
        )}
      </div>
    );

    const renderQuestions = () => (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Questions</h3>
          <button
            onClick={() => {
              const updatedQuestions = [...editedPaper.questions];
              updatedQuestions.push({ marks: 0 });
              setEditedPaper({ ...editedPaper, questions: updatedQuestions });
            }}
            className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Question</span>
          </button>
        </div>

        {editedPaper.questions.map((question, qIndex) => (
          <div key={question._id || qIndex} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <div className="flex items-center gap-4">
                <h4 className="font-medium text-gray-800">Question {qIndex + 1}</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={question.marks || 0}
                    onChange={(e) => handleMarksChange(qIndex, null, null, e.target.value)}
                    className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Marks"
                    disabled={question.subparts?.length > 0}
                  />
                  <span className="text-sm text-gray-500">marks</span>
                </div>
                {question.subparts?.length > 0 && (
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">Auto-calculated</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addSubpart(qIndex)}
                  className="flex items-center gap-1 p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-all"
                  title="Add Part"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm">Add Part</span>
                </button>
                <button
                  onClick={() => deleteQuestion(qIndex)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all"
                  title="Delete Question"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {question.subparts?.length > 0 && (
              <div className="space-y-3">
                {question.subparts.map((subpart, spIndex) => 
                  renderSubpart(subpart, spIndex, qIndex)
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto p-6">
          <div className="space-y-4">
            <MarksValidationAlert />
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#1E232C] mb-2">Subject</label>
                <input
                  type="text"
                  value={editedPaper.subjectName}
                  onChange={(e) => setEditedPaper({...editedPaper, subjectName: e.target.value})}
                  className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E232C] mb-2">Exam Date</label>
                <input
                  type="date"
                  value={editedPaper.examDate}
                  onChange={(e) => setEditedPaper({...editedPaper, examDate: e.target.value})}
                  className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E232C] mb-2">Total Marks</label>
                <input
                  type="number"
                  value={editedPaper.totalMarks}
                  onChange={(e) => setEditedPaper({...editedPaper, totalMarks: e.target.value})}
                  className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E232C] mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={editedPaper.duration}
                  onChange={(e) => setEditedPaper({...editedPaper, duration: e.target.value})}
                  className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E232C] mb-2">Department</label>
                <input
                  type="text"
                  value={editedPaper.department}
                  onChange={(e) => setEditedPaper({...editedPaper, department: e.target.value})}
                  className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E232C] mb-2">Semester</label>
                <input
                  type="number"
                  value={editedPaper.semester}
                  onChange={(e) => setEditedPaper({...editedPaper, semester: e.target.value})}
                  className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {renderQuestions()}

            {updateError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
                {updateError}
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setUpdateError(null);
                  setShowEditModal(false);
                }}
                className="px-4 py-2 border rounded hover:bg-gray-50"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(editedPaper)}
                disabled={isUpdating || !marksValidation.isValid}
                className={`px-4 py-2 bg-black text-white rounded flex items-center gap-2
                ${(isUpdating || !marksValidation.isValid) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
              >
                {isUpdating ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
      {paper.questionPdfPath && (
        <a 
          href={paper.questionPdfPath}
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-[#6A707C] hover:text-black hover:bg-gray-100 rounded-full transition-all"
          title="View Paper"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </a>
      )}
      <button 
        onClick={() => handleDelete(paper._id)}
        className="p-2 text-[#6A707C] hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        title="Delete Paper"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );

  const renderPaperCard = (paper) => (
    <div 
      key={paper._id} 
      className="bg-white rounded-[12px] border border-[#DADADA] p-6 hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-[#1E232C] mb-2">{paper.subjectName}</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[#6A707C]">
            <p>Department: {paper.department}</p>
            <p>Semester: {paper.semester}</p>
            <p>Total Marks: {paper.totalMarks}</p>
            <p>Duration: {paper.duration} minutes</p>
            <p>Date: {new Date(paper.examDate).toLocaleDateString()}</p>
            <p>Questions: {paper.questions?.length || 0}</p>
          </div>
        </div>
        {renderPaperActions(paper)}
      </div>
    </div>
  );

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-[#1E232C]">Question Papers</h1>
      <Link to="/organization/create-question-paper">
        <button className="px-6 py-2 bg-black text-white rounded-[8px] 
                       hover:bg-gray-800 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Question Paper</span>
        </button>
      </Link>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8F9] font-['Urbanist'] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6A707C]">Loading question papers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8F9] font-['Urbanist'] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchQuestionPapers}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <div className="max-w-7xl mx-auto">
        {renderHeader()}
        <div className="grid gap-4">
          {questionPapers.map(renderPaperCard)}
        </div>
      </div>
      <EditModal />
    </div>
  );
};

export default QuestionPapersPage;
