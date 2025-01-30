// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useState } from 'react';
// const AddStudent = () => {
//     const [formData, setFormData] = useState({
//         rollNumber: '',
//         email: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/admin/addStudent', {
//                 email: formData.email,
//                 rollNumber: formData.rollNumber,
//             });
//             console.log('Added successful:', response.data);
//             if (response.data.message==='Logged In successfully') {
//                 navigate('/admin/added-student-success');
//               }
//         } catch (error) {
//             console.error('Error logging in:', error);
//         }
//     };
//   return (
//     <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
//       {/* Navbar */}
//       <nav className="bg-white shadow-md w-full sticky top-0 z-10">
//         <div className="max-w-[1440px] mx-auto px-6">
//           <div className="flex justify-between items-center h-16">
//             <div className="text-xl font-bold text-[#1E232C]">
//               Add New Student
//             </div>
//             <div className="flex space-x-6">
//               <button 
//                 onClick={() => window.history.back()}
//                 className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300"
//               >
//                 Back to Dashboard
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1440px] mx-auto px-6 py-8">
//         {/* Form Container */}
//         <div className="max-w-2xl mx-auto bg-white rounded-[12px] border border-[#DADADA] p-6">
//           <h2 className="text-xl font-bold text-[#1E232C] mb-6">Student Information</h2>
          
//           <form className="space-y-6">
//             {/* Basic Information */}
//             <div className="grid md:grid-cols-2 gap-6">
              
//               <div>
//                 <label className="block text-[#6A707C] text-sm mb-2">RollNumber </label>
//                 <input
//                   type="text"
//                   className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
//                            transition-all duration-300 
//                            hover:shadow-md hover:border-gray-400 
//                            focus:outline-none focus:border-[#000000] focus:shadow-lg"
//                   placeholder="Enter Student RollNumber"
//                 />
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-[#6A707C] text-sm mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
//                            transition-all duration-300 
//                            hover:shadow-md hover:border-gray-400 
//                            focus:outline-none focus:border-[#000000] focus:shadow-lg"
//                   placeholder="Enter email address"
//                 />
//               </div>
              
//             </div>

            
//             {/* Submit Button */}
//             <div className="flex justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={() => window.history.back()}
//                 className="px-6 py-3 border border-[#DADADA] rounded-[8px] text-[#1E232C]
//                          transition-all duration-300
//                          hover:border-black hover:shadow-md"
//               >
//                 Cancel
//               </button>
//               {/* <Link to='/admin/added-student-success'> */}
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-black text-white rounded-[8px] 
//                           transition-all duration-300
//                           hover:bg-gray-800 hover:scale-[1.02]
//                           active:scale-[0.98]"
//                 >
//                   Add Student
//                 </button>
//               {/* </Link> */}
              
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddStudent


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios if not already installed

const AddStudentAdmin = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/addStudent', {
        email: formData.email,
        rollNumber: formData.rollNumber,
      });

      console.log('Added successfully:', response.data.message);
      if (response.data.message === 'successfully Added student') {
        navigate('/admin/added-student-success');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">Add New Student</div>
            <div className="flex space-x-6">
              <button
                onClick={() => window.history.back()}
                className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white rounded-[12px] border border-[#DADADA] p-6">
          <h2 className="text-xl font-bold text-[#1E232C] mb-6">Student Information</h2>

          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter Student Roll Number"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#6A707C] text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 
                           transition-all duration-300 
                           hover:shadow-md hover:border-gray-400 
                           focus:outline-none focus:border-[#000000] focus:shadow-lg"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-[#DADADA] rounded-[8px] text-[#1E232C]
                         transition-all duration-300
                         hover:border-black hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-[8px] 
                          transition-all duration-300
                          hover:bg-gray-800 hover:scale-[1.02]
                          active:scale-[0.98]"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudentAdmin;
