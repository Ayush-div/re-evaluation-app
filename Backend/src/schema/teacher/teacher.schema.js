const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema(
    {
        teacherName: {
            type: String,
            required: [true, "Teacher name is required"],
            trim: true,
            lowercase: true,
            maxlength: [20, "studentName must be less than or equal to 20 character long"],
        },
        phoneNumber: {
            type: String,
            trim: true,
            required: [true, "Please provide teacher's Phone number"],
            unique: [true, "Phone number is already in use"],
            maxlength: [10, "Max length of phone number should be of 10"],
            maxlength: [10, "Min length of phone number should be of 10"],
        },
        email: {
            trim: true,
            unique: [true, "This Email is already in use"],
            required: [true, "Email should be required"],
            type: String,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        department: {
            trim: true,
            required: [true, "department should be required"],
            type: String,
            lowercase: true,
        },
        role: {
            trim: true,
            type: String,
            lowercase: true,
        },
        qualification: {
            type: String,
            lowercase: true,
            maxlength: [30, "Length must be less than thirty"]
        },
        document: {
            // require: [true, "Document must be required"],
            url: String,
            publicId: String,
            uploadedAt: Date,
        },
        password: {
            required: [true, "Password should be provided"],
            minlength: [6, "Password should be minimum six character long"],
            type: String,
        },
        organization: {
            type: String,
            required: true
        },
        orgID: {
            type: String,
            required: true
        },
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        },
        assignedReevaluations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reevaluation'
        }],
        subjects: [{
            type: String,
            required: true
        }],
        videoSolutions: [{
            questionPaperId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'QuestionPaper'
            },
            questionId: String,
            videoUrl: String,
            title: String,
            description: String,
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
    { timestamps: true }
);

teacherSchema.pre('save', async function () {
    // console.log(this); // it will print all those things which the user has passed like in this case studentName, email, password, mobileNumber
    const hasedPassword = await bcrypt.hash(this.password, 10);
    this.password = hasedPassword;
})

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = {
    Teacher  
};
