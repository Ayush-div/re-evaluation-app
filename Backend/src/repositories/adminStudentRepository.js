//const adminStudent = require("../schema/addStudentAdminSchema");
const adminStudent = require('../schema/organization/addStudentAdminSchema')
async function findAdminStudent(parameters) {
    try {
        const response = await adminStudent.findOne({ ...parameters });
        console.log("here in adminstudents")
        return response;
    } catch (error) {
        console.log(error)
    }

}
async function createAdminStudent(studentDetails) {
    try {
        console.log("Student details is : ", studentDetails)
        const email = studentDetails.email;
        const rollNumber = studentDetails.rollNumber;
        console.log("email ans password is : ", email, rollNumber)
        const response = await adminStudent.create(studentDetails);
        // console.log("Response is : ", response);
        return response
    } catch (error) {
        console.log(error)
        const errorCode = error?.cause?.code || error?.code
        if (errorCode === 11000) {
            console.log(errorCode)
            // Duplicate key error
            const duplicateKey = error?.cause?.keyValue||error?.keyValue; // Access the duplicate key value
            console.log('Field:', Object.keys(duplicateKey)[0]); // The field name
            console.log('Value:', Object.values(duplicateKey)[0]); // The duplicate value
            return { Field: Object.keys(duplicateKey)[0] }
        } else {
            console.error('Error : ', error);
            return { error: "Internal Error" }
        }
    }

}

module.exports = {
    findAdminStudent,
    createAdminStudent
}