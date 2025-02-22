const { Organization } = require('../schema/organization/organizationSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const organizationLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const organization = await Organization.findOne({ organizationEmail: email });
    if (!organization) {
      return res.status(401).json({
        success: false,
        message: 'Organization not found'
      });
    }

    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { organizationId: organization._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set token as cookie
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
console.log("organization is ")
    console.log(organization)
    // Prepare organization data
    const orgData = {
      organization: {
        _id: organization._id,
        organizationName: organization.orgName,
        organizationEmail: organization.organizationEmail,
      }
    };
    console.log(orgData)

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      ...orgData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

module.exports = { organizationLoginController };