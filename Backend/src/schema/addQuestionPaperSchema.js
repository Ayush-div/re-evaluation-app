import mongoose from "mongoose";

const subpartOfSubpart = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
})

const subpartSchema = new mongoose.Schema({
    subpartText: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    subpartOfSubpart: [subpartOfSubpart]
})

const numberOfQuestion = new mongoose.Schema({
    questiontext: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    subpart: [subpartSchema]
})

const addQuestionPaperSchema = new mongoose.Schema({
    addQuestionPaper: [numberOfQuestion]
}, { timestamps: true })


export const addQuestionPaper = mongoose.model("addQuestionPaper", addQuestionPaperSchema)