import React, { useState } from 'react';

const QuestionPaperViewer = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const subjects = [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Chemistry" }
  ];

 
  const papers = [
    {
      id: 1,
      subject: "Mathematics",
      exam: "Mid Semester",
      date: "2023-11-15",
      resources: [
        { 
          name: "Question Paper", 
          type: "pdf", 
          size: "2.4 MB",
          url: "/path/to/math-paper.pdf",
          downloads: 234,
          lastUpdated: "2023-11-16",
          category: "exam"
        },
        { 
          name: "Answer Key", 
          type: "pdf", 
          size: "1.8 MB",
          url: "/path/to/math-answers.pdf",
          downloads: 198,
          lastUpdated: "2023-11-17",
          category: "exam"
        },
        {
          name: "Detailed Solutions", 
          type: "pdf", 
          size: "4.2 MB",
          url: "/path/to/math-solutions.pdf",
          downloads: 156,
          lastUpdated: "2023-11-17",
          isPremium: true,
          category: "study"
        },
        {
          name: "Study Notes", 
          type: "pdf", 
          size: "3.1 MB",
          url: "/path/to/math-notes.pdf",
          downloads: 145,
          lastUpdated: "2023-11-17",
          isPremium: true,
          category: "study"
        }
      ],
      metadata: {
        duration: "3 hours",
        totalMarks: 100,
        sections: 3,
        difficulty: "Intermediate"
      }
    }
    // Add more papers...
  ];

  const handleDownload = (resource) => {
    if (resource.isPremium) {
      // Show premium modal or redirect to subscription
      alert("This is a premium resource. Please subscribe to download.");
      return;
    }
    // Implement download logic
    alert(`Downloading ${resource.name}...`);
  };

  const filteredPapers = papers.filter(paper => 
    (!selectedSubject || paper.subject === selectedSubject) &&
    (!searchQuery || 
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.exam.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E232C]">Question Papers & Answer Keys</h1>
            <p className="text-[#6A707C] mt-1">Download past papers and study materials</p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search papers..."
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

        {/* Filters Section */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-6">
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-[#6A707C] text-sm mb-2">Subject</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map(subject => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(selectedSubject === subject.name ? null : subject.name)}
                    className={`px-4 py-2 rounded-[8px] text-sm transition-all duration-300
                      ${selectedSubject === subject.name
                        ? 'bg-black text-white'
                        : 'bg-[#F7F8F9] text-[#6A707C] hover:bg-gray-100'}`}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              {/* <label className="block text-[#6A707C] text-sm mb-2">Year</label> */}
              <div className="flex flex-wrap gap-2">
                {/* {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                    className={`px-4 py-2 rounded-[8px] text-sm transition-all duration-300
                      ${selectedYear === year
                        ? 'bg-black text-white'
                        : 'bg-[#F7F8F9] text-[#6A707C] hover:bg-gray-100'}`}
                  >
                    {year}
                  </button>
                ))} */}
              </div>
            </div>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredPapers.map(paper => (
            <div key={paper.id} className="bg-white rounded-[12px] border border-[#DADADA] p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1E232C]">{paper.subject}</h2>
                  <p className="text-[#6A707C]">{paper.exam} </p>
                </div>
                {/* <div className="text-right text-[#6A707C] text-sm">
                  <p>Date: {paper.date}</p>
                  <p>Duration: {paper.metadata.duration}</p>
                </div> */}
              </div>

              {/* Resources - Now grouped by category */}
              <div className="space-y-6 mb-6">
                {/* Exam Materials */}
                <div>
                  <h3 className="text-[#1E232C] font-medium mb-3">Exam Materials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paper.resources
                      .filter(resource => resource.category === 'exam')
                      .map(resource => (
                        <div
                          key={resource.name}
                          className="flex items-center justify-between p-4 rounded-[8px] border border-[#DADADA] hover:border-black transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#F7F8F9] flex items-center justify-center">
                              <svg className="w-5 h-5 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293L16 8" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-[#1E232C]">{resource.name}</p>
                              <p className="text-xs text-[#6A707C]">{resource.size} • {resource.downloads} downloads</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(resource)}
                            className="px-4 py-2 rounded-[8px] text-sm font-medium bg-black text-white hover:bg-gray-900 transition-all duration-300"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Study Materials */}
               
              </div>

              {/* Metadata */}
           
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPaperViewer;
