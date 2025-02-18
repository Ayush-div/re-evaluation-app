const jwt = require('jsonwebtoken');
const { Teacher } = require('../schema/teacher/teacher.schema');
const { Student } = require('../schema/student/studentSchema.js');
const { Organization } = require('../schema/organization/organizationSchema.js');

const authMiddleware = (userType) => async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token missing'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            let UserModel;
            let userKey;
            switch (userType) {
                case 'teacher':
                    UserModel = Teacher;
                    userKey = 'teacher';
                    break;
                case 'student':
                    UserModel = Student;
                    userKey = 'student';
                    break;
                case 'organization':
                    UserModel = Organization;
                    userKey = 'organization';
                    break;
                default:
                    throw new Error('Invalid user type');
            }

            const user = await UserModel.findById(decoded.id)
                .select('-password')
                .lean();

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            req[userKey] = user;
            next();
        } catch (jwtError) {
            res.clearCookie('accessToken');
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = { authMiddleware };
