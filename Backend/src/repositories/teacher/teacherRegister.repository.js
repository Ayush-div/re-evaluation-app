const { Teacher } = require("../../schema/teacher/teacher.schema.js");
const { adminTeacher } = require("../../schema/organization/addTeacherAdmin.schema.js");
const { Organization } = require("../../schema/organization/organizationSchema.js");

/* 
  Finds a teacher within the organization's embedded teachers array
  Expects an object with { organizationId, email }
*/
async function findTeacher(parameters) {
    try {
        console.log("object id is this ")
        console.log(parameters.organizationId)
        const organization = await Organization.findById(parameters.organizationId);
        if (!organization) {
            throw new Error("Organization not found");
        }
        const teacher = organization.teachers.find(t => t.email === parameters.email);
        console.log("Teacher found in organization:", teacher);
        return teacher;
    } catch (error) {
        console.error("Error in findTeacher:", error);
        throw error;
    }
}

/* 
  Creates a teacher by pushing teacherDetails into the organization's teachers array.
  Expects organizationId separately and teacherDetails containing required teacher data.
*/
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