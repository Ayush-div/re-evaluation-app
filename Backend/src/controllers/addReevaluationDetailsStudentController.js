const { storeStudentDoubts } = require('../services/student.service');
const { Student } = require("../schema/student/studentSchema.js");
const QuestionPaper = require("../schema/organization/addQuestionPaperSchema.js");

const applyForReevaluationController = async (req, res) => {
    try {
        const studentId = req.student._id;
        const { selectedQuestions, subject, issueTypes, remarks, customIssueDescriptions } = req.body;

        // Find paper and include organization data
        const paper = await QuestionPaper.findById(subject.id);
        if (!paper) {
            return res.status(404).json({
                success: false,
                message: 'Question paper not found'
            });
        }

        console.log('Organizations:', {
            studentOrg: req.student.organizationId,
            paperOrg: paper.organizationId
        });

        // Compare organization IDs as strings
        if (!req.student.organizationId || !paper.organizationId || 
            req.student.organizationId.toString() !== paper.organizationId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Paper belongs to a different organization.'
            });
        }

        console.log('Processing reevaluation request:', {
            studentId,
            paperId: subject.id,
            selectedQuestions
        });

        // Format doubts
        const doubts = selectedQuestions.map(questionId => ({
            questionId,
            paperId: subject.id,
            subjectName: subject.name,
            doubtType: issueTypes[questionId],
            remarks: remarks[questionId],
            description: customIssueDescriptions[questionId],
            status: 'pending',
            createdAt: new Date()
        }));

        // Update accessiblePapers array
        const student = await Student.findById(studentId);
        if (!student.accessiblePapers) {
            student.accessiblePapers = [];
        }

        const paperIndex = student.accessiblePapers.findIndex(
            p => p.questionPaperId.toString() === subject.id
        );

        if (paperIndex === -1) {
            // Add new paper access
            student.accessiblePapers.push({
                questionPaperId: subject.id,
                paymentStatus: 'completed',
                accessGrantedAt: new Date()
            });
        } else {
            // Update existing paper access
            student.accessiblePapers[paperIndex].paymentStatus = 'completed';
            student.accessiblePapers[paperIndex].lastUpdated = new Date();
        }

        // Add doubts
        if (!student.doubts) {
            student.doubts = [];
        }
        student.doubts.push(...doubts);

        // Save changes
        const updatedStudent = await student.save();

        console.log('Successfully stored doubts and updated paper access');

        res.status(200).json({
            success: true,
            message: 'Reevaluation request submitted successfully',
            data: {
                doubts: updatedStudent.doubts,
                accessiblePapers: updatedStudent.accessiblePapers
            }
        });
    } catch (error) {
        console.error('Reevaluation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process re-evaluation request'
        });
    }
};

module.exports = { applyForReevaluationController };

