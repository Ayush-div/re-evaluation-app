import React from 'react';

const VideoModal = ({ video, onClose, onSaveNote }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-[16px] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#DADADA] bg-gray-50">
          <h3 className="text-lg font-bold text-[#1E232C]">{video.title}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#F7F8F9] rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>

        {/* Video Info */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[30vh] bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-[#6A707C]">by {video.teacher}</p>
              <p className="text-sm text-[#6A707C]">Uploaded: {video.uploadDate}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Your Marks: {video.studentMarks}/{video.totalMarks}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-3">
            {video.timeStamps.map((stamp, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 p-3 rounded-[8px] hover:bg-gray-50 
                          border border-gray-100 transition-all duration-200 text-left text-sm
                          hover:border-gray-200 hover:shadow-sm"
              >
                <span className="text-[#6A707C] font-mono">{stamp.time}</span>
                <span className="text-[#1E232C]">{stamp.topic}</span>
              </button>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-[#1E232C] mb-2">
              Your Notes
            </label>
            <textarea
              placeholder="Add notes while watching..."
              className="w-full p-4 rounded-[12px] border border-[#DADADA] focus:outline-none 
                        focus:border-black focus:ring-1 focus:ring-black text-sm
                        transition-all duration-200"
              rows={3}
              onChange={(e) => onSaveNote(video.id, e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

