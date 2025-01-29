// const adminStudent = require('../schema/addStudentAdminSchema.js')

// const addAdminStudent = async (req, res) => {
//     try {
//       const { mobileNumber, rollno } = req.body;
  
//       if (!mobileNumber || !rollno) {
//         return res.status(400).json({ message: "Mobile Number and Roll Number are required!" });
//       }
  
//       const student = await adminStudent.findOne({ mobileNumber });
//       if (student) {
//         return res.status(400).json({ message: "Student already present!" });
//       }
  
//       const newStudent = await adminStudent.create({
//         mobileNumber,
//         rollNumber: rollno,
//       });
  
//       if (!newStudent) {
//         return res.status(500).json({ message: "Error creating student!" });
//       }
  
//       return res.status(201).json({ message: "Student added successfully!", student: newStudent });
  
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
//   };
  
// module.exports = {
//     addStudent,
// }

const { registerAdminStudent } = require("../services/adminStudentService");

async function addAdminStudent(req,res){
    console.log(req.body);
    try{
        console.log("Ayush Divedi : ",req.body)
        const response = await registerAdminStudent(req.body);
        return res.json({ // .status(201)
            message : "successfully registered the user",
            Success : true,
            data : response,
            statusCode: 201,
            error : {}
        })
    } catch(error){
        console.log("Hii there : ",error)
        res.json({ // .status(error.statusCode)
            message : error.reason,
            Success : false,
            statusCode: error.statusCode,
            data : {},
            error : error
        })
    }
    
}

module.exports = {
  addAdminStudent
}