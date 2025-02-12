const express = require("express");
const { addAdminStudent } = require("../controllers/adminStudentController.js");
const { addQuestionPaperController } = require("../controllers/addQuestionPaperController.js");
const uploader = require('../middlewares/multerMiddleware.js');
const adminRouter = express.Router();

adminRouter.post("/addStudent", addAdminStudent);
// adminRouter.post("/add-question-paper", uploader.single('questionPdf'),addQuestionPaperController);
adminRouter.post("/add-question-paper", (req, res) => {
    console.log("Request body : ", req.body);
    // console.log("Hello doston!!");
    res.send("Question paper received");
});
module.exports = adminRouter;
