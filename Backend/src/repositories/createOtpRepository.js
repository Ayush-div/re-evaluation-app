const {Student} = require("../schema/student/studentSchema");
// const adminStudent = require('../schema/addStudentAdminSchema')

    async function findStudentEmail({email}){
        try{
            // console.log("email is : ",email)
            const response = await Student.findOne({email});
            // console.log(response)
            return response;
        } catch(error) {
            console.log("Error is : ",error)
        } 
    }

module.exports = {
    findStudentEmail,
}