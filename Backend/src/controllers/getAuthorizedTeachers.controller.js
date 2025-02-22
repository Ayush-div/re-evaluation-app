const { Teacher } = require('../schema/teacher/teacher.schema.js');
const { Organization } = require('../schema/organization/organizationSchema.js');

async function getAuthorizedTeachersController(req, res) {
    try {
        const organization = await Organization.findById(req.organization._id);

        const authorizedEmails = organization.teachers.map(teacher => teacher.email);

        const registeredTeachers = await Teacher.find({
            email: { $in: authorizedEmails },
            organizationId: req.organization._id
        }).select('teacherName email department');

        const combinedTeacherData = registeredTeachers.map(regTeacher => {
            const orgTeacher = organization.teachers.find(t => t.email === regTeacher.email);
            console.log("registered teachers are")
            console.log(regTeacher)
           
            return {
                _id: regTeacher._id,
                teacherName: regTeacher.teacherName,
                email: regTeacher.email,
                department: regTeacher.department, 
                subjects: orgTeacher?.subjects || []
            };
        });

        console.log("Found registered teachers:", combinedTeacherData.length);

        return res.json({
            success: true,
            data: combinedTeacherData
        });
    } catch (error) {
        console.error('Error fetching authorized teachers:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch authorized teachers'
        });
    }
}

module.exports = { getAuthorizedTeachersController };
