const express = require('express');
const teacherRouter = express.Router();
const QuestionPaper = require('../schema/organization/addQuestionPaperSchema.js')
const { uploadSolution } = require("../controllers/uploadVideoSolution.controller.js")
const { createTeacher } = require("../controllers/teacher/teacherRegistration.controller.js")
const uploader = require('../middlewares/multerMiddleware.js');
const { loginTeacherController } = require("../controllers/teacher/teacherLogin.controller.js")
// console.log("here in route");

teacherRouter.post('/register', createTeacher)
teacherRouter.post('/login', loginTeacherController)

// teacherRouter.post('/', (_, res) => {
//     res.send("registered in");
// })

teacherRouter.get('/papers', async (req, res) => {
  try {
    const papers = await QuestionPaper.find({})
      .lean()
      .select('-__v')
      .sort({ examDate: -1 });

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

teacherRouter.get('/uploaded-videos', async (req, res) => {
  try {
    const papers = await QuestionPaper.find({});
    const videos = [];

    papers.forEach(paper => {
      paper.questions.forEach(question => {
        if (question.videoSolution) {
          videos.push({
            _id: question._id,
            subject: paper.subjectName,
            questionNumber: question.id,
            url: question.videoSolution.url,
            uploadedAt: question.videoSolution.uploadedAt,
            uploadedBy: question.videoSolution.uploadedBy
          });
        }

        question.subparts?.forEach(subpart => {
          if (subpart.videoSolution) {
            videos.push({
              _id: subpart._id,
              subject: paper.subjectName,
              questionNumber: question.id,
              partNumber: subpart.id,
              url: subpart.videoSolution.url,
              uploadedAt: subpart.videoSolution.uploadedAt,
              uploadedBy: subpart.videoSolution.uploadedBy
            });
          }

          subpart.subsubparts?.forEach(subsubpart => {
            if (subsubpart.videoSolution) {
              videos.push({
                _id: subsubpart._id,
                subject: paper.subjectName,
                questionNumber: question.id,
                partNumber: subpart.id,
                subpartNumber: subsubpart.id,
                url: subsubpart.videoSolution.url,
                uploadedAt: subsubpart.videoSolution.uploadedAt,
                uploadedBy: subsubpart.videoSolution.uploadedBy
              });
            }
          });
        });
      });
    });

    res.json({
      success: true,
      videos: videos.sort((a, b) => b.uploadedAt - a.uploadedAt)
    });
  } catch (error) {
    console.error('Error fetching uploaded videos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching uploaded videos'
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

teacherRouter.post('/upload-solution', uploader.single('video'), uploadSolution);

module.exports = teacherRouter;