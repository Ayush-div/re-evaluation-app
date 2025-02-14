const { findAdminTeacher, createAdminTeacher } = require("../repositories/addTeacherAdmin.repository.js")

async function registerAdminTeacher(teacherDetails) {
    console.log("Teacher details is : ", teacherDetails)
    const teacher = await findAdminTeacher({
        // fullName: teacherDetails.fullName,
        email: teacherDetails.email
    });
    console.log("Teacher is : ", teacher)
    // 1.  we need to check if the user with this email or mobileNumber existes or not
    if (teacher) { // we found user
        throw { reason: "Teacher with the given fullName and email already exists", statuscode: 400 }
    }

    // 2. if not then create the user into the database
    const newAdminTeacher = await createAdminTeacher({
        email: teacherDetails.email,
        fullName: teacherDetails.fullName,
    })
    console.log("newAdminTeacher :  ", newAdminTeacher)
    // if (newAdminTeacher.Field === 'fullName') {
    //     throw { reason: `Please enter correct ${newAdminTeacher.Field}`, statusCode: 401 }
    // }
    if (newAdminTeacher.Field === 'email') {
        throw { reason: `Please enter correct ${newAdminTeacher.Field}`, statusCode: 401 }
    }
    else if (newAdminTeacher.error === 'Internal Error') {
        throw { reason: 'not able to create Teacher, Internal Server Error', statusCode: 500 }
    }

    // 3. return the details of the created user
    return newAdminTeacher
}



module.exports = {
    registerAdminTeacher
}