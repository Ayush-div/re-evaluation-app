import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


let Response = {};
const AddQuestionPaper = () => {
    const navigate = useNavigate();
    const [examDetails, setExamDetails] = useState({
        subject: '',
        examDate: '',
        totalMarks: '',
        duration: '',
        department: '',
        semester: '',
        // academicYear: ''
    });
    const [totalQuestions, setTotalQuestions] = useState('');
    const [questions, setQuestions] = useState([]);
    const [showQuestionBuilder, setShowQuestionBuilder] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Add a new question
    const generateQuestions = (total) => {
        const newQuestions = Array(parseInt(total)).fill().map((_, index) => ({
            id: index + 1,
            marks: '',
            subparts: []
        }));
        setQuestions(newQuestions);
    };

    // Add subpart to a question
    const addSubpart = (questionId) => {

        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    subparts: [...q.subparts, {
                        id: q.subparts.length + 1,
                        marks: '',
                        subsubparts: []
                    }]
                };
            }
            return q;
        }));
    };

    // Add sub-subpart to a subpart
    const addSubSubpart = (questionId, subpartId) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    subparts: q.subparts.map(sp => {
                        if (sp.id === subpartId) {
                            return {
                                ...sp,
                                subsubparts: [...sp.subsubparts, {
                                    id: sp.subsubparts.length + 1,
                                    marks: ''
                                }]
                            };
                        }
                        return sp;
                    })
                };
            }
            return q;
        }));
    };

    // Add new function to remove subpart
    const removeSubpart = (questionId, subpartId) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    subparts: q.subparts.filter(sp => sp.id !== subpartId)
                };
            }
            return q;
        }));
    };

    const handleSubmitExamDetails = async (e) => {
        e.preventDefault();
        // Temporarily remove API call and just show the question builder
        // setShowQuestionBuilder(true);
        // //agar api call rakhni hai toh keep this syntax=> 
        
        try {
            console.log(e.target.value)
            const response = await axios.post('/api/organization/add-question-paper', examDetails);
            console.log('Response:', response);  // Add this for debugging
            setShowQuestionBuilder(true);  // Move this inside try block
        } catch (error) {
            console.error('Error saving exam details:', error);
            alert('Failed to save exam details. Please try again.');
        }
    };

    // Add console log to debug state
    console.log('showQuestionBuilder:', showQuestionBuilder);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    };

    const validateAndSetFile = (file) => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (validTypes.includes(file.type)) {
            setSelectedFile(file);
        } else {
            alert('Please upload a PDF or Word document');
        }
    };

    // const handleUpload = async () => {
    //     if (!selectedFile) {
    //         alert('Please select a file first');
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('questionPaper', selectedFile);
    //     formData.append('examDetails', JSON.stringify(examDetails));

    //     try {
    //         const response = await axios.post('/api/upload-question-paper', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         if (response.data.success) {
    //             alert('Question paper uploaded successfully!');
    //             navigate('/organization/question-papers');
    //         }
    //     } catch (error) {
    //         console.error('Upload failed:', error);
    //         alert('Failed to upload question paper');
    //     }
    // };

    const handleFinalSubmit = async () => {
        try {
            const questionPaperData = {
                examDetails,
                questions,
                file: selectedFile // Include file if it exists
            };
            console.log("Question paper data is : ",questionPaperData)
            const response = await axios.post('/api/organization/add-question-paper', questionPaperData);
            Response = response;

            console.log(response.data.message);
            console.log(questionPaperData)
            if (response.data.success) {
                alert('Question paper submitted successfully!');
                navigate('/organization/question-papers');
            }
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to submit question paper');
        }
    };

    // const handleFinalSubmit = async () => {
    //     try {
    //         const formData = new FormData();
    
    //         // Debugging: Ensure data exists before appending
    //         console.log("Exam Details:", examDetails);
    //         console.log("Questions:", questions);
    //         console.log("Selected File:", selectedFile);
    
    //         if (examDetails && Object.keys(examDetails).length > 0) {
    //             formData.append('examDetails', JSON.stringify(examDetails));
    //         } else {
    //             console.warn("⚠️ examDetails is empty or undefined!");
    //         }
    
    //         if (questions.length > 0) {
    //             formData.append('questions', JSON.stringify(questions));
    //         } else {
    //             console.warn("⚠️ questions array is empty!");
    //         }
    
    //         if (selectedFile) {
    //             console.log("Selected File Name:", selectedFile.name);
    //             formData.append('file', selectedFile);
    //         } else {
    //             console.warn("⚠️ No file selected!");
    //         }
    
    //         // Debug: Check if formData has content
    //         console.log("Final FormData Entries:");
    //         for (let pair of formData.entries()) {
    //             console.log(pair[0], pair[1]);
    //         }

    //         // console.log(formData.entries())
    
    //         const response = await axios.post('/api/organization/add-question-paper', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         Response = response;
    //         console.log("Response is  : ",Response);
    //         console.log(Response.data.message);
    //         console.log(Response.data.data.response);
    //         if (response.data.success) {
    //             alert('Question paper submitted successfully!');
    //             navigate('/organization/question-papers');
    //         }
    //     } catch (error) {
    //         console.error('Submission failed:', error);
    //         alert('Failed to submit question paper');
    //     }
    // };
    
    
    // Update the render upload section to include both upload and submit buttons
    const renderUploadSection = () => (
        <div className="mt-6 space-y-6">
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
                    ${isDragging ? 'border-black bg-gray-50' : 'border-gray-300'}
                    ${selectedFile ? 'bg-green-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center gap-4">
                    <svg 
                        className={`w-12 h-12 ${selectedFile ? 'text-green-500' : 'text-gray-400'}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    
                    <div className="text-sm text-gray-600">
                        {selectedFile ? (
                            <p className="text-green-600">Selected: {selectedFile.name}</p>
                        ) : (
                            <>
                                <p className="font-medium mb-2">Drag and drop your file here</p>
                                <p className="text-gray-500 mb-4">or</p>
                                <button
                                    onClick={() => document.getElementById('fileInput').click()}
                                    className="px-4 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all"
                                >
                                    Browse Files
                                </button>
                                <input
                                    id="fileInput"
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileSelect}
                                />
                            </>
                        )}
                    </div>
                    
                    <p className="text-xs text-gray-500">
                        Supported formats: PDF, DOC, DOCX
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                {selectedFile && (
                    <button
                        onClick={() => setSelectedFile(null)}
                        className="px-6 py-2 border border-gray-300 text-gray-600 rounded-[8px] hover:bg-gray-100 transition-all"
                    >
                        Clear File
                    </button>
                )}
                <button
                    onClick={handleFinalSubmit}
                    className="px-6 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all"
                >
                    Final Submit
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-[#1E232C] mb-8">Create Question Paper</h1>

                {/* Exam Details Form */}
                {!showQuestionBuilder && (
                    <form onSubmit={handleSubmitExamDetails} className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={examDetails.subject}
                                    onChange={(e) => setExamDetails({ ...examDetails, subject: e.target.value })}
                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                    placeholder="Enter subject name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                    Exam Date
                                </label>
                                <input
                                    type="date"
                                    value={examDetails.examDate}
                                    onChange={(e) => setExamDetails({ ...examDetails, examDate: e.target.value })}
                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                    Total Marks
                                </label>
                                <input
                                    type="number"
                                    value={examDetails.totalMarks}
                                    onChange={(e) => setExamDetails({ ...examDetails, totalMarks: e.target.value })}
                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                    placeholder="Enter total marks"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                    Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={examDetails.duration}
                                    onChange={(e) => setExamDetails({ ...examDetails, duration: e.target.value })}
                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                    placeholder="Enter duration in minutes"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    value={examDetails.department}
                                    onChange={(e) => setExamDetails({ ...examDetails, department: e.target.value })}
                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                    placeholder="Enter department name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                    Semester
                                </label>
                                <input
                                    type="number"
                                    value={examDetails.semester}
                                    onChange={(e) => setExamDetails({ ...examDetails, semester: e.target.value })}
                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                    placeholder="Enter semester number"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all"
                            >
                                Continue to Questions
                            </button>
                        </div>
                    </form>
                )}

                {/* Question Builder Section */}
                {showQuestionBuilder && (
                    <div className="space-y-6">
                        {/* Exam Details Summary */}
                        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
                            <h2 className="text-lg font-semibold mb-4">Exam Details</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Subject:</span> {examDetails.subject}
                                </div>
                                <div>
                                    <span className="font-medium">Exam Date:</span> {examDetails.examDate}
                                </div>
                                <div>
                                    <span className="font-medium">Total Marks:</span> {examDetails.totalMarks}
                                </div>
                                <div>
                                    <span className="font-medium">Duration:</span> {examDetails.duration} minutes
                                </div>
                                <div>
                                    <span className="font-medium">Department:</span> {examDetails.department}
                                </div>
                                <div>
                                    <span className="font-medium">Semester:</span> {examDetails.semester}
                                </div>
                            </div>
                        </div>

                        {/* Questions Input Section */}
                        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6">
                            <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                        Total Number of Questions
                                    </label>
                                    <input
                                        type="number"
                                        value={totalQuestions}
                                        onChange={(e) => setTotalQuestions(e.target.value)}
                                        className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                        placeholder="Enter number of questions"
                                        onKeyDown={(e)=>{ 
                                            if (e.key === "Enter" && (e.value != 0)) {
                                                return generateQuestions(totalQuestions);
                                            }  
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={() => generateQuestions(totalQuestions)}
                                    className="px-6 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all"
                                >
                                    Generate Template
                                </button>
                            </div>
                        </div>

                        {/* Questions List */}
                        {questions.map((question, qIndex) => (
                            <motion.div
                                key={question.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[12px] border border-[#DADADA] p-6"
                            >
                                <div className="flex gap-4 items-end mb-4">
                                    <div className="flex-1">
                                        <h1 className="block text-sm font-bold text-[#1E232C] mb-2">
                                            Question {qIndex + 1}
                                        </h1>
                                    </div>
                                    <div className={`marks${qIndex} w-32`}>
                                        <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                            Marks
                                        </label>
                                        <input
                                            type="number"
                                            value={question.marks}
                                            onChange={(e) => {
                                                const newQuestions = [...questions];
                                                newQuestions[qIndex].marks = e.target.value;
                                                setQuestions(newQuestions);
                                            }}
                                            className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                            placeholder="Marks"
                                        />
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            document.querySelector(`.marks${qIndex}`).classList.add("hidden");
                                            document.querySelector(`.marks${qIndex} input`).value = "";
                                            return addSubpart(question.id)
                                        }}
                                        className="px-3 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-all flex items-center justify-center"
                                        title="Add Subpart"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="20" 
                                            height="20" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    </button>
                                </div>

                                {/* Subparts */}
                                {question.subparts.map((subpart, spIndex) => (
                                    <div key={subpart.id} className="ml-8 mt-4">
                                        <div className="flex gap-4 items-end mb-4">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                                    Subpart {qIndex + 1}.{spIndex + 1}
                                                </label>
                                                {/* <input
                                                    type="text"
                                                    value={subpart.text}
                                                    onChange={(e) => {
                                                        const newQuestions = [...questions];
                                                        newQuestions[qIndex].subparts[spIndex].text = e.target.value;
                                                        setQuestions(newQuestions);
                                                    }}
                                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                                    placeholder="Enter subpart text"
                                                /> */}
                                            </div>
                                            <div className= {`Marks${qIndex + 1}_${spIndex + 1} w-32`}>
                                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                                    Marks
                                                </label>
                                                <input
                                                    type="number"
                                                    value={subpart.marks}
                                                    onChange={(e) => {
                                                        const newQuestions = [...questions];
                                                        newQuestions[qIndex].subparts[spIndex].marks = e.target.value;
                                                        setQuestions(newQuestions);
                                                    }}
                                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                                    placeholder="Marks"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        document.querySelector(`.Marks${qIndex + 1}_${spIndex + 1}`).classList.add("hidden");
                                                        document.querySelector(`.Marks${qIndex + 1}_${spIndex + 1} input`).value = "";
                                                        return addSubSubpart(question.id, subpart.id)}
                                                    }
                                                    className="px-3 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-all flex items-center justify-center"
                                                    title="Add Sub-subpart"
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        width="20" 
                                                        height="20" 
                                                        viewBox="0 0 24 24" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeWidth="2" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round"
                                                    >
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        document.querySelector(`.marks${qIndex}`).classList.remove("hidden");
                                                        return removeSubpart(question.id, subpart.id)}
                                                    }
                                                    className="px-3 py-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-all flex items-center justify-center"
                                                    title="Remove Subpart"
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        width="20" 
                                                        height="20" 
                                                        viewBox="0 0 24 24" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeWidth="2" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round"
                                                    >
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-4 ml-8">
                                            {subpart.subsubparts.map((subsubpart, sspIndex) => (
                                                <div key={subsubpart.id} className="bg-gray-100 rounded-[8px] p-4">
                                                    <div className="flex gap-4 items-end mb-4">
                                                        <div className="flex-1">
                                                            <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                                                Sub-subpart {qIndex + 1}.{spIndex + 1}.{sspIndex + 1}
                                                            </label>
                                                            {/* <input
                                                                type="text"
                                                                value={subsubpart.text}
                                                                onChange={(e) => {
                                                                    const newQuestions = [...questions];
                                                                    newQuestions[qIndex].subparts[spIndex].subsubparts[sspIndex].text = e.target.value;
                                                                    setQuestions(newQuestions);
                                                                }}
                                                                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                                                placeholder="Enter sub-subpart text"
                                                            /> */}
                                                        </div>
                                                        <div className="w-32">
                                                            <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                                                Marks
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={subsubpart.marks}
                                                                onChange={(e) => {
                                                                    const newQuestions = [...questions];
                                                                    newQuestions[qIndex].subparts[spIndex].subsubparts[sspIndex].marks = e.target.value;
                                                                    setQuestions(newQuestions);
                                                                }}
                                                                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] focus:outline-none focus:border-black transition-all"
                                                                placeholder="Marks"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ))}


                        {questions.length > 0 && renderUploadSection()}
                    </div>
                )}
            </div>
        </div>
    );
};

export {AddQuestionPaper , Response};
