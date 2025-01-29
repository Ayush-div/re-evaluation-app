const serverConfig = require("../config/serverConfig");
const nodemailer = require("nodemailer");
// const { findStudent } = require("../repositories/studentLoginRepository");
const { findStudentEmail } = require('../repositories/createOtpRepository')
const { OTPPASSWORD, OTPEMAIL } = require("../config/serverConfig");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: OTPEMAIL, // Your Gmail address
    pass: OTPPASSWORD, // Your Gmail app password
  },
});

let otpStore = {};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
  

async function CreateOtp(studentDetails) {
  const email = studentDetails.email;
  // check if there is registered student with the given email or not
    // console.log(email)
  const student = await findStudentEmail({ email });
//   console.log("Service login : ", student);
//   console.log(email);
  // 1.  we need to check if the student with given details existes or not
  if (!student) {
    throw {
      reason: "student with the given email does not exists",
      statuscode: 400,
    };
  }
  
  const otp = generateOTP();
  otpStore[email] = otp;
//   console.log("Otp store : ",otpStore)
  const mailOptions = {
    from: OTPEMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };
//   console.log(mailOptions)
//   console.log(otp);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error : ",error);
        throw {message : "Failed to send OTP", status: 500}
    }

    throw {status: 201,message: "OTP sent successfully"}
  
  });
  throw {status: 201,message: "OTP sent successfully"}
}

async function VerifyOtp(studentOtpDetails) {

    // console.log(studentOtpDetails)
    // console.log(otpStore)
    // console.log("Keys are : ",Object.keys(otpStore)[0])
    // console.log(Object.keys(otpStore)[0]===studentOtpDetails.email && Object.values(otpStore)[0]===studentOtpDetails.otp)
    if(Object.keys(otpStore)[0]===studentOtpDetails.email && Object.values(otpStore)[0]===studentOtpDetails.otp){
        console.log("Hello world!!")
        delete otpStore[email];
        throw { message: "OTP verified successfully"}
    }
    else{
        throw { message : "Invalid Otp"}
    }
  
    
  }

module.exports = {
    CreateOtp,
    VerifyOtp
};

// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");
// const app = express();
// app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());
// app.use(bodyParser.json());



// Configure Nodemailer

// Generate OTP

// API to send OTP
// app.post("/send-otp", (req, res) => {
//   const { email } = req.body;
//   const otp = generateOTP();
//   otpStore[email] = otp;

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: "Your OTP Code",
//     text: Your OTP code is: ${otp},
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).json({ error: "Failed to send OTP" });
//     }
//     res.json({ message: "OTP sent successfully" });
//   });
// });

// API to verify OTP

// app.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;
//   if (otpStore[email] === otp) {
//     delete otpStore[email]; // Remove OTP after verification
//     res.json({ success: true, message: "OTP verified successfully" });
//   } else {
//     res.status(400).json({ success: false, message: "Invalid OTP" });
//   }
// });


