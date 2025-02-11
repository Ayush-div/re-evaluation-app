const mongoose = require('mongoose');

const reEvaluationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'rejected'],
    default: 'pending'
  },
  questions: [{
    questionId: String,
    issueType: {
      type: String,
      enum: ['Calculation Errors', 'Unmarked Answers', 'Incorrect Marking', 'Others'],
      required: true
    },
    customIssueDescription: {
      type: String,
      required: function() {
        return this.issueType === 'Others';
      }
    },
    remarks: String
  }],
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  totalFee: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('ReEvaluation', reEvaluationSchema);
