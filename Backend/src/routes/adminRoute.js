const express = require("express");
const { addAdminStudent } = require("../controllers/adminStudentController.js");

const adminRouter = express.Router();

adminRouter.post("/addStudent", addAdminStudent);
adminRouter.post("/add-question-paper", addAdminStudent);
module.exports = adminRouter;
