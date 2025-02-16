const { Teacher } = require("../schema/teacher/teacher.schema.js");
const { adminTeacher } = require("../schema/organization/addTeacherAdmin.schema.js");

async function findTeacher(parameters) {
    try {
        const response = await adminTeacher.findOne({ ...parameters });
        console.log("here in repo of teacher register");
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createTeacher(teacherDetails) {
    try {
        console.log("Creating teacher with details:", teacherDetails);

        if (!teacherDetails.email || !teacherDetails.phoneNumber) {
            throw new Error('Missing required fields');
        }

        const response = await Teacher.create(teacherDetails);
        console.log("Teacher created successfully:", response);
        return {
            success: true,
            data: response
        };

    } catch (error) {
        console.error('Error creating teacher:', error);
        const errorCode = error?.code || error?.cause?.code
        console.log(errorCode)
        if (errorCode === 11000) {
            const duplicateKey = error?.cause?.keyValue || error?.keyValue
            const field = Object.keys(duplicateKey || {})[0] || 'field';
            return {
                success: false,
                error: true,
                Field: field,
                message: `${field} already exists`
            };
        } else if (error.name == "ValidationError") {
            console.log("here in validation errors ")
            const validationErrors = Object.keys(error.errors).map(field => ({
                field: field,
                message: error.errors[field].message
            }));
            console.log("Validation errors:", validationErrors);
            throw { reason: validationErrors[0].message };
        }
        return {
            success: false,
            error: true,
            message: error.message || 'Error creating teacher'
        };
    }
}

module.exports = {
    findTeacher,
    createTeacher
};