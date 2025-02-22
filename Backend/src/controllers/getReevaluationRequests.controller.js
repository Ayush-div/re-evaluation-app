const { getReevaluationRequestsService } = require('../services/getReevaluationRequests.service.js');

async function getReevaluationRequestsController(req, res) {
    try {
        console.log("here in reevaluate request controller")
        console.log(req.organization)
        const organizationId = req.organization._id;
        const reevaluationRequests = await getReevaluationRequestsService(organizationId);
        console.log("reevaluation requests")
        console.log(reevaluationRequests)
        res.json({
            success: true,
            data: reevaluationRequests
        });
    } catch (error) {
        console.error('Error in getReevaluationRequests controller:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reevaluation requests',
            error: error.message
        });
    }
}

module.exports = { getReevaluationRequestsController };
