const { Organization } = require("../schema/organization/organizationSchema.js");
const bcrypt = require('bcrypt');

const addAdminStudent = async (req, res) => {
    try {
        const { rollNumber, email } = req.body;
        const organizationId = req.organization?._id;

        console.log("Starting student addition process for org:", organizationId);

        // Get organization
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found"
            });
        }
        console.log("organization is")
        console.log(organization)

        // Check if student already exists in this organization
        const existingStudent = organization.students.find(student => 
            student.rollNumber === rollNumber || student.email === email
        );

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Student already exists in your organization"
            });
        }

        // Create new student data
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Add student directly to organization's students array
        const newStudent = {
            rollNumber,
            email,
            password: hashedPassword,
            organizationId: organizationId,
            organizationName: organization.orgName,
            createdAt: new Date()
        };

        organization.students.push(newStudent);
        await organization.save();

        console.log("Student added to organization:", newStudent);

        return res.status(201).json({
            success: true,
            message: "Student added successfully",
            data: {
                student: {
                    rollNumber: newStudent.rollNumber,
                    email: newStudent.email,
                    createdAt: newStudent.createdAt
                },
                tempPassword
            }
        });

    } catch (error) {
        console.error('Error in addAdminStudent:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to add student"
        });
    }
};

module.exports = { addAdminStudent };