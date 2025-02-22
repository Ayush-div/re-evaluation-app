const mongoose = require('mongoose');
const ReevaluationApplication = require('../schema/re-evaluation/reevaluationApplication.schema.js');
const { Student } = require('../schema/student/studentSchema.js');

async function getReevaluationRequestsService(organizationId) {
    try {
        const orgId = new mongoose.Types.ObjectId(organizationId);

        const students = await Student.find({ organizationId: orgId });
        console.log("Students found:", students.length);

        if (!students.length) {
            return [];
        }

        const reevaluationRequests = await ReevaluationApplication
            .find({
                studentId: { $in: students.map(student => student._id) }
            })
            .populate({
                path: 'studentId',
                model: 'student', 
                select: 'studentName rollNumber'
            });

        console.log("Reevaluation requests found:", reevaluationRequests.length);
        return reevaluationRequests;
    } catch (error) {
        console.error('Error in getReevaluationRequests service:', error);
        throw error;
    }
}

module.exports = { getReevaluationRequestsService };
