const Student = require('../schema/Student');
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
