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
        // console.log("vigyat:  here in studentrepo.js")
        const response = await Student.create(studentDetails);
        return response
    } catch (error) {
        if (error.cause.code === 11000) {
            // Duplicate key error
            console.log(error)
            const duplicateKey = error.cause.keyValue; 
            console.log('Duplicate Key:', duplicateKey);
            return { Field: Object.keys(duplicateKey)[0] }
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