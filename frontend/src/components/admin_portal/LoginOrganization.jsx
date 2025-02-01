import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FluentEyeIcon from '../../../public/icons/eye';
import FluentEyeClosedIcon from '../../../public/icons/eye-closed';
import axios from 'axios';

const LoginOrganization = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        organizationId: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/organization/login', formData);
            if (response.data.success) {
                navigate('/admin');
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('Login failed. Please try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="h-full flex justify-center font-['Urbanist']">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] pl-[21px]">
                    Welcome back! Glad to see you, Again!
                </div>

                {errorMessage && (
                    <div className="text-red-600 text-center mt-2">
                        {errorMessage}
                    </div>
                )}

                <div className='flex justify-center mt-[57px]'>
                    <input
                        type="text"
                        name="organizationId"
                        value={formData.organizationId}
                        onChange={handleChange}
                        placeholder='Enter Organization ID'
                        className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                        transition-all duration-300 
                        hover:shadow-md hover:border-gray-400 
                        focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                        placeholder:text-gray-400"
                    />
                </div>

                <div className='flex justify-center'>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter Admin Email'
                        className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                        transition-all duration-300 
                        hover:shadow-md hover:border-gray-400 
                        focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                        placeholder:text-gray-400"
                    />
                </div>

                <div className="relative w-[300px] flex self-center">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                            transition-all duration-300 
                            hover:shadow-md hover:border-gray-400 
                            focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                            placeholder:text-gray-400"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? <FluentEyeIcon /> : <FluentEyeClosedIcon />}
                    </button>
                </div>

                <Link to='/organization/forgot-password'>
                    <div className='relative left-[300px] text-[#6A707C] text-[14px] cursor-pointer'>
                        Forgot Password?
                    </div>
                </Link>

                <div className='flex justify-center'>
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

                <div className="flex justify-center items-center mt-6">
                    <div className="text-[#1E232C] text-[15px]">Don't have an organization account?</div>
                    {/* <Link to='/organization/register'> */}
                    <div className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer" onClick={() => navigate('/search-organization', {
                        state: {
                            role: 'organization'
                        }
                    })}>Register Now</div>
                    {/* </Link> */}
                </div>
            </form>
        </div>
    );
};

export default LoginOrganization;
