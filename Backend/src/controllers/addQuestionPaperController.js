const {AddQuestionPaperService} = require("../services/addQuestionPaperService");

async function addQuestionPaperController(req,res){
    try{
        console.log("req.body is : ",req.body);
        console.log("path  of file is : ",req.file)
        const product = await AddQuestionPaperService({
            questionPdf: req.file?.path,
            examDetails: req.body.examDetails,
            questions: req.body.questions
        })
        console.log("Back to controller", product);
        return res.status(201).json({
            message: "Successfully created the product",
            success: true,
            data: product,
            error: {},
            statusCode: 201
        })
    } catch(error){
        console.log("Hii there : ",error)
        res.json({
            message : error.reason,
            Success : false,
            statusCode: error.statusCode,
            data : {},
            error : error
        })
    }
    
}

module.exports = {
    addQuestionPaperController
}