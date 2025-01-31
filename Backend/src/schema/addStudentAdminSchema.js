const mongoose = require("mongoose");

const adminStudentSchema = new mongoose.Schema(
  {
    email : {
      trim : true,
      unique : [true, "This Email is already in use"],
      required : [true, "Email should be required"],
      type : String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
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
