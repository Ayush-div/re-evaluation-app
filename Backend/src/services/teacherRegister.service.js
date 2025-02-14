const { findTeacher, createTeacher } = require("../repositories/teacherRegister.repository.js");
const { ApiError } = require("../utils/ApiError.utils.js")
async function registerTeacher(teacherDetails) {
    const teacher = await findTeacher({
        // teacherName: teacherDetails.teacherName,
        email: teacherDetails.email
    });

    if (!teacher) {
        throw { reason: "Please check your email it does not exist in Organisation", statusCode: 400 }
    }
    console.log("register service : ", teacherDetails)

    const newTeacher = await createTeacher({
        phoneNumber: teacherDetails.phoneNumber,
        teacherName: teacherDetails.teacherName,
        qualification: teacherDetails.qualification,
        email: teacherDetails.email,
        password: teacherDetails.password,
        department: teacherDetails.department,
        role: teacherDetails.role,
        document: teacherDetails.document,
        organization: teacherDetails.organization,
        orgID: teacherDetails.orgID
    })

    console.log("Hii there from teacherregistractionservice.js : ", newTeacher.Field);
    console.log(newTeacher)

    if (newTeacher.Field === 'email') {
        throw { reason: "Please enter correct email it is already in use", statusCode: 500 }
    }
    else if (newTeacher.Field === 'phoneNumber') {
        console.log("Phone number used hai already")
        throw { reason: "Phone Number already in use", statusCode: 500 }
    }
    if (!newTeacher) {
        throw { reason: "Internal Server Error, Not able to Register", statusCode: 500 }
    }

    return newTeacher
}



module.exports = {
    registerTeacher
}