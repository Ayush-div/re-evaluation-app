import mongoose from 'mongoose'

const createQuestionPaperFormSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    examDate: {
        type: Date,
        required: true
    },
    totatMarks: {
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
    }
}, { timestamps: true })

export const addQuestionPaper = mongoose.model("addQuestionPaper", createQuestionPaperFormSchema)