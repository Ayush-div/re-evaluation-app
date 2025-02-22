const fs = require('fs');
const { cloudinary, generatePublicPdfUrl } = require('../config/cloudinaryConfig');
// Remove or comment out the separate QuestionPaper model import if no longer needed
// const QuestionPaper = require("../schema/organization/addQuestionPaperSchema.js");

const addQuestionPaperController = async (req, res) => {
    try {
        console.log("File received:", req.file);
        console.log("Body received:", req.body);

        if (!req.organization?._id) {
            return res.status(401).json({
                success: false,
                message: 'Organization authentication required'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Question paper PDF file is required'
            });
        }

        // Upload file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'question-papers',
            resource_type: 'raw',
            public_id: `${Date.now()}_${req.file.originalname}`,
            tags: ['question_paper'],
            access_mode: 'public',
            type: 'upload',
            format: 'pdf'
        });

        console.log('Cloudinary upload result:', uploadResult);
        const publicUrl = generatePublicPdfUrl(uploadResult);

        // Clean up local file after upload
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting local file:', err);
        });

        // Create paper data object
        const questionPaperData = {
            subjectName: req.body.subjectName,
            examDate: req.body.examDate,
            totalMarks: parseInt(req.body.totalMarks),
            duration: parseInt(req.body.duration),
            department: req.body.department,
            semester: parseInt(req.body.semester),
            questions: JSON.parse(req.body.questions || '[]'),
            questionPdfPath: publicUrl,
            createdAt: new Date(),
            organizationId: req.organization._id // Include organizationId field
        };

        // Push the question paper into the organization's embedded questionPapers field
        req.organization.questionPapers.push(questionPaperData);
        await req.organization.save();

        return res.status(201).json({
            success: true,
            message: 'Question paper added successfully',
            data: {
                ...questionPaperData,
                pdfUrl: publicUrl
            }
        });

    } catch (error) {
        console.error('Add question paper error:', error);
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, () => {});
        }
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to add question paper',
            details: error
        });
    }
};

module.exports = { addQuestionPaperController };