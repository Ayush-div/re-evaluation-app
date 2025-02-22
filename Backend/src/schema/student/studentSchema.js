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
        unique: true,
        sparse: true,  // allow duplicate null values
    },
    mobileNumber: {
        type: String,
        trim: true,
        required: [true, "Please provide teacher's Phone number"],
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
    },
    organization: {
        type: String,
        required: true
    },
    // orgID: {
    //     type: String,
    //     required: true
    // },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    reevaluationRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reevaluation'
    }],
    // reevaluations: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Reevaluation'
    // }],
    accessiblePapers: [{
        questionPaperId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionPaper'
        },
        hasAnswerSheetAccess: {
            type: Boolean,
            default: false
        },
        answerSheetUrl: String,
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        }
    }],
    doubts: [{
        questionId: String,
        paperId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionPaper'
        },
        subjectName: String,
        doubtType: {
            type: String,
            enum: ['Calculation Errors', 'Unmarked Answers', 'Incorrect Marking', 'Others']
        },
        description: String,
        remarks: String,
        status: {
            type: String,
            enum: ['pending', 'in_review', 'resolved'],
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]

}, { timestamps: true })


studentSchema.pre('save', async function () {
    // here you can modify your user before it is saved in mongodb

    // console.log(this); // it will print all those things which the user has passed like in this case studentName, email, password, mobileNumber
    const hasedPassword = await bcrypt.hash(this.password, 10);
    this.password = hasedPassword;
})
const Student = mongoose.model('Student', studentSchema); // collection

module.exports = { Student };  // Make sure it's exported this way
