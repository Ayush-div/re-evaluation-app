import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const StudentAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = location.state?.organization || JSON.parse(localStorage.getItem('selectedOrg'));

  useEffect(() => {
    console.log(orgData ? 'Organization data available:' : 'No organization data found');
  }, [orgData]);

  return (
    <div className="h-full bg-[#F7F8F9] font-['Urbanist'] flex items-center justify-center">
      <div className="max-w-4xl w-full p-6">
        <Link to="/" className="inline-block mb-8">
          <button className="text-[#6A707C] hover:text-black transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1E232C] mb-3">Welcome Student!</h1>
          <p className="text-[#6A707C]">Access your re-evaluation portal</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[16px] border border-[#DADADA] hover:shadow-lg transition-all hover:border-black">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#F7F8F9] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E232C] mb-2">New Student</h3>
                <p className="text-[#6A707C] text-sm mb-6">
                  Create a new account to submit re-evaluation requests
                </p>
              </div>
              <button className="w-full px-6 py-3 bg-black text-white rounded-[8px] 
                                 hover:bg-gray-800 transition-all" onClick={() => navigate('/search-organization', { state: { role: 'student' } })}>
                Register Now
              </button >
            </div>
          </div>

          <div className="bg-white p-8 rounded-[16px] border border-[#DADADA] hover:shadow-lg transition-all hover:border-black">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#F7F8F9] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E232C] mb-2">Existing Student</h3>
                <p className="text-[#6A707C] text-sm mb-6">
                  Login to check your re-evaluation status
                </p>
              </div>
              <Link to="/student/login" className="w-full">
                <button className="w-full px-6 py-3 border-2 border-black text-black rounded-[8px] 
                                 hover:bg-black hover:text-white transition-all">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-24">
          <p className="text-[#6A707C]">Need help? Contact our support team</p>
          <button className="mt-4 px-6 py-2 text-sm border border-[#DADADA] rounded-[8px] 
                           hover:border-black transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAuth;
