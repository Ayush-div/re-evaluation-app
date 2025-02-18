const mongoose = require('mongoose');

const reevaluationApplicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  paperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionPaper',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  selectedQuestions: [{
    questionId: String,
    issueType: String,
    remarks: String,
    customIssueDescription: String
  }],
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_review', 'completed'],
    default: 'pending'
  },
  assignedTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  paymentId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ReevaluationApplication', reevaluationApplicationSchema);
