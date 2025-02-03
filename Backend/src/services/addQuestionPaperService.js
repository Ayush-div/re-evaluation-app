// // const { AddingQuestionPaperIntoDB,} = require("../repositories/addQuestionPaperRepository");
// const fs = require("fs/promises");
// const cloudinary = require('../config/cloudinaryConfig');

// async function AddQuestionPaperService(questionPaperDetails) {
//   console.log("question paper details is : ", questionPaperDetails);
//   if(questionPaperDetails.questionPdfPath){
//     try{
//         const cloudinaryResponse = await cloudinary.uploader.upload(questionPaperDetails.questionPdfPath , {resource_type: "raw"});
//         console.log("cloudinaryResponse is ayush : ",cloudinaryResponse)
//         var questionPdfPath = cloudinaryResponse.secure_url;
//         await fs.unlink(process.cwd() + "/" + questionPdfPath);
//         throw {message : "Done"}
//     } catch(error){
//         console.log("pta nni kyu error aa rha hai : ",error);
//         throw {message: "not able to store pdf into cloudinary"};
//     }
// }

//   return addingQuePaper;
// }

// module.exports = {
//     AddQuestionPaperService,
// };


const fs = require("fs/promises");
const cloudinary = require('../config/cloudinaryConfig');

async function AddQuestionPaperService(questionPaperDetails) {
  console.log("question paper details is : ", questionPaperDetails);
  
  if (questionPaperDetails.questionPdfPath) {
    try {
      // Upload the file to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(
        questionPaperDetails.questionPdfPath, 
        { resource_type: "auto" }
      );

      console.log("Cloudinary Response: ", cloudinaryResponse);

      // Get the Cloudinary URL
      const questionPdfUrl = cloudinaryResponse.secure_url;

      // Delete the local file after successful upload
      await fs.unlink(questionPaperDetails.questionPdfPath);

      return { message: "Upload successful", url: questionPdfUrl };
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
