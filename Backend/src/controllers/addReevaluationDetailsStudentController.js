const { applyForReevaluationService } = require("../services/addReevaluationDetailsStudentService");

async function applyForReevaluationController(req,res){
    try{
        console.log("back to ayush : ",req.body)
        const response = await applyForReevaluationService(req.body)
        console.log("Back to controller", response);
        return res.status(201).json({
            message: "reevaluationDetails send Successfully ",
            success: true,
            data: response,
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
    applyForReevaluationController
}

