const mongoose = require("mongoose");

const questionPaperResources = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: [true, "Please select Year"],

    },
    subject: {
        type: String,
        required: [true, "Please specify year"],
        
    },
    questionPaper: {

    },
    answerKey: {

    }

  },
  { timestamps: true }
);


const adminStudent = mongoose.model("adminStudent", adminStudentSchema); // Create model

module.exports = adminStudent;
