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
const { Student } = require("../schema/student/studentSchema.js"); // Add this import
const { Organization } = require("../schema/organization/organizationSchema.js"); // Add this import
// console.log("here in route");
const ReevaluationApplication = require("../schema/re-evaluation/reevaluationApplication.schema.js")
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

teacherRouter.get('/assigned-reevaluations', authMiddleware('teacher'), async (req, res) => {
  try {
    console.log("Fetching reevaluations for teacher:", req.teacher.id);

    const teacher = await Teacher.findById(req.teacher.id).lean();
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // First get the organization with its question papers
    const organization = await Organization.findById(teacher.organizationId).lean();
    if (!organization) {
      throw new Error('Organization not found');
    }

    // Get assigned requests
    const assignedRequests = await ReevaluationApplication.find({
      organizationId: teacher.organizationId,
      assignedTeacher: req.teacher.id,
      status: { $in: ['pending', 'in_review'] }
    })
      .populate({
        path: 'studentId',
        model: Student,
        select: 'studentName rollNumber'
      })
      .sort({ createdAt: -1 })
      .lean();

    // Map through requests and add paper details from organization
    const formattedRequests = assignedRequests.map(request => {
      // Find matching paper from organization's questionPapers array
      const paper = organization.questionPapers.find(
        p => p._id.toString() === request.paperId.toString()
      );

      return {
        _id: request._id,
        subject: paper?.subjectName || request.subject || 'N/A',
        department: paper?.department || 'N/A',
        selectedQuestions: request.selectedQuestions.map(q => ({
          questionId: q.questionId,
          remarks: q.remarks,
          issueType: q.issueType,
          customDescription: q.customDescription
        })),
        studentId: {
          studentName: request.studentId?.studentName || 'Unknown',
          rollNumber: request.studentId?.rollNumber || 'N/A'
        },
        createdAt: request.createdAt,
        status: request.status,
        isAssigned: true
      };
    });

    return res.json({
      success: true,
      data: formattedRequests
    });
  } catch (error) {
    console.error('Error fetching reevaluations:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch reevaluations',
      error: error.message
    });
  }
});

teacherRouter.post('/upload-solution', authMiddleware('teacher'), uploader.single('video'), uploadSolution);


module.exports = teacherRouter;