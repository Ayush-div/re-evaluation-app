const mongoose = require('mongoose');

const selectedQuestionSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        default: ''
    },
    issueType: {
        type: String,
        default: ''
    },
    customDescription: {
        type: String,
        default: ''
    }
});

const reevaluationApplicationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    paperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionPaper',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    selectedQuestions: [selectedQuestionSchema],
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ReevaluationApplication= mongoose.model('ReevaluationApplication', reevaluationApplicationSchema);
module.exports =ReevaluationApplication