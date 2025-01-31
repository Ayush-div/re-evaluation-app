import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from "react-router-dom";

export default function ForgotPasswordEmailPage() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send OTP to the email
    try {
      const response = await axios.post('/api/students/createOtp', {
          email: email,
      });
      const path = location.pathname;
      console.log('created successfully:', response.data);
      console.log("path is: ",path)
      const fullUrl = `${window.location.origin}${location.pathname}`;
      console.log("full url is: ",fullUrl)
      if (response.data.message==='Otp sent successfully') {
        setErrorMessage('');
        navigate(`${location.pathname}/verify-otp`, { state: { email } });
      }
      else{
        // print "user with the given email doesnot exists" into UI how to do that
        setErrorMessage('User with the given email does not exist');
      }
  } catch (error) {
      console.error('Error in verifying otp :', error);
      setErrorMessage('An error occurred. Please try again.');
  }
    
  };

  return (
    <div className="h-screen flex justify-center items-center font-['Urbanist'] bg-[#F7F8F9]">
      <form className="flex flex-col gap-4 w-[300px]" onSubmit={handleSubmit}>
        <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] text-center">
          Forgot Password
        </div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
          required
        />
        {errorMessage && (
          <div className="text-red-500 text-center text-[14px]">
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          className="w-full h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
          active:scale-95 active:bg-gray-900
          focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

// export default ForgotPasswordEmail;
