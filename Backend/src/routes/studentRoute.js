const express = require('express');
const { createStudent } = require('../controllers/studentRegistrationController');
const { LoginStudent } = require('../controllers/studentLoginController');
const { createOtp } = require('../controllers/createOtpController');
const { verifyOtp } = require('../controllers/veriftOtpController');
const { questionPaperStudent } = require('../controllers/questionPaperController');
const { getPapersController } = require("../controllers/getPapers.controller.js")
const { applyForReevaluationController } = require('../controllers/addReevaluationDetailsStudentController.js')
const studentRouter = express.Router();

const Razorpay = require('razorpay');

studentRouter.post('/forgot-password', createOtp)
studentRouter.post('/createOtp', createOtp)
studentRouter.post('/verifyOtp', verifyOtp)
studentRouter.post('/register', createStudent)
studentRouter.post('/login', LoginStudent)
studentRouter.post('/question-paper', questionPaperStudent)
studentRouter.post('/resetNewPasswordStudent',)
studentRouter.get('/get-papers-for-reevaluation', getPapersController)
studentRouter.post('/apply-reevaluation',applyForReevaluationController)

studentRouter.post('/apply-reevaluation', async (req, res) => {
  try {
    const { subject, selectedQuestions, paymentId } = req.body;
    
    const application = new ReevaluationApplication({
      studentId: req.student._id, // Assuming you have student info in req after auth
      paperId: subject.id,
      subject: subject.name,
      selectedQuestions,
      paymentId
    });

    await application.save();

    res.json({
      success: true,
      message: 'Re-evaluation application submitted successfully',
      data: application
    });
  } catch (error) {
    console.error('Error submitting re-evaluation application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting re-evaluation application',
      error: error.message
    });
  }
});

studentRouter.post('/orders', async(req, res) => {
    const razorpay = new Razorpay({
        key_id: 'rzp_test_Y61gV72b1PxhpF',
        key_secret : 'ivZ5ELAJYV23wdXiOReb8Pjk'
    })
    
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "payment for reevaluation",
        payment_capture: 1
    }
    
    try {
        const response = await razorpay.orders.create(options)

        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

studentRouter.post('/orders2', async(req, res) => {
    const razorpay = new Razorpay({
        key_id: 'rzp_test_Y61gV72b1PxhpF',
        key_secret : 'ivZ5ELAJYV23wdXiOReb8Pjk'
    })
    
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "payment for Answer Sheet",
        payment_capture: 1
    }
    
    try {
        const response = await razorpay.orders.create(options)

        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})


studentRouter.post('/', (_, res) => {
    res.send("registered in");
})








module.exports = studentRouter