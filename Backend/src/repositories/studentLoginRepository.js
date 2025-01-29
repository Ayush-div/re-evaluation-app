const Student = require("../schema/studentSchema");
// const adminStudent = require('../schema/addStudentAdminSchema')

    async function findStudent({rollNumber, mobileNumber}){
        try{
            const response = await Student.findOne({rollNumber, mobileNumber});
            console.log(response)
            return response;
        } catch(error) {
            console.log(error)
        } 
    }

module.exports = {
    findStudent,
}