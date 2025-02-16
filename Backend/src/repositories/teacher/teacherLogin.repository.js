const { Teacher } = require("../../schema/teacher/teacher.schema.js");  

async function findTeacher({ email }) {
    try {
        console.log("Finding teacher with email:", email);
            console.log("email is : ",email)
            const response = await Teacher.findOne({email:email});
            console.log(response)
            return response;
        } catch(error) {
            console.log(error)
        } 
    }

module.exports = {
    findTeacher,
}