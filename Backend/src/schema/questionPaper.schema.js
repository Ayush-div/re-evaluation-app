const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    doubts: {
        type: Number,
        default: 0
    },
    commonIssues: {
        type: String,
        enum: ['Calculation Errors', 'Unmarked Answers', 'Incorrect Marking', 'Others'],
        default: 'Others'
    }
});

const solutionVideoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    uploadedBy: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        }
    }
});

const subSubpartsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    // stats: statsSchema,
    videoSolution:solutionVideoSchema
});

const subpartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    // stats: statsSchema,
    subsubparts: [subSubpartsSchema],
    videoSolution:solutionVideoSchema
});

const questionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    // stats: statsSchema,
    subparts: [subpartSchema],
    videoSolution:solutionVideoSchema
});

const questionPaperSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    examDate: {
        type: Date,
        required: true
    },
    totalMarks: {  
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    questions: [questionSchema],

    questionPdfPath: {
        type: String,
        required: [true, 'Question paper PDF URL is required']
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, 'Organization ID is required']
    },
    // allowedStudents: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Student'
    // }],
    // reEvaluationDeadline: {
    //     type: Date,
    //     required: true
    // }
}, {
    timestamps: true,
    toJSON: { getters: true }
});

module.exports=questionPaperSchema