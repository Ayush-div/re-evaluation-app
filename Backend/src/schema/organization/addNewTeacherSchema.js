const mongoose = require("mongoose");

const adminAddTeacherSchema = new mongoose.Schema(
  {
    
    teacherId: {
      type: String,
      required: [true, "teacherId is required"],
      unique: true, 
      trim: true, 
    },
    teacherName : {
        type : String,
        required : [true, "Teacher name is required"],
        trim : true, 
        lowercase : true,
        maxlength : [20, "studentName must be less than or equal to 20 character long"],
    },
    mobileNumber : {
        type : String,
        trim : true,
        required : [true, "Please provide teacher's Phone number"],
        unique : [true, "Phone number is already in use"],
        maxlength : [10, "Max length of phone number should be of 10"],
        maxlength : [10, "Min length of phone number should be of 10"],
    },
    email : {
        trim : true,
        unique : [true, "This Email is already in use"],
        required : [true, "Email should be required"],
        type : String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    department : {
        trim : true,
        required : [true, "department should be required"],
        type : String,
        lowercase : true,
    },
    role : {
        trim : true,
        type : String,
        lowercase : true,
    },
    qualification: {
        type: String,
        lowercase : true,
        maxlength: [30, "Length must be less than thirty"]
    },
    document: {
        require: [true, "Document must be required"],
        url: String,
        publicId: String,
        uploadedAt: Date,
    }
  },
  { timestamps: true }
);


const adminAddTeacher = mongoose.model("adminAddTeacher", adminAddTeacherSchema); // Create model

module.exports = adminAddTeacher;
