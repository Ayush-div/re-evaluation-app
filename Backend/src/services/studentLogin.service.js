const serverConfig = require("../config/serverConfig");
const { findStudent } = require("../repositories/studentLoginRepository")
const Student = require('../schema/studentSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

        async function loginStudent(studentDetails) {
            const plainPassword = studentDetails.password;
            const email = studentDetails.email;
            const rollNumber = studentDetails.rollNumber;
            // check if there is registered student with the given email or not 

            const student = await findStudent({rollNumber,email});
            console.log("Service login : ",student)
            console.log(studentDetails.rollNumber)
            // 1.  we need to check if the student with given details existes or not
            if(!student){ // we found student
                throw {reason : "student with given rollno/Email does not exists", statuscode : 400}
            }
            const isPasswordValidated = await bcrypt.compare(plainPassword, student.password);
            
            if(!isPasswordValidated){
                throw { reason : "Invalid Password, please try again", statusCode: 401};
            }

            //  if the password is validated, create a token and return it
            console.log("Hii there : ",serverConfig.JWT_SECRET)
            const token = jwt.sign({email : Student.email, id : Student._id}, serverConfig.JWT_SECRET, {expiresIn: serverConfig.JWT_EXPIRY});
            return token

        }
        


module.exports = {
    loginStudent
}