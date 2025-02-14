const { getPapersService } = require("../services/getPapers.service.js");

async function getPapersController(req, res) {
    try {
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