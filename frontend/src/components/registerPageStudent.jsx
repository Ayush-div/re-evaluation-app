import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FacebookIcon from '../../public/icons/facebook_ic';
import GoogleIcon from '../../public/icons/google_ic';
import AppleIcon from '../../public/icons/cib_apple';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

export default function RegisterCardStudent() {
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
        rollNumber: formData.rollNumber,
        studentName: formData.studentName,
        email: formData.email,
        password: formData.password,
      });
      console.log("Response is : ",response.data.message);
      if (response.data.message==='successfully resistered the user') {
        navigate('/student/registration-successful');
      }

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
            name="rollNumber"
            value={formData.rollNumber}
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

              <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-red-50 hover:border-red-400 cursor-pointer hover:scale-105" onClick={login}>
                <GoogleIcon className="transition-colors duration-300 hover:text-red-500" />
              </div>

                            <div className="w-[70px] h-[46px] rounded-[8px] border flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:border-gray-600 cursor-pointer hover:scale-105">
                                <AppleIcon className="transition-colors duration-300 hover:text-gray-800" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <div className="text-[#1E232C] text-[15px]">Already have an account? </div>
                            <Link to='/student/login'>
                                <div className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer">Login Now</div>   
                            </Link>
                        </div>
                    </div>
            </form>
                </div>

    );
};


