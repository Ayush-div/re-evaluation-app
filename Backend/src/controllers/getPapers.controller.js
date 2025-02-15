const { getPapersService } = require("../services/getPapers.service.js");

async function getPapersController(req, res) {
    try {
        // console.log("Inside getPapercontroller!!!")
        const response = await getPapersService();
        console.log("Search successful, found organizations:", response.length);

        return res.json({
            message: "Questions successfully fetched",
            Success: true,
            data: response,
            statusCode: 200
        });
    } catch (error) {
        console.error("(getPapers.controller.js)Get Question Papers error:", error);

        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error",
            Success: false,
            data: {},
            error: error
        });
    }
}

module.exports = {
    getPapersController
};


/*

my controller

const {getQuestionPaperService} = require("../services/getQuestionPaperService");

async function getQuestionPaperController(req,res){
    try{
        const response = await getQuestionPaperService()
        console.log("Back to controller", response);
        return res.status(201).json({
            message: "examDetails send Successfully ",
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
    getQuestionPaperController
}

*/
