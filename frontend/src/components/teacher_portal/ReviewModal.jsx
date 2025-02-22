import React from 'react';

function ReviewModal({ isOpen, onClose, selectedDoubt, reviewData, setReviewData }) {
  if (!isOpen || !selectedDoubt) return null;

  const issueCategories = {
    'Calculation Errors': 'bg-orange-100 text-orange-800',
    'Unmarked Answers': 'bg-purple-100 text-purple-800',
    'Incorrect Marking': 'bg-red-100 text-red-800'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-lg max-w-4xl w-full p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#1E232C]">Review Re-evaluation Request</h3>
              <p className="text-[#6A707C] mt-1">{selectedDoubt.subject}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section - Student's Request Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1E232C]">Student's Request Details</h4>
              
              {/* Basic Info */}
              <div className="bg-gray-50 p-4 rounded">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Student Name</p>
                    <p className="font-medium">{selectedDoubt.studentId.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Roll Number</p>
                    <p className="font-medium">{selectedDoubt.studentId.rollNumber}</p>
                  </div>
                </div>
              </div>

              {/* Selected Questions */}
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm font-medium text-gray-700 mb-3">Selected Questions</p>
                <div className="space-y-3">
                  {selectedDoubt.selectedQuestions.map((question, index) => (
                    <div key={index} className="bg-white p-3 rounded border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Question {question.questionId}</span>
                        {question.issueType && (
                          <span className={`px-2 py-1 text-xs rounded-full ${issueCategories[question.issueType] || 'bg-gray-100 text-gray-800'}`}>
                            {question.issueType}
                          </span>
                        )}
                      </div>
                      {question.remarks && (
                        <div className="text-sm text-gray-600 mt-2">
                          <p className="font-medium mb-1">Student's Remarks:</p>
                          <p className="bg-gray-50 p-2 rounded">{question.remarks}</p>
                        </div>
                      )}
                      {question.customDescription && (
                        <div className="text-sm text-gray-600 mt-2">
                          <p className="font-medium mb-1">Additional Details:</p>
                          <p className="bg-gray-50 p-2 rounded">{question.customDescription}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Review Form */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1E232C]">Review Assessment</h4>
              
              <div className="bg-gray-50 p-4 rounded space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Comments
                  </label>
                  <textarea
                    value={reviewData.comments}
                    onChange={(e) => setReviewData(prev => ({...prev, comments: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-black h-32"
                    placeholder="Enter your review comments..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={reviewData.status}
                    onChange={(e) => setReviewData(prev => ({...prev, status: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-black"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_review">In Review</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    console.log('Submitting review:', reviewData);
                    onClose();
                  }}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Submit Review
                </button>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:border-black"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
