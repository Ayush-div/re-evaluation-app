const QuestionPaper = require('../schema/organization/addQuestionPaperSchema')
const ApplicationStatus = require('../schema/student/applicationStatusSchema');

async function addReevaluationDetailsRepo(reevaluationDetails) {
    try {
        console.log("reevaluation details given by student is : ", reevaluationDetails)
        // examDetailsData = JSON.parse(questionPaperDetails.examDetails)
        // questionDetailsData = JSON.parse(questionPaperDetails.questions)
        // console.log("Subject details is given by Ayush is : ", questionDetailsData)
        // console.log("My subjetc is not undefined : ",)
        // const obj = {
        //     subjectName: examDetailsData.subject,
        //     examDate: examDetailsData.examDate,
        //     totalMarks: examDetailsData.totalMarks,
        //     duration: examDetailsData.duration,
        //     department: examDetailsData.department,
        //     semester: examDetailsData.semester,
        //     questionPdfPath: questionPaperDetails.questionPdfURL,
        //     questions: questionDetailsData
        // }
        

        // const response = await QuestionPaper.create(obj);
        return {message : "Reached at repo layer!!"}
      
        // return response

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
    addReevaluationDetailsRepo,
}


