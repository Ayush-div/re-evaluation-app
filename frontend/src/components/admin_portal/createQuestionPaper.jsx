import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CreateQuestionPaper = () => {
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
            text: '',
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
                        text: '',
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
                                    text: '',
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

    const [formData, setFormData] = useState({
        subjectName: '',
        examDate: '',
        totatMarks: '',
        duration: '',
        department: '',
        semester: ''    // Add semester
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        try {
            const response = await axios.post('/api/organization/add-question-paper', {
                subjectName: formData.subjectName,
                examDate: formData.examDate,
                totatMarks: formData.totatMarks,
                duration: formData.duration,
                department: formData.department,
                semester: formData.semester
            });
            console.log("Response is : ", response.data.message);
            if (response.data.message === 'successfully resistered the user') {
                navigate('/student/registration-successful');
            }

        } catch (error) {
            console.error('Error registering student:', error);
        }
    };


    return (
        <div className="min-h-screen bg-[#F7F8F9] font-['Urbanist'] p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-[#1E232C] mb-8">Create Question Paper</h1>

                {/* Exam Details Form */}

                <form onSubmit={() => navigate('/')} className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-6">
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
                    <Link to='/organization/add-question-paper'>
                        <div className="mt-6 flex justify-end" >
                            <button
                                type="submit"
                                className="px-6 py-2 bg-black text-white rounded-[8px] hover:bg-gray-800 transition-all"

                            >
                                Continue to Questions
                            </button>
                        </div>
                    </Link >
                </form>


                {/* Question Builder Section */}

            </div>
        </div>
    );
};

export default CreateQuestionPaper;
