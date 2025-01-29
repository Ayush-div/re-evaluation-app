const Student = require("../schema/studentSchema");
const adminStudent = require('../schema/addStudentAdminSchema')

    async function findStudent(parameters){
        try{
            const response = await adminStudent.findOne({...parameters});
            return response;
        } catch(error) {
            console.log(error)
        }
        
    }
    async function createStudent(studentDetails){
        try{
            console.log(studentDetails);
            const response = await Student.create(studentDetails);
            return response
        } catch(error) {
            if (error.code === 11000) {
                // Duplicate key error
                const duplicateKey = error.keyValue; // Access the duplicate key value
                console.log('Duplicate Key:', duplicateKey);
                return {Field: Object.keys(duplicateKey)[0]}
              } 
              else {
                console.error('Error:', error);
              }
            // console.log("Hii error, I am Ayush : ",error);
            // console.log(error)
        }
        
    }

module.exports = {
    findStudent,
    createStudent
}