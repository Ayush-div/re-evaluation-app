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



// Chatbot API
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: "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" });
adminRouter.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const setupMessages = [
      {
        "role": "user",
        "content": `You Are A chatbot on my website . Give the answers to users Query Politely And Try to keep the answer Short . You are allowed to have a normal and friendly chat with the user. If you do not have the answer to the user query just reply \'I can't assist you with that right now sorry !!\' You can give the user my contact +91 8932934856 to the user in such case.\n\nHere is a description of my site which I want you to give to the chatbot :-\nMy website is a student answer sheet revaluation platform. \nHere we have three sections organisation teacher and student\n\nOrganisation section :-\n 1) if you are an organisation then you need to first registered to our platform then give details about your organisation teachers and students by adding them from your dashboard\n 2) in the question paper section of your dashboard you can add question papers that are previously conducted and are being checked.\n 3) in creating a question paper you need to first sale the subject exam date total marks duration department and semester then after filling that you will be provided a boiler template for the number of questions you entered where you can fill the marks of each questions so that when the student wants to apply for revaluation he or she can select the particular question you can also add sub or sub sub parts of the question our website will make sure that the marks you entered in the boiler plate is equal to the total marks mentioned before \n\nTeacher section :-\n1) If you are a teacher when you need to login to our platform using your registered organisation email \n2) in the teachers dashboard you will find upload solutions section where you can upload the answers to the selected question paper \n3) you can also upload a video solution if students have more doubt in that question \n4) our website will also show teachers the question in which most of the students have doubt. \n5) teacher can also see recent uploads for revaluation by the students \n6) after receiving the question paper teacher can click on view details and reevaluate the question of the student \n\nStudent Section:- \n1) first student will need to login to our platform using the registered email given to him by his organisation \n2) in the student dashboard the student will see apply for revaluation check status question papers video solutions and answer sheets \n3) in apply for revaluation he will see the question paper uploaded by his organisation where when we he opens it he can select the question or there sub-parts which he has doubt and continue to payment in our website for now each question cost 500 rupees which the student needs to pay.\n4) inside check status the student can check the status of his revaluation if his paper is reevaluated a completed sign will be shown at the top corner of the displayed questions that he has paid to get reevaluated \n5) inside question paper section student can download the question papers uploaded by his organisation \n6) inside video solutions student can see the video solutions uploaded by the teachers \n7) inside answer sheet section a student can pay to get his full answer sheet in PDF form from the organisation \n8) note our website also has the features where inside apply for revaluation when a student select his doubt he can also select a meta information which is calculation error and mark answer in correct marking or other in others he can write his doubt which will be displayed to the teachers who is in-charge`
      },
    ];

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [...setupMessages, ...messages],
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
    });

    // Send chatbot response to client
    res.json({ response: chatCompletion.choices[0]?.message?.content || "I can't assist you with that right now, sorry!" });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Something went wrong with the chatbot." });
  }
});


module.exports = adminRouter;



