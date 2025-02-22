const { getPapersService } = require("../services/getPapers.service.js");

async function getPapersController(req, res) {
    try {
        console.log("received req org is ");
        console.log(req.organization);

        if (!req.organization || !req.organization.questionPapers) {
            return res.status(404).json({
                message: "No question papers found for this organization",
                Success: false,
                data: [],
                statusCode: 404
            });
        }

        const response = req.organization.questionPapers;
        console.log("Search successful, found Question Papers -> :", response.length);

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