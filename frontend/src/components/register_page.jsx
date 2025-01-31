import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FacebookIcon from '../../public/icons/facebook_ic';
import GoogleIcon from '../../public/icons/google_ic';
import AppleIcon from '../../public/icons/cib_apple';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import FluentEyeIcon from '../../public/icons/eye';
import FluentEyeClosedIcon from '../../public/icons/eye-closed';

export default function RegisterCard() {
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      console.log("Response is : ", response.data.message);
      if (response.data.message === 'successfully resistered the user') {
        navigate('/register-success');
      }

    } catch (error) {
      console.error('Error registering student:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 font-['Urbanist']">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="text-[30px] font-[700] text-center mb-8">
          Hello! Register to get started
        </div>
        
        <form className="flex flex-col items-center gap-4 w-[300px] mt-[30px]" onSubmit={onSubmit}>
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

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
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
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
            >
              {showPassword ? <FluentEyeIcon /> : <FluentEyeClosedIcon />}
            </button>
          </div>

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

          <div className="w-full flex justify-center items-center mt-6">
            <div className="text-[#1E232C] text-[15px]">Already have an account? </div>
            <Link to='/login'>
              <div className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer">Login Now</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};


