import mongoose from 'mongoose'

const stagesSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["Applied", "Document Verification", "With Organization", "Under Teacher Review", "Final Assessment", "Completed"],
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    remarks: String
});

const applicationStatusSchema = new mongoose.Schema({
    applicationId: {  
        type: String,
        required: true,
        unique: true
    },
    studentId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    questionDetails: [{  
        questionNumber: String,
        subPart: String,
        originalMarks: Number,
        claimedMarks: Number,
        finalMarks: Number,
        reason: String
    }],
    appliedDate: {
        type: Date,  
        default: Date.now
    },
    expectedCompletion: {
        type: Date,  
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "under_review", "with_teacher", "completed", "rejected"],
        default: "pending"
    },
    assignedTeacher: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    currentStage: {
        type: Number,
        default: 1
    },
    stages: [stagesSchema],
    result: {  
        marksChanged: Number,
        finalRemarks: String,
        updatedAt: Date,
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    paymentStatus: {  // Added payment tracking
        paid: {
            type: Boolean,
            default: false
        },
        amount: Number,
        transactionId: String,
        paidAt: Date
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// indexes for better query performance ()
applicationStatusSchema.index({ studentId: 1, status: 1 });
applicationStatusSchema.index({ applicationId: 1 }, { unique: true });
applicationStatusSchema.index({ assignedTeacher: 1, status: 1 });

// Virtual for calculating processing time
applicationStatusSchema.virtual('processingTime').get(function() {
    if (this.status === 'completed') {
        return this.updatedAt - this.createdAt;
    }
    return null;
});

export const ApplicationStatus = mongoose.model("ApplicationStatus", applicationStatusSchema)