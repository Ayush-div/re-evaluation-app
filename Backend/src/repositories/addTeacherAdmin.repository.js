
const { adminTeacher } = require("../schema/organization/addTeacherAdmin.schema.js")

async function findAdminTeacher(parameters) {
    try {
        const response = await adminTeacher.findOne({ ...parameters });
        return response;
    } catch (error) {
        console.log(error)
    }

}
async function createAdminTeacher(teacherDetails) {
    try {
        console.log("Teacher details is : ", teacherDetails)
        const email = teacherDetails.email;
        const fullName = teacherDetails.fullName;
        console.log("email ans password is : ", email, fullName)
        const response = await adminTeacher.create(teacherDetails);
        return response
    } catch (error) {
        console.log(error)
        const errorCode = error?.code || error?.cause?.code
        console.log(errorCode)
        if (errorCode === 11000) {
            const duplicateKey = error?.keyValue || error?.cause?.keyValue;
            console.log('Field:', Object.keys(duplicateKey)[0]);
            console.log('Value:', Object.values(duplicateKey)[0]);
            return { Field: Object.keys(duplicateKey)[0] }
        } else {
            console.error('Error : ', error);
            return { error: "Internal Error" }
        }
    }

}

module.exports = {
    findAdminTeacher,
    createAdminTeacher
}