const jwt = require('jsonwebtoken');
const { Student } = require('../schema/student/studentSchema');

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header required'
            });
        }

        const token = authHeader.split(' ')[1];
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const student = await Student.findById(decoded.id)
                .select('-password')
                .lean();

            if (!student) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            req.user = student;
            next();
        } catch (jwtError) {
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
