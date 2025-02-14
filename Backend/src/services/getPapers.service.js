const { findQuestionPaper } = require("../repositories/getPapers.repository.js")

async function getPapersService() {

    const questionPapers = await findQuestionPaper()

    if (!questionPapers) {
        throw new Error("No questionPaperss Found");
    }

    console.log("questionPapers  ->>>>!! (in getPapers.service.js)")
    return questionPapers
}



module.exports = {
    getPapersService
}

