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

// studentRouter.post('/apply-reevaluation',(req,res)=>{
//     console.log("hello world !!!");
//     res.send("Hii there!!!");
// })

// studentRouter.get('/get-papers-for-reevaluation',(req,res)=>{
//     console.log("hello world !!!");
//     res.send("Hii there!!!");
// })
studentRouter.post('/', (_, res) => {
    res.send("registered in");
})


studentRouter.post('/orders', async(req, res) => {
    const razorpay = new Razorpay({
        key_id: 'rzp_test_Y61gV72b1PxhpF',
        key_secret : 'ivZ5ELAJYV23wdXiOReb8Pjk'
    })

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "receipt#1",
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



// studentRouter.get("/payment/:paymentId", async(req, res) => {
//     const {paymentId} = req.params;

//     const razorpay = new Razorpay({
//         key_id: "rzp_test_GcZZFDPP0jHtC4",
//         key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
//     })
    
//     try {
//         const payment = await razorpay.payments.fetch(paymentId)

//         if (!payment){
//             return res.status(500).json("Error at razorpay loading")
//         }

//         res.json({
//             status: payment.status,
//             method: payment.method,
//             amount: payment.amount,
//             currency: payment.currency
//         })
//     } catch(error) {
//         res.status(500).json("failed to fetch")
//     }
// })









module.exports = studentRouter