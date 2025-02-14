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

const subpartOfSubpartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    // stats: statsSchema
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
    subpartOfSubpart: [subpartOfSubpartSchema]
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
    subpart: [subpartSchema]
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
        required: true
    },
    // organizationId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Organization',
    //     required: true
    // },
    // allowedStudents: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Student'
    // }],
    // reEvaluationDeadline: {
    //     type: Date,
    //     required: true
    // }
}, { timestamps: true });

// questionPaperSchema.methods.canStudentAccess = async function(studentId) {
//     return this.allowedStudents.includes(studentId);
// };

const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);
module.exports = QuestionPaper;