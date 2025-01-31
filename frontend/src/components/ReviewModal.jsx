import React from 'react';

function ReviewModal({ isOpen, onClose, selectedDoubt, reviewData, setReviewData }) {
  if (!isOpen || !selectedDoubt) return null;

  // Define re-evaluation categories (same as in ReEvaluationForm)
  const issueCategories = {
    CALCULATION: 'Calculation Errors',
    UNMARKED: 'Unmarked Answers',
    INCORRECT: 'Incorrect Marking'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-lg max-w-4xl w-full p-6" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#1E232C]">Review Paper</h3>
              <p className="text-[#6A707C] mt-1">Student Answer Sheet Review</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section - Student's Doubt Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1E232C]">Student's Re-evaluation Request</h4>
              
              {/* Basic Info */}
              <div className="bg-gray-50 p-4 rounded">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Student Name</p>
                    <p className="font-medium">{selectedDoubt.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Roll Number</p>
                    <p className="font-medium">{selectedDoubt.rollNumber}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">Question</p>
                  <p className="font-medium">#{selectedDoubt.questionNumber} - {selectedDoubt.subject}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedDoubt.topic}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">Doubt Description</p>
                  <p className="mt-1">{selectedDoubt.description}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Attachments</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoubt.attachments.map((file, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 text-sm border rounded-md hover:border-black flex items-center gap-2"
                      >
                        <span className="material-icons-outlined text-sm">attachment</span>
                        {file}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Student's Selected Issues */}
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm font-medium text-gray-700 mb-3">Selected Issue Type</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDoubt.issueType && (
                    <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                      {selectedDoubt.issueType}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Student's Remarks</p>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-sm text-gray-600">{selectedDoubt.remarks || 'No specific remarks provided'}</p>
                  </div>
                </div>
              </div>

              {/* Answer Sheet Preview */}
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm font-medium text-gray-700 mb-3">Answer Sheet</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {selectedDoubt.answerSheet ? (
                    <img 
                      src={selectedDoubt.answerSheet} 
                      alt="Answer sheet" 
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="h-40 flex items-center justify-center bg-gray-100">
                      <p className="text-gray-500">Answer sheet preview not available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Attachments with Preview */}
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm font-medium text-gray-700 mb-3">Supporting Documents</p>
                <div className="grid grid-cols-2 gap-3">
                  {selectedDoubt.attachments.map((file, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-icons-outlined text-gray-500">attachment</span>
                        <span className="text-sm text-gray-700 truncate">{file}</span>
                      </div>
                      <button className="text-sm text-blue-600 hover:underline w-full text-left">
                        View Document
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Review Form */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#1E232C]">Review Assessment</h4>
              
              <div className="bg-gray-50 p-4 rounded space-y-4">
                {/* Original Marks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Marks
                  </label>
                  <input
                    type="number"
                    value={selectedDoubt.originalMarks || 0}
                    disabled
                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  />
                </div>

                {/* Marks Adjustment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks Adjustment
                  </label>
                  <input
                    type="number"
                    value={reviewData.marks}
                    onChange={(e) => setReviewData(prev => ({...prev, marks: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-black"
                    placeholder="Enter revised marks"
                  />
                </div>

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
                    Review Status
                  </label>
                  <select
                    value={reviewData.status}
                    onChange={(e) => setReviewData(prev => ({...prev, status: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-black"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
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
