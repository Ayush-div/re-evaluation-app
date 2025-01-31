import React, { useState } from 'react'
import axios from 'axios'

const CreateNewPasswordPage = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.password || !formData.confirmPassword) {
            setError('Please fill all fields');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        try {
            const response = await axios.post('/api/students/resetNewPasswordStudent', {
                email: formData.email,
                rollNumber: formData.rollNumber,
                password: formData.password,
            });
            console.log('Login successful:', response.data.message);
            if (response.data.message==='Logged In successfully') {
                setErrorMessage('');
                navigate('/student');
            }
            else{
                // show response.data.message into frontend UI 
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="h-full flex justify-center font-['Urbanist']">
            <div className='flex flex-col gap-'>
                <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] pl-[21px]">
                    Create New Password
                </div>

                {error && (
                    <div className="mx-auto w-[300px] mt-4">
                        <p className="text-red-500 text-[14px] text-center bg-red-50 p-2 rounded-lg">
                            {error}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='flex justify-center mt-[57px]'>
                        <input
                            type="password"
                            placeholder='New Password'
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                            transition-all duration-300 
                            hover:shadow-md hover:border-gray-400 
                            focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                            placeholder:text-gray-400"
                        />
                    </div>
                    <div className='flex justify-center mt-[15px]'>
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className="w-[300px] h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
                            transition-all duration-300 
                            hover:shadow-md hover:border-gray-400 
                            focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
                            placeholder:text-gray-400"
                        />
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
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNewPasswordPage