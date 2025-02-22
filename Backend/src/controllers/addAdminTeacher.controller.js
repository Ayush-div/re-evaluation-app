const { Organization } = require("../schema/organization/organizationSchema.js");
const bcrypt = require('bcrypt');

const addAdminTeacher = async (req, res) => {
    try {
        const { fullName, email } = req.body;
        const organizationId = req.organization?._id;
        console.log("here in the controller of teacheradd")
        console.log(organizationId)

        console.log("Starting teacher addition process for org:", organizationId);

        // Get organization
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found"
            });
        }

        // Check if teacher already exists in this organization
        const existingTeacher = organization.teachers.find(teacher => 
            teacher.email === email || teacher.fullName === fullName
        );

        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message: "Teacher already exists in your organization"
            });
        }

        // Generate temporary password and hash it
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Create new teacher entry
        const newTeacher = {
            fullName,
            email,
            password: hashedPassword,
            organizationId: organizationId,
            organizationName: organization.orgName,
            subjects: [], // Can be updated later
            department: req.body.department || 'Not Specified',
            createdAt: new Date()
        };

        // Add teacher to organization's teachers array
        organization.teachers.push(newTeacher);
        await organization.save();

        console.log("Teacher added to organization:", newTeacher);

        return res.status(201).json({
            Success: true,
            message: "Teacher added successfully",
            data: {
                teacher: {
                    fullName: newTeacher.fullName,
                    email: newTeacher.email,
                    department: newTeacher.department,
                    createdAt: newTeacher.createdAt
                },
                tempPassword // For development only
            }
        });

    } catch (error) {
        console.error('Error in addAdminTeacher:', error);
        return res.status(500).json({
            Success: false,
            message: error.message || "Failed to add teacher",
            error: error
        });
    }
};

module.exports = { addAdminTeacher };