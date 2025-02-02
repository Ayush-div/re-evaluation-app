import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddedStudentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center font-['Urbanist'] bg-[#F7F8F9]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center p-8 bg-white rounded-[16px] shadow-lg max-w-md w-full mx-4"
      >
        {/* Success Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <svg 
            className="w-10 h-10 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </motion.div>

        {/* Success Message */}
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[30px] font-bold text-[#1E232C] mb-3 text-center"
        >
          Added Successfully!
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[#6A707C] text-center mb-8"
        >
          student has been added successfully.
        </motion.p>

        {/* Login Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/organization')}
          className="w-full h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
                    transition-all duration-300 
                    hover:bg-gray-800 hover:shadow-lg
                    focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Go to Admin page
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AddedStudentSuccess;
