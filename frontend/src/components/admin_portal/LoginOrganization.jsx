import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FluentEyeIcon from '../../../public/icons/eye';
import FluentEyeClosedIcon from '../../../public/icons/eye-closed';
import GoogleIcon from '../../../public/icons/google_ic';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const LoginOrganization = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
                console.log(userInfo.data.email);
                // userInfo.data will now contain: email, name, picture, given_name, family_name, etc.
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
        onError: (error) => console.error('Login Failed:', error),
        scope: 'email profile', // Add this line to request email access
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
                navigate('/organization');
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
            <form className="flex flex-col gap-4 w-[300px]" onSubmit={handleSubmit}>
                <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] text-center">
                    Welcome back! Glad to see you, Again!
                </div>

                {errorMessage && (
                    <div className="text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200">
                        {errorMessage}
                    </div>
                )}

                <div className='flex justify-center mt-[15px]'>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter Organization Email'
                        className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                        transition-all duration-300 hover:shadow-md hover:border-gray-400 
                        focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                        placeholder:text-gray-400"
                    />
                </div>

                <div className='relative'>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter Password'
                        className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] pr-10 
                        transition-all duration-300 hover:shadow-md hover:border-gray-400 
                        focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                        placeholder:text-gray-400"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                        {showPassword ? <FluentEyeIcon /> : <FluentEyeClosedIcon />}
                    </button>
                </div>

                <Link to='/organization/forgot-password' className="text-right">
                    <span className="text-[#6A707C] text-[14px] cursor-pointer hover:text-black">
                        Forgot Password?
                    </span>
                </Link>

                <button
                    type="submit"
                    className="w-full h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
                    transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
                    active:scale-95 active:bg-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                    Login
                </button>

                <div className="w-full flex flex-col">
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                        <span className="text-[#6A707C] text-[14px] font-semibold">Or Login with</span>
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                    </div>

                    <div className="flex justify-center gap-8 mt-4 " onClick={login}>
                        <div className="w-[200px] h-[46px] rounded-[8px] flex border items-center justify-around transition-all duration-300 hover:bg-[#F7F8F9] hover:border-black cursor-pointer hover:scale-105">
                            <div className="relative w-[24px] h-[24px]">
                                <GoogleIcon className="transition-colors duration-300 hover:text-red-500" />
                            </div>
                            <div>
                                Login With Google
                            </div>
                        </div>
                    </div>

                    <div className=" justify- items-center mt-6">
                        <div className="text-[#1E232C] text-[15px] flex justify-center">Don't have an organization account? </div>
                        <div
                            className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer flex justify-center"
                            onClick={() => navigate('/organization/register')}
                        >
                            Register Now
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginOrganization;
