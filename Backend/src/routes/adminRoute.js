const express = require("express");
const { addAdminStudent } = require("../controllers/adminStudentController.js");
const { addQuestionPaperController } = require("../controllers/addQuestionPaperController.js");
const { registerOrganization } = require("../controllers/registerOrganization.controller.js")


const uploader = require('../middlewares/multerMiddleware.js');
const adminRouter = express.Router();

adminRouter.post("/addStudent", addAdminStudent);
// adminRouter.post("/add-question-paper", uploader.single('questionPdf'),addQuestionPaperController);
adminRouter.post("/add-question-paper", (req, res) => {
    console.log("Requset body : ", req.body);
    console.log("Hello doston!!")
});



adminRouter.post('/register', registerOrganization)
adminRouter.post('/', (req, res) => {
    res.send("registered in");
})


module.exports = adminRouter;
