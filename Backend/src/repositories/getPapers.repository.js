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


// my repo

/*
async function getQuestionPaperFromDb(){
        try{
            const response = await QuestionPaper.findAll();
            return response;
        } catch(error) {
            console.log("error found by ayush in repo layer : ",error);
            throw error;
        }
        
    }

*/