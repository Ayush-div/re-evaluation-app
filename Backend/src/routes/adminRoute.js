const express = require("express");
const multer = require("multer");

const { addAdminStudent } = require("../controllers/adminStudentController.js");
const { addQuestionPaperController } = require("../controllers/addQuestionPaperController.js");
const { registerOrganization } = require("../controllers/registerOrganization.controller.js")
const { addAdminTeacher } = require("../controllers/addAdminTeacher.controller.js")

const uploader = require('../middlewares/multerMiddleware.js');
const adminRouter = express.Router();


adminRouter.post("/addStudent", addAdminStudent);
adminRouter.post("/add-question-paper", uploader.single('file'),addQuestionPaperController);
// Route to handle file + form data

// adminRouter.post("/add-question-paper", uploader.single('file'), (req, res) => {
//     console.log("Received request at /add-question-paper");
//     console.log("Request Body:", req.body);
//     console.log("Uploaded File:", req.file ? req.file.originalname : "No file uploaded");

//     //  Respond 
//     res.json({ 
//         success: true, 
//         message: "Question paper received successfully", 
//         receivedData: req.body 
//     });
// });



adminRouter.post('/register', registerOrganization)
adminRouter.post("/addTeacher", addAdminTeacher);


module.exports = adminRouter;
