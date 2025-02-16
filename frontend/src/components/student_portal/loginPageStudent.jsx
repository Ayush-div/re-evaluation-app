import React, { useState, useEffect } from 'react';
import FluentEyeIcon from '../../../public/icons/eye';
import GoogleIcon from '../../../public/icons/google_ic';
import { useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import FluentEyeClosedIcon from '../../../public/icons/eye-closed';
import axios from 'axios';

const LoginCardStudent = () => {
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
                console.log(userInfo.data.email);
                console.log(userInfo.data.name);

                // userInfo.data will now contain: email, name, picture, given_name, family_name, etc.
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
        onError: (error) => console.error('Login Failed:', error),
        scope: 'email profile', // Add this line to request email access
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        rollNumber: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


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
                email: formData.email,
                rollNumber: formData.rollNumber,
                password: formData.password,
            });

            console.log('Login response:', response.data); // Debug log

            if (response.data.success) {
                // Store token from the correct location in response
                const token = response.data.data.accessToken;
                if (!token) {
                    throw new Error('No access token received');
                }

                localStorage.setItem('accessToken', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Store user data if needed
                localStorage.setItem('userData', JSON.stringify(response.data.data.student));

                navigate('/student');
            }
            else {
                // show response.data.message into frontend UI 
                console.log("Login Unsuccessful")
                setErrorMessage(response.data.message);
                setTimeout(() => setErrorMessage(''), 3000);
            }
            // if (response.data.success && response.data.accessToken && response.data.refreshToken) {
            //     // Store tokens
            //     localStorage.setItem('accessToken', response.data.accessToken);
            //     localStorage.setItem('refreshToken', response.data.refreshToken);

            //     // Store user info
            //     localStorage.setItem('user', JSON.stringify(response.data.user));

            //     // Set default authorization header
            //     axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

            //     setErrorMessage('');
            // } else {
            //     setErrorMessage(response.data.message || 'Invalid login response');
            // }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    // Add interceptor to handle token refresh
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // If error is 401 and we haven't retried yet
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // Attempt to refresh token
                        const refreshToken = localStorage.getItem('refreshToken');
                        const response = await axios.post('/api/auth/refresh-token', {
                            refreshToken
                        });

                        // Store new tokens
                        localStorage.setItem('accessToken', response.data.accessToken);
                        localStorage.setItem('refreshToken', response.data.refreshToken);

                        // Update authorization header
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

                        // Retry original request
                        return axios(originalRequest);
                    } catch (refreshError) {
                        // If refresh fails, logout user
                        localStorage.clear();
                        navigate('/student/login');
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        // Cleanup interceptor on component unmount
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    return (
        <div className="h-full flex justify-center font-['Urbanist']">
            <form className="flex flex-col gap-2" onSubmit={onSubmit}>
                <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] pl-[21px]">
                    Welcome back! Glad to see you, Again!
                </div>
                {errorMessage && (
                    <div
                        id="error-message"
                        className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg"
                        style={{ animation: 'fadeOut 2s forwards' }}
                    >
                        {errorMessage}
                    </div>
                )}
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

                <div className='flex justify-center '>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter Your email-Id'
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
                        placeholder="Enter Your Password"
                        className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
              transition-all duration-300 
              hover:shadow-md hover:border-gray-400 
              focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
              placeholder:text-gray-400 "
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? <FluentEyeIcon /> : <FluentEyeClosedIcon />}
                    </button>
                </div>

                <Link to='/student/forgot-password'>
                    <div className='relative left-[300px]  text-[#6A707C] text-[14px] cursor-pointer'>
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

                <div className="w-[330px] mt-2 mx-auto">
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                        <span className="text-[#6A707C] text-[14px] font-semibold">Or Login with</span>
                        <div className="flex-1 h-[1px] bg-[#E8ECF4]"></div>
                    </div>
                    <div className='flex flex-col'>
                        <div className="flex justify-center gap-8 mt-4 ">


                            <div className="w-[200px] h-[46px] rounded-[8px] flex border items-center justify-around  transition-all duration-300 hover:bg-[#F7F8F9] hover:border-black cursor-pointer hover:scale-105 " onClick={login}>
                                <div className="relative w-[24px] h-[24px]" >
                                    <GoogleIcon className="transition-colors duration-300 hover:text-red-500" />
                                </div>
                                <div className=''>
                                    Login With Google
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-center items-center mt-6">
                            <div className="text-[#1E232C] text-[15px]">Don't have an account? </div>
                            {/* <Link to='/search-organization'> */}
                            <div className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer" onClick={() => navigate('/search-organization', { state: { role: 'student' } })}>Register Now</div>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginCardStudent;


