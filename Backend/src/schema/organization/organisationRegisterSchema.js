import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        trim: true
    },
    code: {
        type: String,
        trim: true,
        uppercase: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

const registerOrganizationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: [true, 'Organization name is required'],
        trim: true,
        unique: true
    },
    orgLocation: {
        type: String,
        required: [true, 'Organization location is required'],
        trim: true
    },
    departments: [departmentSchema],
    noOfDepartment: {
        type: Number,
        required: [true, 'Number of departments is required'],
        min: [1, 'Must have at least one department']
    },
    noOfStudents: {
        type: Number,
        required: [true, 'Number of students is required'],
        min: [0, 'Cannot have negative number of students']
    },
    organisationEmail: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    bankDetails: bankDetailsSchema,
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
    organizaitonWebsite: {
        type: String,
        trim: true,
        match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            'Please provide a valid URL'
        ]
    },
    verificationDetails: {
        url: String,
    }

    // verificationDocuments: [{
    //     name: String,
    //     url: String,
    //     uploadedAt: {
    //         type: Date,
    //         default: Date.now
    //     },
    //     status: {
    //         type: String,
    //         enum: ['pending', 'verified', 'rejected'],
    //         default: 'pending'
    //     }
    // }],
    // status: {
    //     type: String,
    //     enum: ['pending', 'active', 'suspended', 'inactive'],
    //     default: 'pending'
    // }

}, { timestamps: true })

export const registerOrganization = mongoose.model("registerOrganization", registerOrganizationSchema)