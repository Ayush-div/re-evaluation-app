// import React, { useState } from 'react';
// import FacebookIcon from '../../public/icons/facebook_ic';
// import GoogleIcon from '../../public/icons/google_ic';
// import AppleIcon from '../../public/icons/cib_apple';
// import axios from 'axios';

// export default function RegisterCard() {
//   const [formData, setFormData] = useState({
//     rollno: '',
//     mobileNumber: '',
//     studentName: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     console.log(e)
//     try {
//       const response = await axios.post('/api/students/register', {
//         mobileNumber: formData.mobileNumber,
//         rollno: formData.rollno,
//         studentName: formData.studentName,
//         email: formData.email,
//         password: formData.password,
//       });

//       const data = response.data;
//       console.log(data.error.reason)
      
//     } catch (error) {
//       console.error('Error registering student:', error);
//     }
//   };

//   return (
//     <div className="h-full flex justify-center font-['Urbanist']">
//       <form className="flex flex-col gap-4 w-[300px]" onSubmit={onSubmit}>
//         <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] text-center">
//           Hello! Register to get started
//         </div>

//         <input
//           type="text"
//           name="rollno"
//           value={formData.rollno}
//           onChange={handleChange}
//           placeholder="Enter Your Roll Number"
//           className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
//           transition-all duration-300 
//           hover:shadow-md hover:border-gray-400 
//           focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
//           placeholder:text-gray-400"
//           required
//         />

//         <input
//           type="tel"
//           name="mobileNumber"
//           value={formData.mobileNumber}
//           onChange={handleChange}
//           placeholder="Enter Your Phone Number"
//           className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
//           transition-all duration-300 
//           hover:shadow-md hover:border-gray-400 
//           focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
//           placeholder:text-gray-400"
//           required
//         />

//         <input
//           type="text"
//           name="studentName"
//           value={formData.studentName}
//           onChange={handleChange}
//           placeholder="Enter Your Name"
//           className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
//           transition-all duration-300 
//           hover:shadow-md hover:border-gray-400 
//           focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
//           placeholder:text-gray-400"
//         />

//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Enter Your Email"
//           className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
//           transition-all duration-300 
//           hover:shadow-md hover:border-gray-400 
//           focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
//           placeholder:text-gray-400"
//         />

//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Enter Your Password"
//           className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
//           transition-all duration-300 
//           hover:shadow-md hover:border-gray-400 
//           focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
//           placeholder:text-gray-400"
//         />

//         <button
//           type="submit"
//           className="w-full h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
//           transition-all duration-300 
//           hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
//           active:scale-95 active:bg-gray-900
//           focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
//         >
//           Register
//         </button>

//         {/* Social Login Section */}
//         <div className="w-full mt-4">
//           <div className="flex items-center justify-center gap-2">
//             <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
//             <span className="text-[#6A707C] text-[14px] font-semibold">Or Register with</span>
//             <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
//           </div>
//           <div className="flex justify-center gap-4 mt-4">
//             <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-blue-100 hover:border-blue-400 cursor-pointer hover:scale-105">
//               <FacebookIcon className="transition-colors duration-300 hover:text-blue-600" />
//             </div>

//             <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-red-50 hover:border-red-400 cursor-pointer hover:scale-105">
//               <GoogleIcon className="transition-colors duration-300 hover:text-red-500" />
//             </div>

//             <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:border-gray-600 cursor-pointer hover:scale-105">
//               <AppleIcon className="transition-colors duration-300 hover:text-gray-800" />
//             </div>
//           </div>
//           <div className="flex justify-center items-center mt-6">
//             <span className="text-[#1E232C] text-[15px]">Already have an account? </span>
//             <span className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer">Login Now</span>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react';
import FacebookIcon from '../../public/icons/facebook_ic';
import GoogleIcon from '../../public/icons/google_ic';
import AppleIcon from '../../public/icons/cib_apple';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RegisterCard() {

    const [formData, setFormData] = useState({
        rollno: '',
        mobileNumber: '',
        studentName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        try {
            const response = await axios.post('/api/students/register', {
                mobileNumber: formData.mobileNumber,
                rollno: formData.rollno,
                studentName: formData.studentName,
                email: formData.email,
                password: formData.password,
            });

            const msg = response.data.message;
            console.log(msg)

        } catch (error) {
            console.error('Error registering student:', error);
        }
    };

    return (
        <div className="h-full flex justify-center font-['Urbanist']">
            <form className="flex flex-col gap-4 w-[300px]" onSubmit={onSubmit}>
                <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] text-center">
                    Hello! Register to get started
                </div>

                <input
                    type="text"
                    name="rollno"
                    value={formData.rollno}
                    onChange={handleChange}
                    placeholder="Enter Your Roll Number"
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
                    required
                />

                <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number"
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
                    required
                />

                <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
                />

                <button
                    type="submit"
                    className="w-full h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
          active:scale-95 active:bg-gray-900
          focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                    Register
                </button>

                {/* Social Login Section */}
                <div className="w-full mt-4">
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                        <span className="text-[#6A707C] text-[14px] font-semibold">Or Register with</span>
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-blue-100 hover:border-blue-400 cursor-pointer hover:scale-105">
                            <FacebookIcon className="transition-colors duration-300 hover:text-blue-600" />
                        </div>

                        <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-red-50 hover:border-red-400 cursor-pointer hover:scale-105">
                            <GoogleIcon className="transition-colors duration-300 hover:text-red-500" />
                        </div>

                        <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:border-gray-600 cursor-pointer hover:scale-105">
                            <AppleIcon className="transition-colors duration-300 hover:text-gray-800" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <span className="text-[#1E232C] text-[15px]">Already have an account? </span>
                        <Link to='/login'>
                            <span className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer">Login Now</span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}