const { findStudent, createStudent } = require("../repositories/studentRepository")

async function registerStudent(studentDetails) {
    console.log("register service : ", studentDetails)
    const student = await findStudent({
        rollNumber: studentDetails.rollNumber,
        email: studentDetails.email
    });

    if (!student) { // we found user
        throw { reason: "Please check your Email or RollNumber it does not exist in Organisation", statuscode: 400 }
    }


    // 2. if not then create the user into the database
    const newStudent = await createStudent({
        mobileNumber: studentDetails.mobileNumber,
        rollNumber: studentDetails.rollNumber,
        studentName: studentDetails.studentName,
        email: studentDetails.email,
        password: studentDetails.password
    })

    console.log("Hii there : ", newStudent);
    if (newStudent.Field == 'email') {
        throw { reason: "Please enter correct email", statusCode: 500 }
    }
    else if (newStudent.Field == 'rollNumber') {
        throw { reason: "Please enter correct rollNumber", statusCode: 500 }
    }
    // if(!newStudent){
    //     throw {reason : "Internal Server Error, Not able to Register", statusCode : 500}
    // }

    // 3. return the details of the created user
    return newStudent
}



module.exports = {
    registerStudent
}