const  QuestionPaper  = require("../schema/organization/addQuestionPaperSchema.js")

async function findQuestionPaper() {
    try {
        const response = await QuestionPaper.find();
        return response;
    } catch (error) {
        console.log("error in searchQuestionPaper.repository.js")
        console.log(error)
    }
}


module.exports = {
    findQuestionPaper
}