import React, { useState } from 'react';
import VideoModal from '../VideoModal';

// Sample subjects data with papers, questions, and video solutions
const subjects = [
  {
    id: 1,
    name: "Mathematics",
    papers: [
      {
        id: "math-mid-2023",
        name: "Mid Semester Exam 2023",
        date: "Nov 15, 2023",
        questions: [
          {
            number: 1,
            parts: [
              {
                id: "1a",
                videos: [{
                  id: "v1",
                  youtubeId: "RXJKdh1KZ0w",
                  title: "Integration by Parts - Detailed Solution",
                  duration: "8:30",
                  teacher: "Dr. Sarah Johnson",
                  uploadDate: "2023-11-20",
                  studentMarks: 3,
                  totalMarks: 5,
                  timeStamps: [
                    { time: "0:00", topic: "Question Overview" },
                    { time: "2:15", topic: "Integration Method" },
                    { time: "5:30", topic: "Step-by-Step Solution" },
                    { time: "7:45", topic: "Common Mistakes" }
                  ]
                }]
              },
              {
                id: "1b",
                videos: [{
                  id: "v2",
                  youtubeId: "dQw4w9WgXcQ",
                  title: "Differential Equations Solution",
                  duration: "12:45",
                  teacher: "Dr. Sarah Johnson",
                  uploadDate: "2023-11-20",
                  studentMarks: 5,
                  totalMarks: 5,
                  timeStamps: [
                    { time: "0:00", topic: "Problem Analysis" },
                    { time: "3:20", topic: "Solution Approach" },
                    { time: "8:15", topic: "Final Steps" },
                    { time: "11:30", topic: "Verification" }
                  ]
                }]
              }
            ]
          },
          {
            number: 2,
            parts: [
              {
                id: "2a",
                videos: [{
                  id: "v3",
                  youtubeId: "M7lc1UVf-VE",
                  title: "Vector Calculus Problem",
                  duration: "15:20",
                  teacher: "Prof. Robert Miller",
                  uploadDate: "2023-11-21",
                  studentMarks: 4,
                  totalMarks: 8,
                  timeStamps: [
                    { time: "0:00", topic: "Vector Analysis" },
                    { time: "4:30", topic: "Gradient Calculation" },
                    { time: "9:45", topic: "Final Solution" },
                    { time: "13:20", topic: "Additional Notes" }
                  ]
                }]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Physics",
    papers: [
      {
        id: "phy-mid-2023",
        name: "Mid Semester Exam 2023",
        date: "Nov 18, 2023",
        questions: [
          {
            number: 1,
            parts: [
              {
                id: "1a",
                videos: [{
                  id: "v4",
                  youtubeId: "eWRfhZUzrAc",
                  title: "Quantum Mechanics Solution",
                  duration: "10:15",
                  teacher: "Dr. Michael Chang",
                  uploadDate: "2023-11-22",
                  studentMarks: 7,
                  totalMarks: 10,
                  timeStamps: [
                    { time: "0:00", topic: "Wave Function" },
                    { time: "3:30", topic: "Schrödinger Equation" },
                    { time: "6:45", topic: "Probability Calculation" },
                    { time: "9:00", topic: "Result Analysis" }
                  ]
                }]
              }
            ]
          }
        ]
      }
    ]
  }
];

const VideoSolutions = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [notes, setNotes] = useState({});
  const [navigation, setNavigation] = useState({
    subject: null,
    paper: null,
    question: null,
    part: null
  });

  const handleNavigation = (level, value) => {
    const updates = {
      subject: level === 'subject' ? (navigation.subject === value ? null : value) : navigation.subject,
      paper: level === 'paper' ? (navigation.paper === value ? null : value) : (level === 'subject' ? null : navigation.paper),
      question: level === 'question' ? (navigation.question === value ? null : value) : (level === 'subject' || level === 'paper' ? null : navigation.question),
      part: level === 'part' ? (navigation.part === value ? null : value) : (level === 'subject' || level === 'paper' || level === 'question' ? null : navigation.part)
    };
    setNavigation(updates);
  };

  // Navigation breadcrumb component
  const NavigationBreadcrumb = () => {
    const currentSubject = subjects.find(s => s.id === navigation.subject);
    const currentPaper = currentSubject?.papers.find(p => p.id === navigation.paper);
    const currentQuestion = currentPaper?.questions.find(q => q.number === navigation.question);

    return (
      <div className="flex items-center gap-2 text-sm mb-4">
        <span className="text-[#6A707C]">Navigation:</span>
        {navigation.subject ? (
          <>
            <button 
              onClick={() => handleNavigation('subject', navigation.subject)}
              className="text-[#1E232C] font-medium hover:underline"
            >
              {currentSubject.name}
            </button>
            {navigation.paper && (
              <>
                <span className="text-[#6A707C]">/</span>
                <button 
                  onClick={() => handleNavigation('paper', navigation.paper)}
                  className="text-[#1E232C] font-medium hover:underline"
                >
                  {currentPaper.name}
                </button>
              </>
            )}
            {navigation.question && (
              <>
                <span className="text-[#6A707C]">/</span>
                <button 
                  onClick={() => handleNavigation('question', navigation.question)}
                  className="text-[#1E232C] font-medium hover:underline"
                >
                  Question {currentQuestion.number}
                </button>
              </>
            )}
          </>
        ) : (
          <span className="text-[#6A707C]">Select a subject to start</span>
        )}
      </div>
    );
  };

  // Add this CheckIcon component near the top of the file
  const CheckIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  // Fix NavigationPanel component
  const NavigationPanel = () => (
    <div className="lg:col-span-1 space-y-4">
      {/* First card - Navigation */}
      <div className="bg-white rounded-[12px] border border-[#DADADA] p-4">
        {/* Current Selection Display */}
        <div className="mb-4 p-3 bg-[#F7F8F9] rounded-[8px]">
          <p className="text-xs uppercase tracking-wider text-[#6A707C] mb-1">Currently Viewing</p>
          <p className="font-medium text-[#1E232C] text-sm">
            {navigation.subject ? (
              <>
                {subjects.find(s => s.id === navigation.subject)?.name}
                {navigation.paper && (
                  <> 
                    <span className="text-[#6A707C] mx-2">→</span>
                    {subjects.find(s => s.id === navigation.subject)
                      ?.papers.find(p => p.id === navigation.paper)?.name}
                  </>
                )}
                {navigation.question && (
                  <>
                    <span className="text-[#6A707C] mx-2">→</span>
                    Question {navigation.question}
                  </>
                )}
                {navigation.part && (
                  <>
                    <span className="text-[#6A707C] mx-2">→</span>
                    Part {navigation.part.slice(-1)}
                  </>
                )}
              </>
            ) : (
              <span className="text-[#6A707C] italic">Select a subject below</span>
            )}
          </p>
        </div>

        {/* Navigation Steps */}
        <div className="space-y-4">
          {/* Step 1: Subject Selection */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#6A707C] mb-3 flex items-center">
              <span className="w-4 h-4 rounded-full bg-[#1E232C] text-white flex items-center justify-center text-[10px] mr-2">1</span>
              Select Subject
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => handleNavigation('subject', subject.id)}
                  className={`p-2 rounded-[6px] text-left transition-all duration-200
                    ${navigation.subject === subject.id 
                      ? 'border-[.69px] border-[#1E232C] bg-white text-[#1E232C]' 
                      : 'bg-[#F7F8F9] hover:bg-gray-100 text-[#1E232C] border-[0.69px] border-transparent'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-sm font-medium">{subject.name}</span>
                      <span className="text-[10px] text-gray-500">
                        {subject.papers.length} {subject.papers.length === 1 ? 'Paper' : 'Papers'}
                      </span>
                    </div>
                    {navigation.subject === subject.id && <CheckIcon />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Paper Selection */}
          {navigation.subject && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#6A707C] mb-3 flex items-center">
                <span className="w-4 h-4 rounded-full bg-[#1E232C] text-white flex items-center justify-center text-[10px] mr-2">2</span>
                Select Paper
              </h3>
              <div className="space-y-1.5">
                {subjects.find(s => s.id === navigation.subject)?.papers.map(paper => (
                  <button
                    key={paper.id}
                    onClick={() => handleNavigation('paper', paper.id)}
                    className={`w-full p-2 rounded-[6px] text-left transition-all duration-200
                      ${navigation.paper === paper.id
                        ? 'border-[0.69px] border-[#1E232C] bg-white text-[#1E232C]' 
                        : 'bg-[#F7F8F9] hover:bg-gray-100 text-[#1E232C] border border-transparent'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-sm font-medium">{paper.name}</span>
                        <span className="text-[10px] text-gray-500">{paper.date}</span>
                      </div>
                      {navigation.paper === paper.id && <CheckIcon />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Question Selection */}
          {navigation.paper && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#6A707C] mb-3 flex items-center">
                <span className="w-4 h-4 rounded-full bg-[#1E232C] text-white flex items-center justify-center text-[10px] mr-2">3</span>
                Select Question
              </h3>
              <div className="grid grid-cols-4 gap-1.5">
                {subjects
                  .find(s => s.id === navigation.subject)
                  ?.papers.find(p => p.id === navigation.paper)
                  ?.questions.map(question => (
                    <button
                      key={question.number}
                      onClick={() => handleNavigation('question', question.number)}
                      className={`p-2 rounded-[6px] transition-all duration-200
                        ${navigation.question === question.number
                          ? 'border-[0.69px] border-[#1E232C] bg-white text-[#1E232C]'
                          : 'bg-[#F7F8F9] hover:bg-gray-100 text-[#1E232C] border border-transparent'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-sm font-medium">Q{question.number}</span>
                          <span className="text-[10px] text-gray-500">{question.parts.length}p</span>
                        </div>
                        {navigation.question === question.number && <CheckIcon />}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Step 4: Part Selection */}
          {navigation.question && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#6A707C] mb-3 flex items-center">
                <span className="w-4 h-4 rounded-full bg-[#1E232C] text-white flex items-center justify-center text-[10px] mr-2">4</span>
                Select Part
              </h3>
              <div className="space-y-1.5">
                {subjects
                  .find(s => s.id === navigation.subject)
                  ?.papers.find(p => p.id === navigation.paper)
                  ?.questions.find(q => q.number === navigation.question)
                  ?.parts.map(part => (
                    <button
                      key={part.id}
                      onClick={() => handlePartSelect(part)}
                      className={`w-full p-2 rounded-[6px] text-left transition-all duration-200
                        ${navigation.part === part.id
                          ? 'border-[0.69px] border-[#1E232C] bg-white text-[#1E232C]'
                          : 'bg-[#F7F8F9] hover:bg-gray-100 text-[#1E232C] border border-transparent'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="block text-sm font-medium">Part {part.id.slice(-1)}</span>
                          <span className="text-[10px] text-gray-500">{part.videos[0].duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium
                            ${part.videos[0].studentMarks === part.videos[0].totalMarks
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'}`}
                          >
                            {part.videos[0].studentMarks}/{part.videos[0].totalMarks}
                          </span>
                          {navigation.part === part.id && <CheckIcon />}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Second card - Quick Stats */}
      <div className="bg-white rounded-[12px] border border-[#DADADA] p-4">
        <h3 className="text-sm font-bold text-[#1E232C] mb-3">Video Statistics</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#F7F8F9] p-3 rounded-[8px]">
            <p className="text-xs text-[#6A707C]">Available Videos</p>
            <p className="text-lg font-bold text-[#1E232C]">12</p>
          </div>
          <div className="bg-[#F7F8F9] p-3 rounded-[8px]">
            <p className="text-xs text-[#6A707C]">Watched</p>
            <p className="text-lg font-bold text-[#1E232C]">5</p>
          </div>
        </div>
      </div>
    </div>
  );

  const handlePartSelect = (part) => {
    handleNavigation('part', part.id);
    setSelectedVideo(part.videos[0]);
    setShowVideoModal(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1E232C]">Video Solutions</h1>
            <p className="text-[#6A707C] mt-1">
              Watch detailed explanations for your re-evaluated answers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NavigationPanel />

          {/* Main Content Area - Now just shows selection state */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
              {navigation.part ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-[#1E232C] mb-2">
                    Ready to watch the solution?
                  </h3>
                  <p className="text-[#6A707C] mb-6">
                    You've selected Part {navigation.part.slice(-1)} of Question {navigation.question}
                  </p>
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="px-6 py-2 bg-black text-white rounded-[8px] 
                             hover:bg-white hover:text-black hover:border border-black 
                             transition-all duration-300"
                  >
                    Watch Solution
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-[#6A707C]">
                  Select a subject, paper, question, and part to view the solution
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setShowVideoModal(false)}
          onSaveNote={(videoId, note) => setNotes(prev => ({
            ...prev,
            [videoId]: note
          }))}
        />
      )}
    </div>
  );
};

export default VideoSolutions;
