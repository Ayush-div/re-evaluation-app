const { searchOrganizationService } = require("../services/searchOrganization.service");

console.log("Route hit: /api/organization/search");

async function searchOrganization(req, res) {
    try {
        const response = await searchOrganizationService();
        console.log("Search successful, found organizations:", response.length);
        
        return res.json({
            message: "Organizations successfully fetched",
            Success: true,
            data: response,
            statusCode: 200
        });
    } catch (error) {
        console.error("Search organization error:", error);
        
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error",
            Success: false,
            data: {},
            error: error
        });
    }
}

module.exports = {
    searchOrganization
};