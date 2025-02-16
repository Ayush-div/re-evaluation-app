const { findStudent, createStudent } = require("../repositories/studentRepository")

async function registerStudent(studentDetails) {
    const student = await findStudent({
        rollNumber: studentDetails.rollNumber,
        email: studentDetails.email
    });

    if (!student) { 
        throw { reason: "Please check your Email or RollNumber it does not exist in Organization", statuscode: 400 }
    }
    // console.log("here in the studentregisterservice")
    console.log("register service : ", studentDetails)
    // console.log("studentDetails.orgID is -> ")
    // console.log(studentDetails.id)

    // 2. if not then create the user into the database
    const newStudent = await createStudent({
        mobileNumber: studentDetails.mobileNumber,
        rollNumber: studentDetails.rollNumber,
        studentName: studentDetails.studentName,
        email: studentDetails.email,
        password: studentDetails.password,
        department: studentDetails.department,
        semester: studentDetails.semester,
        organization: studentDetails.organization,
        orgID: studentDetails.orgID
    })

    console.log("Hii there from studentregistractioncontoller.js : ", newStudent);

    if (newStudent.Field == 'email') {
        throw { reason: "Please enter correct email it is already in use", statusCode: 500 }
    }
    else if (newStudent.Field == 'rollNumber') {
        throw { reason: "Please enter correct rollnumber it is already in use", statusCode: 500 }
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