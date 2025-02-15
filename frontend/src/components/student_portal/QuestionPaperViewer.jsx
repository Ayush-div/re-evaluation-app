import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const QuestionPaperViewer = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjects,setSubjects] = useState([]);
  const [papers,setPapers] = useState([]);

  useEffect(() => {
    fetchReEvaluationData();
  }, []);

  const fetchReEvaluationData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/students/get-papers-for-reevaluation', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Raw API Response:', response.data);
      console.log("Data found by ayush is  : ",response.data.data)
      setSubjects(response.data.data.map((item, index) => ({
        id: index + 1,
        name: item.subjectName
      })));

      const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toISOString().split('T')[0].split('-').reverse().join('-'); // Format: DD-MM-YYYY
    };
    
    setPapers(response.data.data.map((paper, index) => ({
        id: index + 1,
        subject: paper.subjectName,
        examDate: formatDate(paper.examDate),
        examDuration: `${paper.duration} minutes`,
        totalMarks: paper.totalMarks,
        resources: [
            { 
                name: "Question Paper", 
                type: "pdf", 
                url: paper.questionPdfPath,
                lastUpdated: formatDate(paper.updatedAt)
            }
        ]
    })));
    
      // console.log("Subjects defined by ayush is : ",subjects)

    } catch (err) {
      console.error('API Error Details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError('Failed to load question paper data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // const handleDownload = (resource) => {
  //   if (resource.isPremium) {
  //     // Show premium modal or redirect to subscription
  //     alert("This is a premium resource. Please subscribe to download.");
  //     return;
  //   }
  //   // Implement download logic
    
  //   alert(`Downloading ${resource.name}...`);
  // };
  const handleDownload = (resource) => {
    const link = document.createElement('a');
    link.href = resource.url;
    link.setAttribute('download', resource.name || 'document.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPapers = papers.filter(paper => 
    (!selectedSubject || paper.subject === selectedSubject) &&
    (!searchQuery || 
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase())
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
              <div className="flex flex-wrap gap-2">
                
              </div>
            </div>
          </div>
        </div>

        {error && <p className="text-center text-red-500">{error}</p>}

        {loading && <p className="text-center text-gray-500">Loading question papers...</p>}

        {/* Papers Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredPapers.map(paper => (
            <div key={paper.id} className="bg-white rounded-[12px] border border-[#DADADA] p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1E232C]">{paper.subject}</h2>
                  {/* <p className="text-[#6A707C]">{paper.exam} </p> */}
                </div>
                <div className="text-right text-[#6A707C] text-sm">
                  <p>examDate: {paper.examDate}</p>
                  <p>examDuration: {paper.examDuration}</p>
                  <p>totalMarks: {paper.totalMarks}</p>
                </div>
              </div>

              {/* Resources - Now grouped by category */}
              <div className="space-y-6 mb-6">
                {/* Exam Materials */}
                <div>
                  <h3 className="text-[#1E232C] font-medium mb-3">Exam Materials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paper.resources
                      // .filter(resource => resource.category === 'exam')
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
                              {/* <p className="text-xs text-[#6A707C]">{resource.size} </p> */}
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
