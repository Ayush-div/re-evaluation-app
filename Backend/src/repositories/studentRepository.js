const { Student } = require("../schema/student/studentSchema");
const { Organization } = require("../schema/organization/organizationSchema.js");

async function findStudent(parameters) {
    // try {
    //     const response = await adminStudent.findOne({ ...parameters });
    //     return response;
    // } catch (error) {
    //     console.log(error)
    // }

    try {
        console.log("object id is this ")
        console.log(parameters)
        console.log(parameters.organizationId)
        const organization = await Organization.findById(parameters.organizationId);
        if (!organization) {
            throw new Error("Organization not found");
        }
        const teacher = organization.students.find(t => t.email === parameters.email);
        console.log("Student found in organization:", teacher);
        return teacher;
    } catch (error) {
        console.error("Error in student:", error);
        throw error;
    }

}

// async function createStudent(studentDetails) {
//     try {
//         // Check that organization exists & rollNumber is not duplicated
//         const organization = await Organization.findById(studentDetails.organizationId);
//         if (!organization) {
//             throw new Error("Organization not found");
//         }
//         // Check if rollNumber already exists in the organization's students field
//         const duplicate = organization.students.find(s => s.rollNumber === studentDetails.rollNumber);
//         if (duplicate) {
//             throw { Field: 'rollNumber', message: "Roll number already in use within this organization" };
//         }
//         // If no duplicate, create student in the Student collection
//         const response = await Student.create(studentDetails);
//         return response;
//     } catch (error) {
//         const errorCode = error?.code || error?.cause?.code
//         console.log(errorCode)
//         console.log(error);

//         if (errorCode === 11000) {
//             // Duplicate key error
//             // console.log(error)
//             const duplicateKey = error?.cause?.keyValue || error?.keyValue;
//             console.log('Duplicate Key:', duplicateKey);
//             return { Field: Object.keys(duplicateKey)[0] }
//         } else if (error.name == "ValidationError") {
//             console.log("here in validation errors ")
//             const validationErrors = Object.keys(error.errors).map(field => ({
//                 field: field,
//                 message: error.errors[field].message
//             }));
//             console.log("Validation errors:", validationErrors);
//             throw { reason: validationErrors[0].message };
//         }
//         else {
//             console.error('Error:', error);
//         }
//     }

// }


// old logic 
async function createStudent(studentDetails) {
    try {
        console.log("vigyat:  here in studentrepo.js")
        const response = await Student.create(studentDetails);

        console.log("response is -> ")
        console.log(response);

        return response
    } catch (error) {
        const errorCode = error?.code || error?.cause?.code
        console.log(errorCode)
        console.log(error);

        if (errorCode === 11000) {
            // Duplicate key error
            // console.log(error)
            const duplicateKey = error?.cause?.keyValue || error?.keyValue;
            console.log('Duplicate Key:', duplicateKey);
            return { Field: Object.keys(duplicateKey)[0] }
        } else if (error.name == "ValidationError") {
            console.log("here in validation errors ")
            const validationErrors = Object.keys(error.errors).map(field => ({
                field: field,
                message: error.errors[field].message
            }));
            console.log("Validation errors:", validationErrors);
            throw { reason: validationErrors[0].message };
        }
        else {
            console.error('Error:', error);
        }
    }

}

module.exports = {
    findStudent,
    createStudent
};