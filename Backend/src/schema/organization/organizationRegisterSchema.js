const mongoose = require("mongoose")
const bcrypt =require("bcrypt")
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        trim: true
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
    // noOfDepartment: {
    //     type: Number,
    //     required: [true, 'Number of departments is required'],
    //     min: [1, 'Must have at least one department']
    // },
    noOfStudents: {
        type: Number,
        // required: [true, 'Number of students is required'],
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

organizationSchema.pre('save', async function () {
    // here you can modify your user before it is saved in mongodb

    // console.log(this); // it will print all those things which the user has passed like in this case studentName, email, password, mobileNumber
    const hasedPassword = await bcrypt.hash(this.password, 10);
    this.password = hasedPassword;
})
const Organization = mongoose.model("Organization", organizationSchema)

module.exports = {
    Organization
}
