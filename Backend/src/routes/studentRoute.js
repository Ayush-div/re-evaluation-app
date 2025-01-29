const express = require('express');
const { createStudent } = require('../controllers/studentRegistrationController');
const { LoginStudent } = require('../controllers/studentLoginController');
const {createOtp} = require('../controllers/createOtpController');
const {verifyOtp} = require('../controllers/veriftOtpController');
const studentRouter = express.Router();

studentRouter.post('/forgot-password',createOtp)
studentRouter.post('/createOtp',createOtp)
studentRouter.post('/verifyOtp',verifyOtp)
studentRouter.post('/register',createStudent)
studentRouter.post('/login',LoginStudent)

studentRouter.post('/',(req,res)=>{
    res.send("registered in");
})
module.exports = studentRouter