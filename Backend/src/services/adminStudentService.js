const {findAdminStudent, createAdminStudent} = require("../repositories/adminStudentRepository")

        async function registerAdminStudent(studentDetails) {
            console.log("Student details is : ",studentDetails)
            const student = await findAdminStudent({
                rollNumber : studentDetails.rollNumber,
                email: studentDetails.email
            });
            console.log("Student is : ",student)
            // 1.  we need to check if the user with this email or mobileNumber existes or not
            if(student){ // we found user
                throw {reason : "Student with the given rollnumber and email already exists", statuscode : 400}
            }

            // 2. if not then create the user into the database
            const newAdminStudent = await createAdminStudent({
                email: studentDetails.email,
                rollNumber: studentDetails.rollNumber,
            })
            console.log("newAdminStudent Ayush is :  ",newAdminStudent)
            if(newAdminStudent.Field==='rollNumber'){
                throw {reason : `Please enter correct ${newAdminStudent.Field}`, statusCode : 401}
            }
            else if(newAdminStudent.Field==='email'){
                throw {reason : `Please enter correct ${newAdminStudent.Field}`, statusCode : 401}
            }
            else if(newAdminStudent.error==='Internal Error'){
                throw {reason : 'not able to create student, Internal Server Error', statusCode: 500}
            }

            // 3. return the details of the created user
            return newAdminStudent
        }
        


module.exports = {
    registerAdminStudent
}