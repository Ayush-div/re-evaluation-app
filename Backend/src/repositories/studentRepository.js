const Student = require("../schema/student/studentSchema");
const adminStudent = require('../schema/organization/addStudentAdminSchema')

async function findStudent(parameters) {
    try {
        const response = await adminStudent.findOne({ ...parameters });
        return response;
    } catch (error) {
        console.log(error)
    }

}

async function createStudent(studentDetails) {
    try {
        console.log("vigyat:  here in studentrepo.js")
        const response = await Student.create(studentDetails);
        console.log("response is -> ")
        console.log(response);

        return response
    } catch (error) {
        const errorCode = error?.code || error?.cause?.code
        console.log(errorCode)
        console.log(error);

        if (errorCode === 11000) {
            // Duplicate key error
            // console.log(error)
            const duplicateKey = error?.cause?.keyValue || error?.keyValue;
            console.log('Duplicate Key:', duplicateKey);
            return { Field: Object.keys(duplicateKey)[0] }
        } else if (error.name == "ValidationError") {
            console.log("here in validation errors ")
            const validationErrors = Object.keys(error.errors).map(field => ({
                field: field,
                message: error.errors[field].message
            }));
            console.log("Validation errors:", validationErrors);
            throw { reason: validationErrors[0].message };
        }
        else {
            console.error('Error:', error);
        }
    }

}

module.exports = {
    findStudent,
    createStudent
}