const express = require("express");
const { addAdminStudent } = require("../controllers/adminStudentController.js");

const adminAddStudentRouter = express.Router();

adminAddStudentRouter.post("/", addAdminStudent);

module.exports = adminAddStudentRouter;
