import React from 'react';
import FacebookIcon from '../../public/icons/facebook_ic';
import GoogleIcon from '../../public/icons/google_ic';
import AppleIcon from '../../public/icons/cib_apple';

export default function RegisterCard() {
    return (
        <div className="h-full flex justify-center font-['Urbanist']">
            <div className='flex flex-col gap-'>
                <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] pl-[21px]">
                    Hello! Register to
                    get started
                </div>
                <div className='flex justify-center mt-[57px]'>
                    <input
                        type="text"
                        placeholder='Enter Your Roll Number'
                        className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                        transition-all duration-300 
                        hover:shadow-md hover:border-gray-400 
                        focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                        placeholder:text-gray-400"
                    />
                </div>
                {/* Add phone number input */}
                <div className='flex justify-center mt-[15px]'>
                    <input
                        type="tel"
                        placeholder='Enter Your Phone Number'
                        className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                        transition-all duration-300 
                        hover:shadow-md hover:border-gray-400 
                        focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                        placeholder:text-gray-400"
                    />
                </div>

                <div className='flex justify-center mt-[55px]'>
                    <button
                        className="w-[300px] h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
                        transition-all duration-300 
                        hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
                        active:scale-95 active:bg-gray-900
                        focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    >
                        Register
                    </button>
                </div>

                {/* Social Login Section */}
                <div className="w-[330px] mt-2 mx-auto">
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                        <span className="text-[#6A707C] text-[14px] font-semibold">Or Register with</span>
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                    </div>
                    <div className='flex flex-col'>
                        <div className="flex justify-center gap-8 mt-4">
                            <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-blue-100 hover:border-blue-400 cursor-pointer hover:scale-105">
                                <FacebookIcon className="transition-colors duration-300 hover:text-blue-600" />
                            </div>

                            <div className="w-[70px] h-[46px] rounded-[8px] flex border items-center justify-center transition-all duration-300 hover:bg-red-50 hover:border-red-400 cursor-pointer hover:scale-105">
                                <div className="relative w-[24px] h-[24px]">
                                    <GoogleIcon className="transition-colors duration-300 hover:text-red-500" />
                                </div>
                            </div>

                            <div className="w-[70px] h-[46px] rounded-[8px] border flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:border-gray-600 cursor-pointer hover:scale-105">
                                <AppleIcon className="transition-colors duration-300 hover:text-gray-800" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <div className="text-[#1E232C] text-[15px]">Already have an account? </div>
                            <div className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer">Login Now</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


