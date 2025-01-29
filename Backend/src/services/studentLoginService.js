const serverConfig = require("../config/serverConfig");
const { findStudent } = require("../repositories/studentLoginRepository")
const Student = require('../schema/studentSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

        async function loginStudent(studentDetails) {
            const plainPassword = studentDetails.password;
            const mobileNumber = studentDetails.mobileNumber;
            const rollNumber = studentDetails.rollno;
            // check if there is registered student with the given email or not 
            const student = await findStudent({rollNumber,mobileNumber});
            console.log("Service login : ",student)
            
            // 1.  we need to check if the student with given details existes or not
            if(!student){ // we found student
                throw {reason : "student does not exists", statuscode : 400}
            }
            const isPasswordValidated = await bcrypt.compare(plainPassword, student.password);
            
            if(!isPasswordValidated){
                throw { message : "Invalid Password, please try again", statusCode: 401};
            }

            //  if the password is validated, create a token and return it
            console.log("Hii there : ",serverConfig.JWT_SECRET)
            const token = jwt.sign({email : Student.email, id : Student._id}, serverConfig.JWT_SECRET, {expiresIn: serverConfig.JWT_EXPIRY});
            return token

        }
        


module.exports = {
    loginStudent
}