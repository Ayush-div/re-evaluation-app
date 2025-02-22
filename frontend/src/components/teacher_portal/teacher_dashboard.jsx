import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewModal from './ReviewModal';
import axios from 'axios';
import { FaPlay, FaPencilAlt, FaChevronLeft, FaTv } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { BiUpload } from 'react-icons/bi';

function TeacherDashboard() {
  const navigate = useNavigate();
  const [isDoubtModalOpen, setIsDoubtModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [reviewData, setReviewData] = useState({
    marks: '',
    comments: '',
    status: 'pending'
  });
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [uploadStep, setUploadStep] = useState(1);
  const [papers, setPapers] = useState([]);
  const [selectedPaperQuestions, setSelectedPaperQuestions] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [availablePapers, setAvailablePapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectionSummary, setSelectionSummary] = useState({
    paper: null,
    question: null
  });
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [uploadedVideos, setUploadedVideos] = useState([]); 
  const targetRef = useRef(null);
  useEffect(() => {
    fetchInitialData();
    fetchUploadedVideos();
  }, []);

  useEffect(() => {
    // Check for activeTab in navigation state
    const { state } = location;
    if (state?.activeTab) {
      setActiveTab(state.activeTab);
    }
  }, []);

  // will take teacher info from here 
  /*
  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const response = await axios.get('/api/teacher/profile');
        setTeacherInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching teacher info:', error);
      }
    };

    fetchTeacherInfo();
  }, []);
  */

  const handleScroll = () => {
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
      // Also set the upload step to 1 to ensure the form is ready
      setUploadStep(1);
    }
  };
  

  const fetchInitialData = async () => {
    try {
      await fetchPapers();
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const fetchPapers = async () => {
    try {
      setLoading(true);
      console.log("Fetching papers...");
      const response = await axios.get('/api/teacher/papers');
      console.log("API Response:", response.data);

      if (response.data?.data) {
        const papers = response.data.data;
        console.log("Raw papers data:", papers);

        const formattedPapers = papers.map(paperData => ({
          id: paperData._id,
          subject: paperData.subjectName,
          date: paperData.examDate,
          department: paperData.department,
          semester: paperData.semester,
          totalMarks: paperData.totalMarks,
          duration: paperData.duration,
          questions: paperData.questions.map(q => ({
            id: q.id,
            number: q.id,
            description: `Question ${q.id}`,
            marks: q.marks,
            parts: (q.subparts || []).map(sp => ({
              id: `q${q.id}_${sp.id}`,
              number: sp.id,
              marks: sp.marks,
              text: `Part ${sp.id}`,
              subparts: (sp.subsubparts || []).map(ssp => ({
                id: `q${q.id}_${sp.id}_${ssp.id}`,
                number: ssp.id,
                marks: ssp.marks,
                text: `Subpart ${ssp.id}`
              }))
            }))
          }))
        }));

        console.log("Formatted papers:", formattedPapers);
        setAvailablePapers(formattedPapers);
        setPapers(formattedPapers);
      }
    } catch (error) {
      console.error('Error fetching papers:', error);
      alert('Failed to load papers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedVideos = async () => {
    try {
      console.log("fetching uploded videos")
      const response = await axios.get('/api/teacher/uploaded-videos');
      console.log("uploaded")
      setUploadedVideos(response.data.videos);
    } catch (error) {
      console.error('Error fetching uploaded videos:', error);
    }
  };

  const doubts = [
    {
      id: 1,
      questionNumber: 5,
      subject: 'Mathematics',
      topic: 'Integration by Parts',
      studentName: 'John Doe',
      rollNumber: '2021CS01',
      doubtCount: 8,
      status: 'pending',
      description: 'I have a doubt regarding the integration method used in part (b)',
      attachments: ['doubt1.jpg', 'workings.pdf'],
      timestamp: '2024-01-20T10:30:00',
    },
  ];

  const stats = {
    pendingReviews: 15,
    papersReviewed: 47,
    totalQuestions: 180,
    questionsWithDoubts: 23
  }

  const handleViewDoubt = (doubt) => {
    setSelectedDoubt(doubt);
    setIsReviewModalOpen(true);
    setReviewData({
      marks: '',
      comments: '',
      status: 'pending'
    });
  };

  const handleNextStep = () => {
    if (uploadStep === 1 && !selectedPaper) {
      return;
    }
    if (uploadStep === 2 && !selectedQuestion) {
      return;
    }
    if (uploadStep < 3) setUploadStep(uploadStep + 1);
  };

  const handlePrevStep = () => {
    if (uploadStep > 1) {
      setUploadStep(uploadStep - 1);

      if (uploadStep === 3) {
        setSelectedQuestion(null);
        setSelectionSummary(prev => ({ ...prev, question: null }));
      }
      if (uploadStep === 2) {
        setSelectedPaper(null);
        setSelectedQuestion(null);
        setSelectionSummary({ paper: null, question: null });
      }
    }
  };

  const handlePaperSelect = (paper) => {
    console.log("Selected paper:", paper);
    setSelectedPaper(paper);
    setSelectedPaperQuestions(paper.questions);
    setSelectionSummary(prev => ({
      ...prev,
      paper: paper,
      question: null
    }));
    setUploadStep(2);
  };

  const handleQuestionSelect = (question, isFullQuestion = false, partNumber = null, subpartNumber = null) => {
    console.log("Selected question:", { question, isFullQuestion, partNumber, subpartNumber });

    let videoSolution = null;
    if (subpartNumber) {
      videoSolution = question.parts?.find(p => p.number === partNumber)
        ?.subparts?.find(sp => sp.number === subpartNumber)?.videoSolution;
    } else if (partNumber) {
      videoSolution = question.parts?.find(p => p.number === partNumber)?.videoSolution;
    } else {
      videoSolution = question.videoSolution;
    }

    setSelectedQuestion({
      ...question,
      isFullQuestion,
      partNumber,
      subpartNumber,
      number: question.number || question.id,
      videoSolution
    });

    setSelectionSummary(prev => ({
      ...prev,
      question: {
        ...question,
        isFullQuestion,
        partNumber,
        subpartNumber,
        isSubpart: !!subpartNumber
      }
    }));
    setUploadStep(3);
  };

  // Modify handleFileSelect to remove teacher auth check (abhi ke liye)
  const handleFileSelect = async (file) => {
    // if (!file || !teacherInfo) {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setSelectedVideo(file);
    console.log('Selected file:', file);
  };

  // Modify handleUploadClick to add temporary teacher info (abhi ke liye)
  const handleUploadClick = async () => {
    if (!selectedVideo) {
      alert('Please select a video first');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('video', selectedVideo);
      formData.append('paperId', selectedPaper.id);
      formData.append('questionId', selectedQuestion.number);

      if (selectedQuestion.partNumber) {
        formData.append('partNumber', selectedQuestion.partNumber);
      }
      if (selectedQuestion.subpartNumber) {
        formData.append('subpartNumber', selectedQuestion.subpartNumber);
      }

      const temporaryTeacherInfo = {
        name: 'Test Teacher',
        email: 'test@test.com',
        department: 'Test Department'
      };

      const metadata = {
        subject: selectedPaper.subject,
        department: selectedPaper.department,
        semester: selectedPaper.semester,
        questionNumber: selectedQuestion.number,
        partNumber: selectedQuestion.partNumber,
        subpartNumber: selectedQuestion.subpartNumber,
        marks: selectedQuestion.marks,
        uploadedAt: new Date().toISOString(),
        uploadedBy: temporaryTeacherInfo
      };

      formData.append('metadata', JSON.stringify(metadata));

      const response = await axios.post('/api/teacher/upload-solution', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data?.success) {
        setSelectedVideo(null);
        setUploadStep(1);
        await fetchPapers();
        navigate('/teacher/video-upload-success');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const renderProgressSteps = () => {
    if (uploadStep === 1) return null;

    return (
      <div className="border-b border-[#DADADA] pb-6 mb-6">
        <div className="flex justify-between mb-4">
          {uploadStep >= 2 && (
            <div className="flex-1">
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white">
                  1
                </div>
                <div className="ml-2">
                  <span className="text-sm font-medium text-black">Selected Paper</span>
                  {selectionSummary.paper && (
                    <p className="text-xs text-gray-600">
                      {selectionSummary.paper.subject} - {selectionSummary.paper.department}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {uploadStep >= 3 && (
            <div className="flex-1">
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white">
                  2
                </div>
                <div className="ml-2">
                  <span className="text-sm font-medium text-black">Selected Question</span>
                  {selectionSummary.question && (
                    <p className="text-xs text-gray-600">
                      {selectionSummary.question.isFullQuestion ? (
                        `Question ${selectionSummary.question.number} (Full)`
                      ) : selectionSummary.question.isSubpart ? (
                        `Question ${selectionSummary.question.number} - Part ${selectionSummary.question.partNumber}${selectionSummary.question.subpartNumber ?
                          ` - Subpart ${selectionSummary.question.subpartNumber}` :
                          ''
                        }`
                      ) : (
                        `Question ${selectionSummary.question.number} - Part ${selectionSummary.question.partNumber}`
                      )}
                      {` (${selectionSummary.question.marks} marks)`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderUploadStep = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-[#1E232C]">Upload Video Solution</h3>
        <button
          onClick={handlePrevStep}
          className="text-sm text-gray-600 hover:text-black"
        >
          Change Question
        </button>
      </div>

      {selectedQuestion?.videoSolution && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-[#DADADA]">
          <h4 className="font-medium text-[#1E232C] mb-2">Current Solution Video</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaPlay className="w-5 h-5 text-green-600" />
              <a
                href={selectedQuestion.videoSolution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                View Current Solution
              </a>
              <span className="text-sm text-gray-500">
                (Uploaded: {new Date(selectedQuestion.videoSolution.uploadedAt).toLocaleDateString()})
              </span>
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
            >
              Replace Video
            </button>
          </div>
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="text-center">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer inline-flex flex-col items-center"
          >
            <BiUpload className="w-12 h-12 text-gray-400 mb-3" />
            <span className="text-gray-600">
              {selectedQuestion?.videoSolution
                ? 'Click to upload new video'
                : 'Click to select video'
              }
            </span>
          </label>
        </div>

        {selectedVideo && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="font-medium">Selected Video:</p>
            <p className="text-sm text-gray-600">{selectedVideo.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              Size: {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderUploadFooter = () => (
    <div className="flex justify-between mt-6 pt-4 border-t border-[#DADADA]">
      <button
        onClick={handlePrevStep}
        className="px-4 py-2 border rounded-md hover:border-black transition-all"
      >
        Previous
      </button>
      {(!selectedQuestion.videoSolution || selectedVideo) && (
        <button
          onClick={handleUploadClick}
          disabled={!selectedVideo || isUploading}
          className={`px-4 py-2 rounded-md transition-all ${selectedVideo && !isUploading
            ? 'bg-black text-white hover:bg-gray-800'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Solution'}
        </button>
      )}
    </div>
  );

  const renderDetailedUpload = () => (
    <div id="upload-section" className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
      <h2 className="text-lg font-bold text-[#1E232C] mb-4">Upload Solution Video</h2>

      {renderProgressSteps()}

      {uploadStep === 1 && (
        <div className="space-y-4">
          <h3 className="font-medium text-[#1E232C] mb-4">Select Paper</h3>
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading papers...</p>
            </div>
          ) : availablePapers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No papers available</p>
              <button
                onClick={fetchPapers}
                className="mt-2 px-4 py-2 text-sm text-black border border-black rounded-md hover:bg-black hover:text-white"
              >
                Refresh Papers
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePapers.map(renderPaperCard)}
            </div>
          )}
        </div>
      )}

      {uploadStep === 2 && selectedPaper && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-[#1E232C]">
              Select Question - {selectedPaper.subject}
            </h3>
            <button
              onClick={handlePrevStep}
              className="text-sm text-gray-600 hover:text-black"
            >
              Change Paper
            </button>
          </div>
          <div className="grid gap-4">
            {selectedPaper.questions.map(renderQuestionCard)}
          </div>
        </div>
      )}

      {uploadStep === 3 && (
        <>
          {renderUploadStep()}
          {renderUploadFooter()}
        </>
      )}
    </div>
  );

  const renderNavBar = () => (
    <nav className="bg-white shadow-md w-full sticky top-0 z-10">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-[#1E232C]">
            Teacher Dashboard
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Profile</button>
            <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Settings</button>
            <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderHeroSection = () => (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1E232C]">Upload Solution Video</h2>
            <p className="text-[#6A707C] mt-1">Add video solutions for questions</p>
          </div>
          <button
            onClick={handleScroll}
            className="px-4 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all cursor-pointer"
          >
            <BiUpload className="inline-block mr-2" />
            Upload New
          </button>
        </div>
        <div className="text-sm text-[#6A707C]">
          You can upload video solutions for questions, parts, or subparts
        </div>
      </div>

      <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1E232C]">View Uploaded Solutions</h2>
            <p className="text-[#6A707C] mt-1">Access all your uploaded videos</p>
          </div>
          <button
            onClick={() => setActiveTab('videos')}
            className="px-4 py-2 bg-white border border-black text-black rounded-[8px] hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <FaTv className="inline-block mr-2" />
            View All
          </button>
        </div>
        <div className="text-sm text-[#6A707C]">
          {uploadedVideos.length} videos uploaded so far
        </div>
      </div>
    </div>
  );


  const renderPaperCard = (paper) => (
    <div
      key={paper.id}
      onClick={() => handlePaperSelect(paper)}
      className="p-4 border rounded-lg cursor-pointer transition-all duration-300
                hover:border-black hover:shadow-md hover:bg-gray-50
                active:scale-[0.98]"
    >
      <h4 className="font-medium">{paper.subject}</h4>
      <p className="text-sm text-gray-500">
        {paper.department} - Semester {paper.semester} <br />
        Date: {new Date(paper.date).toLocaleDateString()}
      </p>
      <div className="mt-2 flex gap-2">
        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
          {paper.totalMarks} marks
        </span>
        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
          {paper.duration} mins
        </span>
      </div>
    </div>
  );

  const renderSolutionVideo = (video) => {
    if (!video) return null;

    return (
      <div className="flex items-center gap-2 text-sm">
        <FaPlay className="w-4 h-4 text-green-600" />
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800 hover:underline"
        >
          View Solution
        </a>
        <span className="text-gray-400 text-xs">
          ({new Date(video.uploadedAt).toLocaleDateString()})
        </span>
      </div>
    );
  };

  const renderQuestionCard = (question) => (
    <div
      key={question.id}
      className="p-4 border rounded-lg cursor-pointer transition-all duration-300
                hover:border-black hover:shadow-md hover:bg-gray-50"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          {(!question.parts || question.parts.length === 0) && (
            <>
              <input
                type="checkbox"
                onChange={() => handleQuestionSelect(question, true)}
                className="mt-1"
              />
              {question.solutionVideo && renderSolutionVideo(question.solutionVideo)}
            </>
          )}
          <div>
            <h4 className="font-medium hover:text-black transition-colors">
              Question {question.number}
            </h4>
            <p className="text-sm text-gray-500">{question.marks} marks</p>
          </div>
        </div>
        {question.parts?.length > 0 && (
          <div className="text-sm text-gray-500">
            {question.parts.length} parts
          </div>
        )}
      </div>

      {question.parts && question.parts.length > 0 && (
        <div className="mt-2 pl-4 space-y-2">
          {question.parts.map(part => (
            <div key={part.id} className="text-sm text-gray-600 hover:bg-gray-100 p-2 rounded-md transition-all">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    onChange={() => handleQuestionSelect(question, false, part.number)}
                    className="mt-1"
                  />
                  <span className="hover:text-black transition-colors">
                    Part {part.number}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{part.marks} marks</span>
                  {part.solutionVideo && renderSolutionVideo(part.solutionVideo)}
                </div>
              </div>
              {part.subparts && part.subparts.length > 0 && (
                <div className="ml-4 mt-1">
                  {part.subparts.map(subpart => (
                    <div key={subpart.id}
                      className="flex justify-between items-center text-xs text-gray-500 hover:bg-gray-200 p-1 rounded transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          onChange={() => handleQuestionSelect(question, false, part.number, subpart.number)}
                          className="mt-1"
                        />
                        <span className="hover:text-black transition-colors">
                          {subpart.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{subpart.marks} marks</span>
                        {subpart.solutionVideo && renderSolutionVideo(subpart.solutionVideo)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {uploadStep === 2 && !question.solutionVideo && (
        <button
          onClick={() => handleQuestionSelect(question, true)}
          className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
        >
          <FaPencilAlt className="w-4 h-4" />
          Add Solution Video
        </button>
      )}
    </div>
  );

  const renderDoubtsSection = () => (
    <div className="space-y-4">
      {doubts.map((doubt) => (
        <div key={doubt.id} className="p-4 bg-[#F7F8F9] rounded-[8px] hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-[#1E232C]">
                Question #{doubt.questionNumber} - {doubt.subject}
              </h3>
              <p className="text-[#6A707C] text-sm">{doubt.topic}</p>
              <p className="text-[#6A707C] text-sm mt-1">
                Student: {doubt.studentName} ({doubt.rollNumber})
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                {doubt.doubtCount} doubts
              </span>
              <span className="text-[#6A707C] text-xs">
                {new Date(doubt.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleViewDoubt(doubt)}
              className="text-sm px-4 py-2 bg-black text-white rounded-[6px] hover:bg-gray-800"
            >
              View Details
            </button>
            <button
              className="text-sm px-4 py-2 border border-[#DADADA] rounded-[6px] hover:border-black"
            >
              Mark as Resolved
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStatistics = () => (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
        <h2 className="text-lg font-bold text-[#1E232C] mb-4">Recent Reviews</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#F7F8F9] rounded-[8px]">
            <div>
              <p className="text-[#6A707C] text-sm">Mathematics Paper</p>
              <p className="text-[#1E232C] font-medium">Student ID: 2021CS01</p>
            </div>
            <span className="text-[#000000] text-sm">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F7F8F9] rounded-[8px]">
            <div>
              <p className="text-[#6A707C] text-sm">Physics Paper</p>
              <p className="text-[#1E232C] font-medium">Student ID: 2021CS02</p>
            </div>
            <span className="text-[#000000] text-sm">2 hours ago</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
        <h2 className="text-lg font-bold text-[#1E232C] mb-4">Question Statistics</h2>
        <div className="space-y-3">
          <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
            <div className="flex justify-between mb-2">
              <span className="text-[#6A707C]">Most Doubted Question</span>
              <span className="text-[#1E232C] font-medium">#5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-black h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="p-3 bg-[#F7F8F9] rounded-[8px]">
            <div className="flex justify-between mb-2">
              <span className="text-[#6A707C]">Most Reviewed Question</span>
              <span className="text-[#1E232C] font-medium">#3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-black h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUploadedVideosTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-[#1E232C] mt-4">Uploaded Solution Videos</h2>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-all"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uploadedVideos.map((video) => (
          <div key={video._id} className="bg-white rounded-lg border border-[#DADADA] p-4 hover:shadow-md transition-all">
            <div>
              <h3 className="font-bold text-[#1E232C]">{video.subject || "Subject N/A"}</h3>
              <p className="text-sm text-gray-600">
                Paper: {video.paperName || "N/A"} <br />
                Question: {video.questionNumber || "N/A"}
                {video.partNumber && `, Part: ${video.partNumber}`}
                {video.subpartNumber && `, Subpart: ${video.subpartNumber}`}
              </p>
              <p className="text-xs text-gray-500">Uploaded on: {new Date(video.uploadedAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-2">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6A707C]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {renderNavBar()}

      <div className="max-w-[1440px] mx-auto px-6">
        {activeTab === 'dashboard' ? (
          <>
            <div className="pt-8 pb-6">
              <h1 className="text-2xl font-bold text-[#1E232C]">
                Welcome back, Professor! 👋
              </h1>
              <p className="text-[#6A707C] mt-2">
                Here's an overview of student re-evaluation requests
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
                <p className="text-[#6A707C] text-sm">Pending Reviews</p>
                <p className="text-2xl font-bold text-[#1E232C] mt-1">{stats.pendingReviews}</p>
              </div>
              <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
                <p className="text-[#6A707C] text-sm">Papers Reviewed</p>
                <p className="text-2xl font-bold text-[#000000] mt-1">{stats.papersReviewed}</p>
              </div>
              <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
                <p className="text-[#6A707C] text-sm">Total Questions</p>
                <p className="text-2xl font-bold text-[#000000] mt-1">{stats.totalQuestions}</p>
              </div>
              <div className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
                <p className="text-[#6A707C] text-sm">Questions with Doubts</p>
                <p className="text-2xl font-bold text-orange-500 mt-1">{stats.questionsWithDoubts}</p>
              </div>
            </div>

            {renderHeroSection()}

            <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#1E232C]">Questions Requiring Attention</h2>
                <div className="flex gap-3">
                  <select
                    className="px-3 py-1 border rounded-md focus:outline-none focus:border-black"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              {renderDoubtsSection()}
            </div>

            {renderDetailedUpload()}
            {renderStatistics()}

            {isDoubtModalOpen && (
              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsDoubtModalOpen(false)}></div>
                <div className="flex items-center justify-center min-h-screen px-4">
                  <div className="relative bg-white rounded-lg max-w-3xl w-full mx-4 p-6 z-50">
                    {selectedDoubt && (
                      <>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-[#1E232C]">
                              Doubt Details
                            </h3>
                            <p className="text-[#6A707C] mt-1">
                              Question #{selectedDoubt.questionNumber} - {selectedDoubt.subject}
                            </p>
                          </div>
                          <button
                            onClick={() => setIsDoubtModalOpen(false)}
                            className="text-gray-500 hover:text-black"
                          >
                            <IoCloseOutline className="w-6 h-6" />
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-600">Student Name</p>
                              <p className="font-medium">{selectedDoubt.studentName}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-600">Roll Number</p>
                              <p className="font-medium">{selectedDoubt.rollNumber}</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Doubt Description</p>
                            <p className="mt-1">{selectedDoubt.description}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-gray-600 mb-2">Attachments</p>
                            <div className="flex gap-2">
                              {selectedDoubt.attachments.map((file, index) => (
                                <button
                                  key={index}
                                  className="px-3 py-1 text-sm border rounded-md hover:border-black"
                                >
                                  View {file}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3 mt-6">
                            <button
                              onClick={() => {
                                setIsDoubtModalOpen(false);
                                setIsReviewModalOpen(true);
                              }}
                              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                            >
                              Review Paper
                            </button>
                            <button
                              onClick={() => setIsDoubtModalOpen(false)}
                              className="px-4 py-2 border border-gray-300 rounded-md hover:border-black"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <ReviewModal
              isOpen={isReviewModalOpen}
              onClose={() => setIsReviewModalOpen(false)}
              selectedDoubt={selectedDoubt}
              reviewData={reviewData}
              setReviewData={setReviewData}
            />
          </>
        ) : (
            renderUploadedVideosTab()
        
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
