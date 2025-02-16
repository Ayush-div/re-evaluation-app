const { createReevaluationRequest } = require('../services/reevaluation.service');

const handleReevaluationRequest = async (req, res) => {
    try {
        const { paymentData, requestData } = req.body;
        const studentId = req.user.id; // Assuming you have authentication middleware

        const reevaluation = await createReevaluationRequest(
            studentId,
            paymentData,
            requestData
        );

        res.status(200).json({
            success: true,
            message: 'Reevaluation request submitted successfully',
            data: reevaluation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to submit reevaluation request',
            error: error.message
        });
    }
};

// ... other controller methods ...
