const mongoose = require('mongoose');

const reevaluationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    subjectName: {
        type: String,
        required: true
    },
    questions: [{
        questionId: String,
        marks: Number,
        issueType: String,
        remarks: String,
        status: {
            type: String,
            enum: ['pending', 'assigned', 'in_review', 'completed'],
            default: 'pending'
        }
    }],
    doubts: [{
        questionNumber: {
            type: String,
            required: true
        },
        partNumber: String,
        subPartNumber: String,
        issueType: {
            type: String,
            enum: ['Calculation Errors', 'Unmarked Answers', 'Incorrect Marking', 'Others'],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        remarks: String,
        marksAwarded: Number,
        originalMarks: Number,
        attachments: [{
            url: String,
            uploadedAt: Date
        }],
        status: {
            type: String,
            enum: ['pending', 'in_review', 'resolved', 'rejected'],
            default: 'pending'
        },
        teacherRemarks: String,
        resolvedAt: Date
    }],
    selectedQuestions: [{
        questionNumber: String,
        partNumber: String,
        subPartNumber: String,
        originalMarks: Number,
        issueType: {
            type: String,
            enum: ['Calculation Errors', 'Unmarked Answers', 'Incorrect Marking', 'Others'],
            required: true
        },
        remarks: String,
        customIssueDescription: String,
        status: {
            type: String,
            enum: ['pending', 'assigned', 'in_review', 'completed', 'rejected'],
            default: 'pending'
        },
        marksAwarded: Number,
        teacherRemarks: String
    }],
    status: {
        type: String,
        enum: ['pending', 'assigned', 'in_review', 'completed', 'rejected'],
        default: 'pending'
    },
    paymentId: String,
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentDetails: {
        paymentId: String,
        amount: Number,
        paidAt: Date,
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending'
        }
    },
    notifications: [{
        message: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        read: {
            type: Boolean,
            default: false
        }
    }],
    assignedAt: Date,
    completedAt: Date,
    amount: Number,
    questionPaperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionPaper',
        required: true
    },
    workflowStages: [{
        stage: {
            type: String,
            enum: ['submitted', 'payment_completed', 'org_reviewed', 'teacher_assigned', 'under_review', 'completed']
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        notes: String
    }]
}, { timestamps: true });

const Reevaluation = mongoose.model('Reevaluation', reevaluationSchema);
module.exports = { Reevaluation };
