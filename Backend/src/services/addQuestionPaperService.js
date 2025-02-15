const fs = require("fs/promises");
const cloudinary = require('../config/cloudinaryConfig');
const { AddingQuestionPaperIntoDb } = require("../repositories/addQuestionPaperRepository");

async function AddQuestionPaperService(questionPaperDetails) {
  console.log("question paper details is : ", questionPaperDetails);
  obj = {
    examDetails: questionPaperDetails.examDetails,
    questions: questionPaperDetails.questions
  }

  if (questionPaperDetails.questionPdf) {
    try {
      // Upload the file to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(
        questionPaperDetails.questionPdf, 
        { resource_type: "auto" }
      );

      console.log("Cloudinary Response: ", cloudinaryResponse);

      // Get the Cloudinary URL
      const questionPdfURL = cloudinaryResponse.secure_url;
      obj = {...obj, questionPdfURL};
      if(questionPdfURL){
        const Response = AddingQuestionPaperIntoDb(obj);

      }
      // Delete the local file after successful upload
      await fs.unlink(questionPaperDetails.questionPdf);

      return { message: "Upload successful", url: questionPdfURL };
    } catch (error) {
      console.error("Error uploading to Cloudinary: ", error);
      throw { message: "Not able to store PDF into Cloudinary", error };
    }
  }

  throw { message: "No PDF path provided" };
}

module.exports = {
  AddQuestionPaperService,
};
