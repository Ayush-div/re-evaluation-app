const mongoose = require("mongoose");

const adminTeacherSchema = new mongoose.Schema(
    {
        email: {
            trim: true,
            unique: [true, "This Email is already in use"],
            required: [true, "Email should be required"],
            type: String,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        fullName: {
            type: String,
            required: [true, "Full Name is required"],
            trim: true,
        }
    },
    { timestamps: true }
);


const adminTeacher = mongoose.model("adminTeacher", adminTeacherSchema); 

module.exports = {adminTeacher};
