const mongoose = require("mongoose");

const adminStudentSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      trim: true,
      required: [true, "Please provide your Phone number"],
      maxlength: [10, "Max length of phone number should be 10"],
      minlength: [10, "Min length of phone number should be 10"], 
    },
    rollNumber: {
      type: String,
      required: [true, "Roll Number is required"],
      unique: true, 
      trim: true, 
    }
  },
  { timestamps: true }
);


const adminStudent = mongoose.model("adminStudent", adminStudentSchema); // Create model

module.exports = adminStudent;
