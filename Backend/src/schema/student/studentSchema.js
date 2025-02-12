const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, "studentName is required"],
        trim: true,
        lowercase: true,
        maxlength: [20, "studentName must be less than or equal to 20 character long"],
    },
    email: {
        trim: true,
        unique: [true, "This Email is already in use"],
        required: [true, "Email should be required"],
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        required: [true, "Password should be provided"],
        minlength: [6, "Password should be minimum six character long"],
        type: String,
    },
    rollNumber: {
        type: String,
        required: [true, "Roll number is Required!"],
        unique: [true, "rollnumber must be unique"],
    },
    mobileNumber: {
        type: String,
        trim: true,
        required: [true, "Please provide teacher's Phone number"],
        unique: [true, "Phone number is already in use"],
        maxlength: [10, "Max length of phone number should be of 10"],
        maxlength: [10, "Min length of phone number should be of 10"],
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


studentSchema.pre('save', async function () {
    // here you can modify your user before it is saved in mongodb

    // console.log(this); // it will print all those things which the user has passed like in this case studentName, email, password, mobileNumber
    const hasedPassword = await bcrypt.hash(this.password, 10);
    this.password = hasedPassword;
})
const Student = mongoose.model("student", studentSchema); // collection

module.exports = Student;
