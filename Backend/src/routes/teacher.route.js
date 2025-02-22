const express = require('express');
const teacherRouter = express.Router();
const QuestionPaper = require('../schema/organization/addQuestionPaperSchema.js')
const { uploadSolution } = require("../controllers/uploadVideoSolution.controller.js")
const { createTeacher } = require("../controllers/teacher/teacherRegistration.controller.js")
const uploader = require('../middlewares/multerMiddleware.js');
const { loginTeacherController } = require("../controllers/teacher/teacherLogin.controller.js")
const { authMiddleware } = require("../middlewares/auth.middleware.js")
const { getPapersController } = require("../controllers/getPapers.controller.js");
// const { getTeacherUploadedVideos } = require("../controllers/teacher/getTeacherUploadedVideos.controller.js");
const { Teacher } = require("../schema/teacher/teacher.schema.js");
// console.log("here in route");

teacherRouter.post('/register', createTeacher)
teacherRouter.post('/login', loginTeacherController)

// teacherRouter.post('/', (_, res) => {
//     res.send("registered in");
// })

teacherRouter.get('/papers', authMiddleware('teacher'), getPapersController);

teacherRouter.get('/papers/:paperId/questions', async (req, res) => {
  try {
    const { paperId } = req.params;
    const paper = await QuestionPaper.findById(paperId).lean();

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: 'Paper not found'
      });
    }

    res.json({
      success: true,
      data: paper.questions
    });
  } catch (error) {
    console.error('Error fetching paper questions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: error.message
    });
  }
});

teacherRouter.get('/uploaded-videos', authMiddleware('teacher'), async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher._id).lean();
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }
    // Sort videos by uploadedAt descending
    const videos = (teacher.videoSolutions || []).sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );
    res.json({
      success: true,
      videos
    });
  } catch (error) {
    console.error("Error fetching uploaded videos:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching uploaded videos"
    });
  }
});

teacherRouter.get('/assigned-reevaluations', async (req, res) => {
  try {
    const applications = await ReevaluationApplication.find({
      assignedTeacher: req.teacher._id,
      status: { $in: ['assigned', 'in_review'] }
    })
      .populate('studentId', 'name rollNumber')
      .populate('paperId', 'subjectName');

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching assigned re-evaluations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assigned re-evaluations',
      error: error.message
    });
  }
});

// teacher profile ke liye
// teacherRouter.get('/profile', authenticateTeacher, async (req, res) => {
//   try {
//     // The teacher info should be available in req.teacher after authentication
//     const teacherInfo = req.teacher;

//     res.json({
//       success: true,
//       data: {
//         _id: teacherInfo._id,
//         name: teacherInfo.name,
//         email: teacherInfo.email,
//         department: teacherInfo.department
//         // Add other relevant teacher info
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching teacher profile:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching teacher profile'
//     });
//   }
// });

teacherRouter.post('/upload-solution', authMiddleware('teacher'), uploader.single('video'), uploadSolution);


module.exports = teacherRouter;