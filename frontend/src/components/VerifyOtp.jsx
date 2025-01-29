import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
export default function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  console.log("email is dash : ",email)

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    console.log('Verifying OTP:', otpValue, email);
    
    try {
      const response = await axios.post('/api/students/verifyOtp', {
          otp: otpValue,
          email: email,
      });
      console.log('verified successfully:', response.data);
      if (response.data.message==='OTP verified successfully') {
        navigate('/reset-password', { state: { email } });
      }
  } catch (error) {
      console.error('Error in verifying otp :', error);
  }
    
    
  };

  return (
    <div className="h-screen flex justify-center font-['Urbanist'] bg-[#F7F8F9]">
      <div className='flex flex-col justify-center'>
        <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] pl-[21px] ">
          OTP Verification
        </div>
        <div className="text-[#6A707C] text-[14px] pl-[21px] mt-2">
          Enter the verification code we just sent to your device.
        </div>
        <div className='flex justify-center gap-2 mt-[57px]'>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-[50px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] 
                       text-center text-[20px] font-bold
                       transition-all duration-300 
                       hover:shadow-md hover:border-gray-400 
                       focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]"
            />
          ))}
        </div>
        <div className='flex justify-center mt-[55px]'>
          <button
            onClick={handleVerify}
            className="w-[300px] h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
                     transition-all duration-300 
                     hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
                     active:scale-95 active:bg-gray-900
                     focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Verify
          </button>
        </div>
        <div className="flex justify-center items-center mt-6">
          <div className="text-[#1E232C] text-[15px]">Didn't receive code? </div>
          <div className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer hover:text-[#2ca3a2] transition-colors">
            Resend
          </div>
        </div>
      </div>
    </div>
  );
};
