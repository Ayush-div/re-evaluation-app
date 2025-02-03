const mongoose = require('mongoose');

const subpartOfSubpartSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
});


const subpartSchema = new mongoose.Schema({
    subpartText: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    subpartOfSubpart: [subpartOfSubpartSchema]
});


const questionSchema = new mongoose.Schema({
    questiontext: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
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
    }
}, { timestamps: true });

const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);
module.export = QuestionPaper; 