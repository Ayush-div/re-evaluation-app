const express = require('express');
const { createStudent } = require('../controllers/studentRegistrationController');
const { LoginStudent } = require('../controllers/studentLoginController');
const { createOtp } = require('../controllers/createOtpController');
const { verifyOtp } = require('../controllers/veriftOtpController');
const { questionPaperStudent } = require('../controllers/questionPaperController');
const { getPapersController } = require("../controllers/getPapers.controller.js")
const { applyForReevaluationController } = require('../controllers/addReevaluationDetailsStudentController.js')
const studentRouter = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware.js")
const Razorpay = require('razorpay');
const { Student } = require('../schema/student/studentSchema.js');
const ReevaluationApplication = require('../schema/re-evaluation/reevaluationApplication.schema.js'); // Ensure this model exists

studentRouter.post('/forgot-password', createOtp)
studentRouter.post('/createOtp', createOtp)
studentRouter.post('/verifyOtp', verifyOtp)
studentRouter.post('/register', createStudent)
studentRouter.post('/login', LoginStudent)
studentRouter.post('/question-paper', questionPaperStudent)
studentRouter.post('/resetNewPasswordStudent',)
studentRouter.get('/get-papers-for-reevaluation', authMiddleware('student'), getPapersController)
// studentRouter.post('/apply-reevaluation', authMiddleware('student'), applyForReevaluationController)

studentRouter.post('/apply-reevaluation', authMiddleware('student'), async (req, res) => {
    try {
        console.log("Received reevaluation request body:", req.body);

        const { subject, selectedQuestions, paymentId } = req.body;

        if (!subject || !subject.id || !subject.name || !paymentId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Transform selectedQuestions into proper format
        const formattedQuestions = selectedQuestions.map(questionId => ({
            questionId: questionId,
            remarks: req.body.remarks?.[questionId] || '',
            issueType: req.body.issueTypes?.[questionId] || '',
            customDescription: req.body.customIssueDescriptions?.[questionId] || ''
        }));

        // Create the application first
        const application = new ReevaluationApplication({
            studentId: req.student._id,
            paperId: subject.id,
            subject: subject.name,
            selectedQuestions: formattedQuestions,
            paymentId
        });

        // Save the application to get its _id
        const savedApplication = await application.save();
        console.log("Saved application:", savedApplication);

        // Update student record with just the application ID
        await Student.findByIdAndUpdate(
            req.student._id,
            { $push: { reevaluationRequests: savedApplication._id } }, // Push only the ID
            { new: true }
        );

        res.json({
            success: true,
            message: 'Re-evaluation application submitted successfully',
            data: savedApplication
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

studentRouter.post('/orders', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: 'rzp_test_Y61gV72b1PxhpF',
        key_secret: 'ivZ5ELAJYV23wdXiOReb8Pjk'
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

studentRouter.post('/orders2', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: 'rzp_test_Y61gV72b1PxhpF',
        key_secret: 'ivZ5ELAJYV23wdXiOReb8Pjk'
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