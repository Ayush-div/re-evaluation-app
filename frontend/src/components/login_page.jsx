import React, { useState } from 'react';
import FluentEyeIcon from '../../public/icons/eye';
import FacebookIcon from '../../public/icons/facebook_ic';
import GoogleIcon from '../../public/icons/google_ic';
import AppleIcon from '../../public/icons/cib_apple';
import {  useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginCard = () => {
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                    }
                );
                console.log('Full Google Response:', userInfo.data);
                // userInfo.data will now contain: email, name, picture, given_name, family_name, etc.
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
        onError: (error) => console.error('Login Failed:', error),
        scope: 'email profile', // Add this line to request email access
    });
    const [formData, setFormData] = useState({
        rollNumber: '',
        mobileNumber: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/students/login', {
                mobileNumber: formData.mobileNumber,
                rollNumber: formData.rollNumber,
                password: formData.password,
            });
            console.log('Login successful:', response.data);
            if (response.data.message==='Logged In successfully') {
                navigate('/student');
              }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="h-full flex justify-center font-['Urbanist']">
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] pl-[21px]">
                    Welcome back! Glad to see you, Again!
                </div>

                <div className='flex justify-center mt-[57px]'>
                    <input
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        placeholder='Enter Your Roll Number'
                        className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                        transition-all duration-300 
                        hover:shadow-md hover:border-gray-400 
                        focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                        placeholder:text-gray-400"
                    />
                </div>

                <div className='flex justify-center mt-[15px]'>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder='Enter Your Phone Number'
                        className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                        transition-all duration-300 
                        hover:shadow-md hover:border-gray-400 
                        focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                        placeholder:text-gray-400"
                    />
                </div>

                <div className='flex justify-center mt-[15px] relative'>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter Your Password'
                        className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] pr-10 
                        transition-all duration-300 
                        hover:shadow-md hover:border-gray-400 
                        focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                        placeholder:text-gray-400"
                    />
                    <div className="absolute inset-y-0 right-10 flex items-center pr-12">
                        <FluentEyeIcon />
                    </div>
                    <Link to='/forgot-password'>
                    <div className='absolute left-[300px] top-[55px] text-[#6A707C] text-[14px] cursor-pointer'>
                        Forgot Password?
                    </div>
                    </Link>
                </div>

                <div className='flex justify-center mt-[55px]'>
                    <button
                        type="submit"
                        className="w-[300px] h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
                        transition-all duration-300 
                        hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
                        active:scale-95 active:bg-gray-900
                        focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </div>

                <div className="w-[330px] mt-2 mx-auto">
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                        <span className="text-[#6A707C] text-[14px] font-semibold">Or Login with</span>
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                    </div>
                    <div className='flex flex-col'>
                        <div className="flex justify-center gap-8 mt-4">
                            <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-blue-100 hover:border-blue-400 cursor-pointer hover:scale-105">
                                <FacebookIcon className="transition-colors duration-300 hover:text-blue-600" />
                            </div>

                            <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-red-50 hover:border-red-400 cursor-pointer hover:scale-105">
                                <div className="relative w-[24px] h-[24px] " onClick={login}>
                                    <GoogleIcon className="transition-colors duration-300 hover:text-red-500" />
                                </div>
                            </div>

                            <div className="w-[70px] h-[46px] rounded-[8px] border flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:border-gray-600 cursor-pointer hover:scale-105">
                                <AppleIcon className="transition-colors duration-300 hover:text-gray-800" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <div className="text-[#1E232C] text-[15px]">Don't have an account? </div>
                            <Link to='/register'>
                                <div className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer">Register Now</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginCard;


// import React from 'react';
// import FluentEyeIcon from '../../public/icons/eye';
// import FacebookIcon from '../../public/icons/facebook_ic';
// import GoogleIcon from '../../public/icons/google_ic';
// import AppleIcon from '../../public/icons/cib_apple';
// import { Link } from 'react-router-dom';

// const LoginCard = () => {
//     return (
//         <div className=" h-full flex justify-center font-['Urbanist']">
//             <div className='flex flex-col gap-'>
//                 <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] pl-[21px]">
//                     Welcome back! Glad to
//                     see you, Again!
//                 </div>
//                 <div className='flex justify-center mt-[57px]'>
//                     <input
//                         type="text"
//                         placeholder='Enter Your Roll Number'
//                         className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
//                         transition-all duration-300 
//                         hover:shadow-md hover:border-gray-400 
//                         focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
//                         placeholder:text-gray-400"
//                     />
//                 </div>
//                 <div className='flex justify-center mt-[15px]'>
//                     <input
//                         type="text"
//                         placeholder='Enter Your Phone Number'
//                         className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
//                         transition-all duration-300 
//                         hover:shadow-md hover:border-gray-400 
//                         focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
//                         placeholder:text-gray-400"
//                     />
//                 </div>
//                 <div className='flex justify-center mt-[15px] relative'>
//                     <input
//                         type="password"
//                         placeholder='Enter Your Password'
//                         className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] pr-10 
//                         transition-all duration-300 
//                         hover:shadow-md hover:border-gray-400 
//                         focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
//                         placeholder:text-gray-400"
//                     />
//                     <div className="absolute inset-y-0 right-10 flex items-center pr-12">
//                         <FluentEyeIcon />
//                     </div>
//                     <div className='absolute left-[300px] top-[55px] text-[#6A707C] text-[14px] cursor-pointer'>
//                         Forgot Password?
//                     </div>
//                 </div>
//                 <div className='flex justify-center mt-[55px]'>
//                     <button
//                         className="w-[300px] h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
//                         transition-all duration-300 
//                         hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
//                         active:scale-95 active:bg-gray-900
//                         focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
//                     >
//                         Login
//                     </button>
//                 </div>

//                 <div className="w-[330px] mt-2 mx-auto">
//                     <div className="flex items-center justify-center gap-2">
//                         <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
//                         <span className="text-[#6A707C] text-[14px] font-semibold">Or Login with</span>
//                         <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
//                     </div>
//                     <div className='flex flex-col '>
//                         <div className="flex justify-center gap-8 mt-4">
//                             <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-blue-100 hover:border-blue-400 cursor-pointer hover:scale-105">
//                                 <FacebookIcon className="transition-colors duration-300 hover:text-blue-600" />
//                             </div>

//                             <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-red-50 hover:border-red-400 cursor-pointer hover:scale-105">
//                                 <div className="relative w-[24px] h-[24px]">
//                                     <GoogleIcon className="transition-colors duration-300 hover:text-red-500" />
//                                 </div>
//                             </div>

//                             <div className="w-[70px] h-[46px] rounded-[8px] border flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:border-gray-600 cursor-pointer hover:scale-105">
//                                 <AppleIcon className="transition-colors duration-300 hover:text-gray-800" />
//                             </div>
//                         </div>
//                         <div className="flex justify-center items-center mt-6">
//                             <div className="text-[#1E232C] text-[15px]">Don't have an account? </div>
//                             <Link to="/register">
//                                 <div className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer">Register Now</div>
//                             </Link>
//                         </div>
//                     </div>

//                 </div>


//             </div>

//             <div>
//             </div>
//         </div>
//     );
// };

// export default LoginCard;