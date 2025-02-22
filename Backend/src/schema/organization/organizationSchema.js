const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminStudent = require("../organization/addStudentAdminSchema.js");
const questionPaperSchema = require("../questionPaper.schema.js");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        trim: true
    }
});

const organizationStudentSchema = new mongoose.Schema({
    email: {
        trim: true, unique: [true, "This Email is already in use"],
        required: [true, "Email should be required"],
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        sparse: true // Allow null/undefined values to not be considered for uniqueness
    },
    rollNumber: {
        type: String,   required: [true, "Roll Number is required"],
        unique: true,
        trim: true,
        sparse: true // Allow null/undefined values to not be considered for uniqueness
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false }); // Add _id: false to prevent MongoDB from creating _id for subdocuments

const organizationTeacherSchema = new mongoose.Schema({
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
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        default: 'Not Specified'
    },
    subjects: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const organizationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: [true, 'Organization name is required'],
        trim: true,
        unique: [true, "ORGANIZATION ALREADY REGISTERED"]
    },
    orgLocation: {
        type: String,
        required: [true, 'Organization location is required'],
        trim: true
    },
    departments: [departmentSchema],
    noOfStudents: {
        type: Number,
        min: [0, 'Cannot have negative number of students']
    },
    organizationEmail: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    bankDetails: {
        accountNumber: {
            type: String,
            required: true
        },
        ifscCode: {
            type: String,
            required: true
        },
        accountHolderName: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true
        }
    },
    contactPerson: {
        name: {
            type: String,
            required: [true, 'Contact person name is required'],
            trim: true
        },
        phone: {
            type: String,
            required: [true, 'Contact number is required'],
            trim: true,
            match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
        },
        designation: {
            type: String,
            trim: true
        }
    },
    organizationWebsite: {
        type: String,
        trim: true,
        match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            'Please provide a valid URL'
        ]
    },
    verificationDetails: {
        url: String,
    },
    password: {
        required: [true, "Password should be provided"],
        minlength: [6, "Password should be minimum six character long"],
        type: String,
    },

    // Relationships
    teachers: {
        type: [organizationTeacherSchema],
        default: [] // Set default as empty array
    },
    students: {
        type: [organizationStudentSchema],
        default: [] // Change from [] to undefined to prevent MongoDB from creating empty array with null values
    },
    questionPapers: {
        type: [questionPaperSchema],
        default: [] // Set default as empty array
    },
    reevaluations: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ReevaluationApplication'
        }],
        default: [] // Set default as empty array
    },
    financials: {
        totalEarnings: {
            type: Number,
            default: 0
        },
        transactions: [{
            type: {
                type: String,
                enum: ['payment', 'refund']
            },
            amount: Number,
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            },
            reevaluationId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ReevaluationApplication'
            },
            transactionId: String,
            status: String,
            date: {
                type: Date,
                default: Date.now
            }
        }]
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        auto: true
    },
}, { timestamps: true });

organizationSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.students = [];
    }
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
    next();
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = {
    Organization
};
