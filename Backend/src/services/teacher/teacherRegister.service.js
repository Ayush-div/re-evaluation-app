const { findTeacher, createTeacher } = require("../../repositories/teacher/teacherRegister.repository.js");
async function registerTeacher(teacherDetails) {
    console.log(teacherDetails)
    const teacher = await findTeacher({
        // teacherName: teacherDetails.teacherName,
        email: teacherDetails.email,
        organizationId: teacherDetails.orgID
    });

    if (!teacher) {
        throw { reason: "Please check your email it does not exist in Organization", statusCode: 400 }
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
            organizationId: teacherDetails.orgID
        
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