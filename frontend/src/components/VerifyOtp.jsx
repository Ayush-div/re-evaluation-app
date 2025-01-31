import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FiXCircle } from 'react-icons/fi';

export default function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(30); // Cooldown time in seconds
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    } else {
      setIsResendDisabled(false); // Enable the resend button
    }
  }, [resendTimer]);

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
    try {
      const response = await axios.post('/api/students/verifyOtp', {
        otp: otpValue,
        email: email,
      });
      console.log("response is : ",response.data.message)
      if (response.data.message === 'otp verified successfully') {
        navigate(`${location.pathname}/reset-password`, { state: { email } });
      }
      // else{
      //   // show  red cross sign on the UI with text -> please enter correct otp
      //   console.log("wrong otp  : ",response.data.message)
      // }
      else {
        setErrorMessage('Please enter correct OTP'); // Set error message on failure
      }
    } // catch (error) {
    //   console.error('Error verifying OTP:', error);
    // }
    catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('Something went wrong. Please try again.'); // Handle server errors
    }
  };

  const handleResend = async () => {
    try {
      setIsResendDisabled(true);
      setResendTimer(30); // Reset the timer

      // Send a request to resend the OTP
      console.log('Trying to Resend OTP response : ',email);
      const response = await axios.post('/api/students/createOtp', { email });
      console.log('Resend OTP response:', response.data);
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  return (
    <div className="h-screen flex justify-center font-['Urbanist'] bg-[#F7F8F9]">
      <div className="flex flex-col justify-center">
        <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] pl-[21px]">
          OTP Verification
        </div>
        <div className="text-[#6A707C] text-[14px] pl-[21px] mt-2">
          Enter the verification code we just sent to your device.
        </div>
        <div className="flex justify-center gap-2 mt-[57px]">
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

        {errorMessage && (
          <div className="flex items-center justify-center mt-4 text-red-500">
            <FiXCircle className="mr-2" size={20} />
            {errorMessage}
          </div>
        )}
        <div className="flex justify-center mt-[55px]">
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
          <button
            onClick={handleResend}
            disabled={isResendDisabled}
            className={`text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer transition-colors 
                        ${isResendDisabled ? 'text-gray-400 cursor-not-allowed' : 'hover:text-[#2ca3a2]'}`}
          >
            Resend
          </button>
        </div>
        {isResendDisabled && (
          <div className="text-center mt-2 text-[#6A707C] text-[14px]">
            You can resend the OTP in <span className="font-bold text-[#1E232C]">{resendTimer}</span> seconds.
          </div>
        )}
      </div>
    </div>
  );
}
