const express = require("express");
const multer = require("multer");

const { addAdminStudent } = require("../controllers/adminStudentController.js");
const { addQuestionPaperController } = require("../controllers/addQuestionPaperController.js");

const adminRouter = express.Router();

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle file + form data
adminRouter.post("/add-question-paper", upload.single('file'), (req, res) => {
    console.log("Received request at /add-question-paper");
    
    
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file ? req.file.originalname : "No file uploaded");

    //  Respond 
    res.json({ 
        success: true, 
        message: "Question paper received successfully", 
        receivedData: req.body 
    });
});

module.exports = adminRouter;
