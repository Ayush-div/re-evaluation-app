import React, { useState, useEffect, useRef } from 'react';
import VideoModal from '../VideoModal';
import axios from 'axios';
import { FaPlay, FaChevronDown } from 'react-icons/fa';

const VideoSolutions = () => {
  const [availablePapers, setAvailablePapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const solutionsRef = useRef(null);

  useEffect(() => {
    fetchAvailablePapers();
    fetchUploadedVideos();
  }, []);

  const fetchAvailablePapers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/students/get-papers-for-reevaluation', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log(response)
      if (response.data?.data) {
        setAvailablePapers(response.data.data);
      }
    } catch (err) {
      setError('Failed to load papers. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedVideos = async () => {
    try {
      const response = await axios.get('/api/students/get-uploaded-videos', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.data?.videos) {
        setUploadedVideos(response.data.videos);
      }
    } catch (err) {
      console.error('Error fetching uploaded videos:', err);
    }
  };

  const handlePaperSelect = (paper) => {
    setSelectedPaper(paper);
    setTimeout(() => {
      solutionsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const renderPaperSelection = () => (
    <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
      <h3 className="text-lg font-bold text-[#1E232C] mb-4">Select Question Paper</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availablePapers.map(paper => {
          let videoCount = 0;
          paper.questions.forEach(q => {
            if (q.videoSolution) videoCount++;
            q.subparts?.forEach(p => {
              if (p.videoSolution) videoCount++;
              p.subsubparts?.forEach(sp => {
                if (sp.videoSolution) videoCount++;
              });
            });
          });

          return (
            <button
              key={paper._id}
              onClick={() => handlePaperSelect(paper)}
              className={`relative p-4 text-left rounded-lg border transition-all duration-300
                ${selectedPaper?._id === paper._id
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-black'}`}
            >
              <h4 className="font-medium text-[#1E232C]">{paper.subjectName}</h4>
              <p className="text-sm text-gray-500">
                {paper.department} - Semester {paper.semester}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-400">
                  Date: {new Date(paper.examDate).toLocaleDateString()}
                </p>
                <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                  {videoCount} solutions available
                </span>
              </div>
              {videoCount > 0 && (
                <div className="absolute bottom-20 right-4 animate- text-gray-500">
                  <div className="flex items-center gap-1 text-xs">
                    <span>View Solutions</span>
                    <FaChevronDown className="w-3 h-3" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderQuestionSelection = () => {
    if (!selectedPaper) return null;

    return (
      <div ref={solutionsRef} className="bg-white rounded-[12px] border border-[#DADADA] p-6 mt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#1E232C]">Available Solutions</h3>
            <p className="text-sm text-gray-500 mt-1">
              Scroll down to view all available video solutions for this paper
            </p>
          </div>
          <button
            onClick={() => setSelectedPaper(null)}
            className="px-4 py-2 text-sm border rounded-md hover:border-black"
          >
            Change Paper
          </button>
        </div>

        <div className="space-y-6">
          {selectedPaper.questions.map(question => (
            <div key={question.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-[#1E232C]">
                  Question {question.id}
                </h4>
                <span className="text-sm text-gray-500">{question.marks} marks</span>
              </div>

              {question.videoSolution ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                  <div>
                    <span className="font-medium">Full Question Solution</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Uploaded: {new Date(question.videoSolution.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleVideoSelect(question.videoSolution)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-md 
                      hover:bg-gray-800 transition-all duration-300"
                  >
                    <FaPlay className="w-3 h-3" />
                    <span className="text-sm">Watch</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-500 text-sm">No video solution available</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">Coming Soon</span>
                </div>
              )}

              {question.subparts?.length > 0 && (
                <div className="mt-4 space-y-4">
                  {question.subparts.map(part => (
                    <div key={part.id} className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                      <h5 className="text-sm font-medium mb-2 text-gray-800">Part {part.id}</h5>

                      {part.videoSolution ? (
                        <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                          <div>
                            <span className="text-sm font-medium">Part Solution</span>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Uploaded: {new Date(part.videoSolution.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleVideoSelect(part.videoSolution)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white 
                              rounded-md hover:bg-gray-800 transition-all duration-300 text-sm"
                          >
                            <FaPlay className="w-2.5 h-2.5" />
                            Watch
                          </button>
                        </div>
                      ) : (
                        <div className="p-2 bg-white rounded-lg border border-gray-200">
                          <span className="text-gray-500 text-sm">No solution available for this part</span>
                        </div>
                      )}

                      {part.subsubparts?.map(subpart => (
                        <div key={subpart.id} className="mt-2 rounded-lg bg-gray-100 p-3 border border-gray-200">
                          {subpart.videoSolution ? (
                            <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                              <div>
                                <span className="text-sm text-gray-800">Subpart {subpart.id}</span>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Uploaded: {new Date(subpart.videoSolution.uploadedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <button
                                onClick={() => handleVideoSelect(subpart.videoSolution)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white 
                                  rounded-md hover:bg-gray-800 transition-all duration-300 text-sm"
                              >
                                <FaPlay className="w-2.5 h-2.5" />
                                Watch
                              </button>
                            </div>
                          ) : (
                            <div className="p-2 bg-white rounded-lg border border-gray-200">
                              <span className="text-gray-500 text-sm">
                                No solution available for subpart {subpart.id}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleVideoSelect = (videoSolution) => {
    // Format the video data before passing to modal
    const formattedVideo = {
      url: videoSolution.url,
      uploadedAt: videoSolution.uploadedAt,
      uploadedBy: videoSolution.uploadedBy || { name: 'Teacher' },
      // Only add other properties if they exist
      ...(videoSolution.title && { title: videoSolution.title }),
      ...(videoSolution.description && { description: videoSolution.description })
    };

    setSelectedVideo(formattedVideo);
    setShowVideoModal(true);
  };

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
              <p className="text-xs text-gray-500">
                Uploaded on: {new Date(video.uploadedAt).toLocaleDateString()}
              </p>
              {video.uploadedBy && video.uploadedBy.name && (
                <p className="text-xs text-gray-500">
                  Uploaded by: {video.uploadedBy.name}
                </p>
              )}
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

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1E232C]">Video Solutions</h1>
          <p className="text-[#6A707C] mt-1">
            Watch detailed solutions for your exam questions
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#6A707C]">Loading papers...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchAvailablePapers}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {renderPaperSelection()}
            {renderQuestionSelection()}
            {renderUploadedVideosTab()}
          </>
        )}
      </div>

      {showVideoModal && selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => {
            setShowVideoModal(false);
            setSelectedVideo(null);
          }}
        />
      )}
    </div>
  );
};

export default VideoSolutions;
