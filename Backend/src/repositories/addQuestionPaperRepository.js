//const adminStudent = require("../schema/addStudentAdminSchema");
const QuestionPaper = require('../schema/organization/addQuestionPaperSchema')
// async function findAdmin(parameters){
//     try{
//         const response = await adminStudent.findOne({...parameters});
//         return response;
//     } catch(error) {
//         console.log(error)
//     }

// }
async function AddingQuestionPaperIntoDb(questionPaperDetails) {
    try {
        console.log("question paper details given by admin is : ", questionPaperDetails)
        examDetailsData = JSON.parse(questionPaperDetails.examDetails)
        questionDetailsData = JSON.parse(questionPaperDetails.questions)
        // console.log("Subject details is given by Ayush is : ", questionDetailsData)
        // console.log("My subjetc is not undefined : ",)
        const obj = {
            subjectName: examDetailsData.subject,
            examDate: examDetailsData.examDate,
            totalMarks: examDetailsData.totalMarks,
            duration: examDetailsData.duration,
            department: examDetailsData.department,
            semester: examDetailsData.semester,
            questionPdfPath: questionPaperDetails.questionPdfURL,
            questions: questionDetailsData
        }
        

        const response = await QuestionPaper.create(obj);

      
        return response

    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            // Duplicate key error
            const duplicateKey = error.keyValue; 
            console.log('Field:', Object.keys(duplicateKey)[0]); 
            console.log('Value:', Object.values(duplicateKey)[0]); 
            return { Field: Object.keys(duplicateKey)[0] }
        } else {
            console.error('Error : ', error);
            return { error: "Internal Error" }
        }
    }

}

module.exports = {
    AddingQuestionPaperIntoDb,
    // createAdminStudent
}