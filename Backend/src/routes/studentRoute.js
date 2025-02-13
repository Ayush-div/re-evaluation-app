const express = require('express');
const { createStudent } = require('../controllers/studentRegistrationController');
const { LoginStudent } = require('../controllers/studentLoginController');
const { createOtp } = require('../controllers/createOtpController');
const { verifyOtp } = require('../controllers/veriftOtpController');
const { questionPaperStudent } = require('../controllers/questionPaperController');

const studentRouter = express.Router();

studentRouter.post('/forgot-password', createOtp)
studentRouter.post('/createOtp', createOtp)
studentRouter.post('/verifyOtp', verifyOtp)
studentRouter.post('/register', createStudent)
studentRouter.post('/login', LoginStudent)
studentRouter.post('/question-paper', questionPaperStudent)
studentRouter.post('/resetNewPasswordStudent',)

studentRouter.post('/', (_, res) => {
    res.send("registered in");
})

module.exports = studentRouter