const express = require("express");
const multer = require("multer");

const { addAdminStudent } = require("../controllers/adminStudentController.js");
const { addQuestionPaperController } = require("../controllers/addQuestionPaperController.js");
const { registerOrganization } = require("../controllers/registerOrganization.controller.js")
const { addAdminTeacher } = require("../controllers/addAdminTeacher.controller.js")
const QuestionPaper = require('../schema/organization/addQuestionPaperSchema.js');
const { organizationLoginController } = require("../controllers/organizationLogin.controller.js")
const uploader = require('../middlewares/multerMiddleware.js');
const adminRouter = express.Router();


adminRouter.post("/addStudent", addAdminStudent);
adminRouter.post("/add-question-paper", uploader.single('file'), addQuestionPaperController);
adminRouter.post("/login", organizationLoginController);
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

adminRouter.get('/get-all-papers', async (req, res) => {
  try {
    const papers = await QuestionPaper.find({})
      .sort({ examDate: -1 })
      .select('-__v');

    if (!papers || papers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No papers found'
      });
    }

    res.json({
      success: true,
      data: papers
    });
  } catch (error) {
    console.error('Error fetching papers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching papers',
      error: error.message
    });
  }
});

adminRouter.delete('/delete-paper/:paperId', async (req, res) => {
  try {
    const { paperId } = req.params;
    console.log('Attempting to delete paper:', paperId);

    const deletedPaper = await QuestionPaper.findByIdAndDelete(paperId);

    if (!deletedPaper) {
      console.log('Paper not found:', paperId);
      return res.status(404).json({
        success: false,
        message: 'Paper not found'
      });
    }

    console.log('Paper deleted successfully:', deletedPaper._id);
    res.json({
      success: true,
      message: 'Paper deleted successfully',
      data: deletedPaper
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting paper',
      error: error.message
    });
  }
});

adminRouter.put('/update-paper/:paperId', async (req, res) => {
  try {
    const { paperId } = req.params;
    console.log('Updating paper:', paperId);
    console.log('Update data:', req.body);

    const updatedPaper = await QuestionPaper.findByIdAndUpdate(
      paperId,
      {
        $set: {
          subjectName: req.body.subjectName,
          examDate: req.body.examDate,
          totalMarks: req.body.totalMarks,
          duration: req.body.duration,
          department: req.body.department,
          semester: req.body.semester,
          questions: req.body.questions,
          updatedAt: new Date()
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedPaper) {
      console.log('Paper not found for update:', paperId);
      return res.status(404).json({
        success: false,
        message: 'Paper not found'
      });
    }

    console.log('Paper updated successfully:', updatedPaper._id);
    res.json({
      success: true,
      message: 'Paper updated successfully',
      data: updatedPaper
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: error.name === 'ValidationError'
        ? 'Invalid data provided'
        : 'Error updating paper',
      error: error.message
    });
  }
});

adminRouter.post('/register', registerOrganization)
adminRouter.post("/addTeacher", addAdminTeacher);


module.exports = adminRouter;
