const jwt = require('jsonwebtoken');
const { Organization } = require('../schema/organization/organizationSchema.js');
const { Student } = require('../schema/student/studentSchema.js'); // Add this import
const { Teacher } = require("../schema/teacher/teacher.schema.js")
const authMiddleware = (userType) => async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        console.log('Checking auth for:', userType);
        console.log('Token present:', !!token);
        console.log('Cookies received:', req.cookies);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token missing'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);

            switch (userType) {
                case 'organization': {
                    console.log("new org")
                    console.log(decoded.organizationId)
                    const organization = await Organization.findById(decoded.organizationId);
                    console.log(decoded.organizationId)
                    console.log(organization)
                    if (!organization) {
                        return res.status(401).json({
                            success: false,
                            message: 'Organization not found'
                        });
                    }
                    req.organization = organization;
                    break;
                }

                case 'teacher': {
                    // First find the organization using organizationId from the token
                    console.log("in teacher auth")
                    console.log(decoded)
                    const organization = await Organization.findById(decoded.organizationId);

                    // console.log(decoded)
                    console.log("organization")
                    if (!organization) {
                        console.log("organization not found")
                        return res.status(401).json({
                            success: false,
                            message: 'Organization not found'
                        });
                    }
                    console.log("i am here 1")

                    // Find the teacher in Teacher model
                    const teacher = await Teacher.findById(decoded.id);
                    if (!teacher) {
                        return res.status(401).json({
                            success: false,
                            message: 'Teacher not found'
                        });
                    }
                    console.log("i am here 2")
                    console.log(teacher.organizationId)
                    // Verify teacher belongs to the correct organization
                    if (teacher.organizationId.toString() !== organization._id.toString()) {
                        return res.status(401).json({
                            success: false,
                            message: 'Teacher not associated with this organization'
                        });
                    }
                    console.log("i am here 3")
                    req.teacher = teacher;
                    req.organization = organization;
                    break;
                }

                case 'student': {
                    // First find the student
                    const student = await Student.findById(decoded.id);
                    if (!student) {
                        return res.status(401).json({
                            success: false,
                            message: 'Student not found'
                        });
                    }

                    // Then find their organization
                    const studentOrg = await Organization.findById(student.organizationId);
                    if (!studentOrg) {
                        return res.status(401).json({
                            success: false,
                            message: 'Organization not found for student'
                        });
                    }

                    req.student = student;
                    req.organization = studentOrg;
                    break;
                }

                default:
                    throw new Error('Invalid user type');
            }

            console.log(`Authenticated ${userType}:`, req[userType]?._id);
            next();

        } catch (error) {
            console.error('Token verification error:', error);
            res.clearCookie('accessToken');
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

module.exports = { authMiddleware };