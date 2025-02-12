import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AddQuestionPaper() {
       const [examDetails, setExamDetails] = useState({
            subject: '',
            examDate: '',
            totalMarks: '',
            duration: '',
            department: '',
            semester: '',
            academicYear: ''
        });
        const [totalQuestions, setTotalQuestions] = useState('');
        const [questions, setQuestions] = useState([]);
        
    
        // Add a new question
        const generateQuestions = (total) => {
            const newQuestions = Array(parseInt(total)).fill().map((_, index) => ({
                id: index + 1,
                // text: '',
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
                            // text: '',
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
                                        // text: '',
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
    
    return (
        <div>
            <>
                {/* Display exam details summary */}
                <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Exam Details</h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><span className="font-medium">Subject:</span> {examDetails.subject}</p>
                        <p><span className="font-medium">Date:</span> {examDetails.examDate}</p>
                        <p><span className="font-medium">Total Marks:</span> {examDetails.totalMarks}</p>
                        <p><span className="font-medium">Duration:</span> {examDetails.duration} minutes</p>
                        <p><span className="font-medium">Department:</span> {examDetails.department}</p>
                        <p><span className="font-medium">Semester:</span> {examDetails.semester}</p>
                        <p><span className="font-medium">Academic Year:</span> {examDetails.academicYear}</p>
                    </div>
                </div>

                {/* Initial Input for number of questions */}
                <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-6">
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                Total Number of Questions
                            </label>
                            <input
                                type="number"
                                value={totalQuestions}
                                onChange={(e) => setTotalQuestions(e.target.value)}
                                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] 
                                focus:outline-none focus:border-black transition-all"
                                placeholder="Enter number of questions"
                            />
                        </div>
                        <button
                            onClick={() => generateQuestions(totalQuestions)}
                            className="px-6 py-2 bg-black text-white rounded-[8px] 
                            hover:bg-gray-800 transition-all"
                        >
                            Generate Template
                        </button>
                    </div>
                </div>

                {/* Questions List */}
                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <motion.div
                            key={question.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white rounded-[12px] border border-[#DADADA] p-6"
                        >
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                        Question {question.id}
                                    </label>
                                    {/* <input
                                        type="text"
                                        placeholder="Enter question text"
                                        className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] 
                                        focus:outline-none focus:border-black transition-all"
                                    /> */}
                                </div>
                                <div className="w-32">
                                    <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                        Marks
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Marks"
                                        className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] 
                                        focus:outline-none focus:border-black transition-all"
                                    />
                                </div>
                                <button
                                    onClick={() => addSubpart(question.id)}
                                    className="self-end px-4 py-2 text-[#6A707C] hover:text-black 
                                    border border-[#DADADA] rounded-[8px] hover:border-black 
                                    transition-all flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Subpart
                                </button>
                            </div>

                            {/* Subparts */}
                            <div className="pl-6 space-y-4">
                                {question.subparts.map((subpart) => (
                                    <motion.div
                                        key={subpart.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-l-2 border-[#DADADA] pl-4"
                                    >
                                        <div className="flex gap-4 mb-4">
                                            {/* Subpart inputs */}
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                                    Subpart {question.id}.{subpart.id}
                                                </label>
                                                {/* <input
                                                    type="text"
                                                    placeholder="Enter subpart text"
                                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] 
                                                    focus:outline-none focus:border-black transition-all"
                                                /> */}
                                            </div>
                                            <div className="w-32">
                                                <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                                    Marks
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Marks"
                                                    className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] 
                                                    focus:outline-none focus:border-black transition-all"
                                                />
                                            </div>
                                            <button
                                                onClick={() => addSubSubpart(question.id, subpart.id)}
                                                className="self-end px-4 py-2 text-[#6A707C] hover:text-black 
                                                border border-[#DADADA] rounded-[8px] hover:border-black 
                                                transition-all flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Add Sub-subpart
                                            </button>
                                        </div>

                                        {/* Sub-subparts */}
                                        <div className="pl-6 space-y-4">
                                            {subpart.subsubparts.map((subsubpart) => (
                                                <motion.div
                                                    key={subsubpart.id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="border-l-2 border-[#DADADA] pl-4"
                                                >
                                                    {/* Sub-subpart inputs */}
                                                    <div className="flex gap-4">
                                                        <div className="flex-1">
                                                            <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                                                Sub-subpart {question.id}.{subpart.id}.{subsubpart.id}
                                                            </label>
                                                            {/* <input
                                                                type="text"
                                                                placeholder="Enter sub-subpart text"
                                                                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] 
                                                                focus:outline-none focus:border-black transition-all"
                                                            /> */}
                                                        </div>
                                                        <div className="w-32">
                                                            <label className="block text-sm font-medium text-[#1E232C] mb-2">
                                                                Marks
                                                            </label>
                                                            <input
                                                                type="number"
                                                                placeholder="Marks"
                                                                className="w-full px-4 py-2 rounded-[8px] border border-[#DADADA] 
                                                                focus:outline-none focus:border-black transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {questions.length > 0 && (
                    <div className="mt-6 flex justify-end">
                        <button
                            className="px-6 py-2 bg-black text-white rounded-[8px] 
                            hover:bg-gray-800 transition-all"
                        >
                            Save Question Paper
                        </button>
                    </div>
                )}
            </>

        </div>

    )
}