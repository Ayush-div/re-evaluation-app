import React, { useState } from 'react';

const AnswerSheets = () => {
  const [selectedTab, setSelectedTab] = useState('available');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Mock data
  const answerSheets = [
    {
      id: 1,
      subject: "Mathematics",
      exam: "Mid Semester",
      date: "2023-11-15",
      marks: {
        obtained: 75,
        total: 100
      },
      price: 200,
      validityDays: 30,
      status: "available", // available, purchased, expired
      purchaseDate: null,
      expiryDate: null,
      downloadCount: 0,
      maxDownloads: 3,
      annotations: []
    },
    {
      id: 2,
      subject: "Physics",
      exam: "Mid Semester",
      date: "2023-11-10",
      marks: {
        obtained: 82,
        total: 100
      },
      price: 200,
      validityDays: 30,
      status: "purchased",
      purchaseDate: "2023-11-20",
      expiryDate: "2023-12-20",
      downloadCount: 1,
      maxDownloads: 3,
      annotations: [
        { page: 1, note: "Check calculation method", timestamp: "2023-11-21" }
      ]
    }
  ];

  const subjects = ["Mathematics", "Physics", "Chemistry"];

  const handlePurchase = (sheet) => {
    // Implement purchase logic
    alert(`Processing payment of ₹${sheet.price} for ${sheet.subject} answer sheet`);
  };

  const handleDownload = (sheet) => {
    if (sheet.downloadCount >= sheet.maxDownloads) {
      alert("Maximum download limit reached");
      return;
    }
    // Implement download logic
    alert(`Downloading ${sheet.subject} answer sheet`);
  };

  const handleAddNote = (sheetId, note) => {
    // Implement note adding logic
  };

  const filteredSheets = answerSheets.filter(sheet => {
    const matchesSearch = searchQuery === '' || 
      sheet.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || sheet.subject === selectedSubject;
    const matchesTab = selectedTab === 'all' || sheet.status === selectedTab;
    return matchesSearch && matchesSubject && matchesTab;
  });

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E232C]">Answer Sheets</h1>
            <p className="text-[#6A707C] mt-1">View and analyze your exam answer sheets</p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search answer sheets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black"
              />
              <svg className="w-5 h-5 absolute right-3 top-2.5 text-[#6A707C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Subject filter */}
            <div className="flex-1">
              <label className="block text-[#6A707C] text-sm mb-2">Subject</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
                    className={`px-4 py-2 rounded-[8px] text-sm transition-all duration-300
                      ${selectedSubject === subject
                        ? 'bg-black text-white'
                        : 'bg-[#F7F8F9] text-[#6A707C] hover:bg-gray-100'}`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Status filter */}
            <div className="flex-1">
              <label className="block text-[#6A707C] text-sm mb-2">Status</label>
              <div className="flex gap-2">
                {['all', 'available', 'purchased'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 rounded-[8px] text-sm transition-all duration-300
                      ${selectedTab === tab
                        ? 'bg-black text-white'
                        : 'bg-[#F7F8F9] text-[#6A707C] hover:bg-gray-100'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Answer Sheets Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredSheets.map(sheet => (
            <div key={sheet.id} className="bg-white rounded-[12px] border border-[#DADADA] p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Sheet Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#1E232C]">{sheet.subject}</h3>
                      <p className="text-[#6A707C]">{sheet.exam} • {sheet.date}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
                        ${sheet.status === 'purchased' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-[#F7F8F9] text-[#6A707C]'}`}
                      >
                        {sheet.status.charAt(0).toUpperCase() + sheet.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-[#F7F8F9] p-3 rounded-[8px]">
                      <p className="text-[#6A707C] text-sm">Marks Obtained</p>
                      <p className="text-[#1E232C] font-bold">{sheet.marks.obtained}/{sheet.marks.total}</p>
                    </div>
                    {sheet.status === 'purchased' && (
                      <>
                        <div className="bg-[#F7F8F9] p-3 rounded-[8px]">
                          <p className="text-[#6A707C] text-sm">Downloads Left</p>
                          <p className="text-[#1E232C] font-bold">{sheet.maxDownloads - sheet.downloadCount}</p>
                        </div>
                        <div className="bg-[#F7F8F9] p-3 rounded-[8px]">
                          <p className="text-[#6A707C] text-sm">Valid Till</p>
                          <p className="text-[#1E232C] font-bold">{sheet.expiryDate}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 min-w-[200px] justify-center">
                  {sheet.status === 'available' ? (
                    <button
                      onClick={() => handlePurchase(sheet)}
                      className="w-full px-6 py-2 bg-black text-white rounded-[8px] font-medium 
                        hover:bg-white hover:text-black hover:border-[.69px] border-black transition-all duration-300"
                    >
                      Purchase for ₹{sheet.price}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDownload(sheet)}
                        disabled={sheet.downloadCount >= sheet.maxDownloads}
                        className="w-full px-6 py-2 bg-black text-white rounded-[8px] font-medium 
                          hover:bg-white hover:text-black hover:border-[.69px] border-black 
                          disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-200
                          transition-all duration-300"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleAddNote(sheet.id)}
                        className="w-full px-6 py-2 border border-[#DADADA] text-[#6A707C] rounded-[8px] 
                          hover:border-black hover:text-black transition-all duration-300"
                      >
                        Add Note
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Notes Section for purchased sheets */}
              {sheet.status === 'purchased' && sheet.annotations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#DADADA]">
                  <h4 className="text-[#1E232C] font-medium mb-2">Your Notes</h4>
                  <div className="space-y-2">
                    {sheet.annotations.map((note, index) => (
                      <div key={index} className="bg-[#F7F8F9] p-3 rounded-[8px] text-sm">
                        <p className="text-[#6A707C]">Page {note.page}</p>
                        <p className="text-[#1E232C]">{note.note}</p>
                        <p className="text-[#6A707C] text-xs mt-1">{note.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnswerSheets;
