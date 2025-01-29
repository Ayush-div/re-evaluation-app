const express = require('express');
const { createStudent } = require('../controllers/studentRegistrationController');
const { LoginStudent } = require('../controllers/studentLoginController');

const studentRouter = express.Router();

studentRouter.post('/register',createStudent)
studentRouter.post('/login',LoginStudent)

studentRouter.post('/',(req,res)=>{
    res.send("registered in");
})
module.exports = studentRouter