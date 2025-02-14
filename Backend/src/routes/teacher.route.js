const express = require('express');
const teacherRouter = express.Router();

const { createTeacher } = require("../controllers/teacherRegistration.controller.js")
// console.log("here in route");

teacherRouter.post('/register', createTeacher)
// teacherRouter.post('/login', LoginStudent)

teacherRouter.post('/', (_, res) => {
    res.send("registered in");
})

module.exports = teacherRouter