const serverConfig = require("../config/serverConfig");
const { findStudent } = require("../repositories/studentLoginRepository");
const Student = require("../schema/student/studentSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function resetNewPasswordStudent(studentDetails) {
  const newPlainPassword = studentDetails.password;
  const email = studentDetails.email;


  try {
    const result = await Student.updateOne(
      { email }, // Filter to find the user by email
      { $set: { password: newPlainPassword } } // Update the password field
    );

    if (result.matchedCount > 0) {
      console.log("Password updated successfully!");
    } else {
      console.log("No user found with this email!");
    }
  } catch (err) {
    console.error("Error while updating password:", err);
  }
}

module.exports = {
  resetNewPasswordStudent,
};
