const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose")
const { addAdminStudent } = require("../controllers/adminStudentController.js");
const { addQuestionPaperController } = require("../controllers/addQuestionPaperController.js");
const { registerOrganization } = require("../controllers/registerOrganization.controller.js")
const { addAdminTeacher } = require("../controllers/addAdminTeacher.controller.js")
const QuestionPaper = require('../schema/organization/addQuestionPaperSchema.js');
const { organizationLoginController } = require("../controllers/organizationLogin.controller.js")
const uploader = require('../middlewares/multerMiddleware.js');
const adminRouter = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware.js")
const { getPapersController } = require('../controllers/getPapers.controller.js');
const { Organization } = require("../schema/organization/organizationSchema.js")
const { getReevaluationRequestsController } = require("../controllers/getReevaluationRequests.controller.js")
const { getAuthorizedTeachersController } = require('../controllers/getAuthorizedTeachers.controller.js');
const ReevaluationApplication = require("../schema/re-evaluation/reevaluationApplication.schema.js")
const { Teacher } = require("../schema/teacher/teacher.schema.js")

adminRouter.post("/addStudent",
  authMiddleware('organization'),
  addAdminStudent
);
adminRouter.post("/login", organizationLoginController);
adminRouter.post('/register', registerOrganization);

// Protected routes - require authentication
// Split into two routes for better handling
adminRouter.post("/add-question-paper",
  authMiddleware('organization'),
  uploader.single('file'),
  addQuestionPaperController  // Handle initial submission
);

adminRouter.post('/logout', (req, res) => {
  try {
    // Clear the access token cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during logout'
    });
  }
});

adminRouter.get('/reevaluation-requests', authMiddleware('organization'), getReevaluationRequestsController)

adminRouter.get('/authorized-teachers', authMiddleware('organization'), getAuthorizedTeachersController);


// we will use this when we want to store the question papers separately.
// adminRouter.get('/get-all-papers', authMiddleware('organization'), async (req, res) => {
//   try {
//     console.log("Authenticated organization:", req.organization._id);
//     const papers = await QuestionPaper.find({ organizationId: req.organization._id })
//       .sort({ examDate: -1 })
//       .select('-__v');

//     if (!papers || papers.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'No papers found for this organization'
//       });
//     }

//     res.json({
//       success: true,
//       data: papers
//     });
//   } catch (error) {
//     console.error('Error fetching papers:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching papers',
//       error: error.message
//     });
//   }
// });

adminRouter.get('/get-all-papers', authMiddleware('organization'), async (req, res) => {
  try {
    // console.log("here")
    console.log(req.organization)
    const papers = req.organization.questionPapers;
    console.log(papers)
    console.log(papers.length)
    if (!papers || papers.length === 0) {
      console.log("no papers found")
      return res.status(404).json({
        success: false,
        message: 'No papers found for this organization'
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
// const oldprompt = `You Are A chatbot on my website . Give the answers to users Query Politely And /Try to keep the answer Short . You are allowed to have a normal and friendly chat with the user. If you do not have the answer to the user query just reply \'I can't assist you with that right now sorry !!\' You can give the user my contact +91 8932934856 to the user in such case.\n\nHere is a description of my site which I want you to give to the chatbot :-\nMy website is a student answer sheet revaluation platform. \nHere we have three sections organisation teacher and student\n\nOrganisation section :-\n 1) if you are an organisation then you need to first registered to our platform then give details about your organisation teachers and students by adding them from your dashboard\n 2) in the question paper section of your dashboard you can add question papers that are previously conducted and are being checked.\n 3) in creating a question paper you need to first sale the subject exam date total marks duration department and semester then after filling that you will be provided a boiler template for the number of questions you entered where you can fill the marks of each questions so that when the student wants to apply for revaluation he or she can select the particular question you can also add sub or sub sub parts of the question our website will make sure that the marks you entered in the boiler plate is equal to the total marks mentioned before \n\nTeacher section :-\n1) If you are a teacher when you need to login to our platform using your registered organisation email \n2) in the teachers dashboard you will find upload solutions section where you can upload the answers to the selected question paper \n3) you can also upload a video solution if students have more doubt in that question \n4) our website will also show teachers the question in which most of the students have doubt. \n5) teacher can also see recent uploads for revaluation by the students \n6) after receiving the question paper teacher can click on view details and reevaluate the question of the student \n\nStudent Section:- \n1) first student will need to login to our platform using the registered email given to him by his organisation \n2) in the student dashboard the student will see apply for revaluation check status question papers video solutions and answer sheets \n3) in apply for revaluation he will see the question paper uploaded by his organisation where when we he opens it he can select the question or there sub-parts which he has doubt and continue to payment in our website for now each question cost 500 rupees which the student needs to pay.\n4) inside check status the student can check the status of his revaluation if his paper is reevaluated a completed sign will be shown at the top corner of the displayed questions that he has paid to get reevaluated \n5) inside question paper section student can download the question papers uploaded by his organisation \n6) inside video solutions student can see the video solutions uploaded by the teachers \n7) inside answer sheet section a student can pay to get his full answer sheet in PDF form from the organisation \n8) note our website also has the features where inside apply for revaluation when a student select his doubt he can also select a meta information which is calculation error and mark answer in correct marking or other in others he can write his doubt which will be displayed to the teachers who is in-charge`

adminRouter.delete('/delete-paper/:paperId', authMiddleware('organization'), async (req, res) => {
  try {
    const { paperId } = req.params;
    // Remove paper from organization's questionPapers array using $pull
    const updatedOrg = await Organization.findOneAndUpdate(
      { _id: req.organization._id },
      { $pull: { questionPapers: { _id: paperId } } },
      { new: true }
    );
    if (!updatedOrg) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found or paper not deleted'
      });
    }

    console.log('Paper deleted successfully:', paperId);
    res.json({
      success: true,
      message: 'Paper deleted successfully',
      data: updatedOrg.questionPapers
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

adminRouter.get('/test-pdf/:paperId', authMiddleware('organization'), async (req, res) => {
  try {
    const { paperId } = req.params;
    // Find paper from organization's questionPapers array
    const paper = req.organization.questionPapers.find(p => p._id.toString() === paperId);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    // Test PDF URL accessibility (assuming global fetch or similar is available)
    const response = await fetch(paper.questionPdfPath);
    if (!response.ok) {
      throw new Error('PDF URL is not accessible');
    }
    res.json({
      success: true,
      pdfUrl: paper.questionPdfPath,
      isAccessible: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      pdfUrl: (req.organization.questionPapers.find(p => p._id.toString() === req.params.paperId) || {}).questionPdfPath
    });
  }
});

adminRouter.put('/update-paper/:paperId', authMiddleware('organization'), async (req, res) => {
  try {
    const { paperId } = req.params;
    console.log('Updating paper:', paperId);
    console.log('Update data:', req.body);
    console.log("req.organization is -> ", req.organization);

    const existingPaper = req.organization.questionPapers.find(
      p => p._id.toString() === paperId
    );
    if (!existingPaper) {
      return res.status(404).json({
        success: false,
        message: 'Paper not found'
      });
    }

    // Merge the existing paper with new values from req.body.
    // Ensure required fields are preserved if not provided in req.body.
    const updatedData = {
      ...existingPaper.toObject(),
      ...req.body,
      updatedAt: new Date()
    };
    if (!updatedData.organizationId) {
      updatedData.organizationId = existingPaper.organizationId;
    }
    if (!updatedData.questionPdfPath) {
      updatedData.questionPdfPath = existingPaper.questionPdfPath;
    }

    // Construct updateFields object mapping each key to the proper dotted path.
    const updateFields = {};
    for (const key in updatedData) {
      if (key === '_id') continue; // do not attempt to update _id
      updateFields[`questionPapers.$.${key}`] = updatedData[key];
    }

    // Update the paper inside the organization's questionPapers array using the positional operator.
    const updatedOrg = await Organization.findOneAndUpdate(
      { _id: req.organization._id, "questionPapers._id": paperId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    if (!updatedOrg) {
      console.log('Paper not found for update:', paperId);
      return res.status(404).json({
        success: false,
        message: 'Paper not found'
      });
    }
    const updatedPaper = updatedOrg.questionPapers.find(p => p._id.toString() === paperId);
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
adminRouter.post("/addTeacher", authMiddleware('organization'), addAdminTeacher);



const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: "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" });

const enhancedChatbotPrompt = `You are an AI assistant for our re-evaluation portal. Be concise, friendly, and helpful. If you can't help, respond with: "I apologize, but I can't assist with that. Please contact support at +91 8932934856."

Platform Overview:
Our platform streamlines answer sheet re-evaluation with three user types: Organizations, Teachers, and Students.

Key Features:

1. Organization Dashboard:
- Complete organization profile management
- Teacher and student account management
- Question paper management with detailed marking schemes
- Revenue tracking and analytics
- Re-evaluation fee customization
- Generate comprehensive reports (financial, performance, teacher activity)
- Auto-assign or manually assign papers to teachers
- Monitor teacher performance and workload

2. Teacher Features:
- Upload video solutions for specific questions/parts
- Track student doubts and common issues
- Review re-evaluation requests
- Upload detailed solutions
- Monitor re-evaluation statistics
- View student feedback
- Get notifications for pending reviews
- Access teaching analytics and performance metrics

3. Student Features:
- Apply for re-evaluation with specific question selection
- Select multiple questions or sub-parts
- Specify doubt types:
  * Calculation Errors
  * Unmarked Answers
  * Incorrect Marking
  * Custom explanations
- Track application status in real-time
- Access video solutions
- Download question papers
- Purchase answer sheet copies
- View teacher feedback
- Get email notifications

Payment System:
- Secure payment gateway integration
- Custom fee structure per question
- Answer sheet access fees
- Payment status tracking
- Receipt generation

Additional Features:
- Real-time status updates
- Email notifications
- Mobile responsive design
- Detailed analytics
- PDF generation
- Video solution library
- Chat support
- Progress tracking
- Automated teacher assignment
- Performance statistics

Remember: Always maintain a professional tone and direct users to support (+91 8932934856) for complex queries.`;

adminRouter.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const setupMessages = [
      {
        "role": "system",
        "content": enhancedChatbotPrompt
      }
    ];

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [...setupMessages, ...messages],
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
    });

    res.json({ response: chatCompletion.choices[0]?.message?.content || "I can't assist you with that right now, sorry!" });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Something went wrong with the chatbot." });
  }
});

adminRouter.post('/assign-teacher/:requestId', authMiddleware('organization'), async (req, res) => {
  try {
    const { requestId } = req.params;
    const { teacherId } = req.body;
    console.log("Assigning request:", requestId, "to teacher:", teacherId);

    if (!teacherId) {
      return res.status(400).json({
        success: false,
        message: 'Teacher ID is required'
      });
    }

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Verify teacher belongs to organization
      const teacher = await Teacher.findOne({
        _id: teacherId,
        organizationId: req.organization._id
      }).session(session);

      if (!teacher) {
        throw new Error('Invalid teacher selection');
      }

      // 2. Verify the reevaluation request exists and is available
      const existingRequest = await ReevaluationApplication.findById(requestId).session(session);
      if (!existingRequest) {
        throw new Error('Reevaluation request not found');
      } console.log("assigned teacher is there")
      console.log(existingRequest.assignedTeacher)
      if (existingRequest.assignedTeacher) {
        throw new Error('Request is already assigned to a teacher');
      }

      // 3. Update reevaluation application
      const updated = await ReevaluationApplication.findOneAndUpdate(
        {
          _id: requestId,
          status: { $in: ['pending', null] },  // Allow null status
          $or: [
            { assignedTeacher: null },
            { assignedTeacher: { $exists: false } }
          ]
        },
        {
          $set: {
            assignedTeacher: teacherId,
            status: 'in_review',
            organizationId: req.organization._id // Ensure organizationId is set
          }
        },
        {
          new: true,
          session,
          runValidators: true
        }
      );

      if (!updated) {
        throw new Error('Failed to update reevaluation request');
      }

      // 4. Update teacher's assigned reevaluations
      await Teacher.findByIdAndUpdate(
        teacherId,
        {
          $addToSet: { assignedReevaluations: requestId }
        },
        { session }
      );

      await session.commitTransaction();

      return res.json({
        success: true,
        message: 'Teacher assigned successfully',
        data: updated
      });

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('Error assigning teacher:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to assign teacher'
    });
  }
});

// Also add endpoint to mark reevaluation as complete
adminRouter.post('/complete-reevaluation/:requestId', authMiddleware('teacher'), async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { requestId } = req.params;

      // Update reevaluation status
      const updated = await ReevaluationApplication.findOneAndUpdate(
        {
          _id: requestId,
          assignedTeacher: req.teacher.id,
          status: 'in_review'
        },
        { status: 'completed' },
        { new: true, session }
      );

      if (!updated) {
        throw new Error('Reevaluation not found or not assigned to you');
      }

      // Move from assigned to completed in teacher's records
      await Teacher.findByIdAndUpdate(
        req.teacher.id,
        {
          $pull: { assignedReevaluations: requestId },
          $addToSet: { completedReevaluations: requestId }
        },
        { session }
      );

      await session.commitTransaction();

      return res.json({
        success: true,
        message: 'Reevaluation marked as completed',
        data: updated
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('Error completing reevaluation:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to complete reevaluation'
    });
  }
});

module.exports = adminRouter;



