const Student = require('../schema/student/studentSchema.js');
const jwt = require('jsonwebtoken');

exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the Stdnt in org DB
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(401).json({
        message: 'Student not found. Please contact your organization.'
      });
    }

    // Verify password (implement proper password verification)


    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.status(200).json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        department: student.department,
        semester: student.semester
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find student
    const student = await Student.findById(decoded.id).select('-password');

    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const newRefreshToken = jwt.sign(
      { id: student._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

module.exports = {
  refreshToken
};
