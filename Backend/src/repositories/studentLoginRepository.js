const {Student} = require("../schema/student/studentSchema.js");

    async function findStudent({rollNumber, email}){
        try{
            console.log("roll is : ",rollNumber)
            const response = await Student.findOne({rollNumber, email});
            console.log(response)
            return response;
        } catch(error) {
            console.log(error)
        } 
    }

module.exports = {
    findStudent,
}