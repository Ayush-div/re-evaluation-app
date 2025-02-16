import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative bg-white rounded-lg w-full max-w-4xl mx-auto z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold">Solution Video</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <IoCloseOutline className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            {video.url ? (
              <div className="aspect-video">
                <video 
                  src={video.url} 
                  controls 
                  className="w-full h-full rounded-lg"
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Video URL not available
              </div>
            )}
          </div>
          {/* Show metadata if available */}
          {(video.uploadedAt || video.uploadedBy) && (
            <div className="p-4 border-t">
              <div className="text-sm text-gray-600">
                {video.uploadedAt && (
                  <p>Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                )}
                {video.uploadedBy && (
                  <p>Uploaded by: {video.uploadedBy.name}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

