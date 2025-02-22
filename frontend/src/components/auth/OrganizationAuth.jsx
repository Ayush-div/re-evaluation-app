import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const OrganizationAuth = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const orgData = location.state?.organization || JSON.parse(localStorage.getItem('selectedOrg'));
  useEffect(() => {
    console.log(orgData ? 'Organization data available:' : 'No organization data found');
    console.log(orgData)
  }, [orgData]);

  return (
    <div className="h-full flex justify-center font-['Urbanist'] bg-[#F7F8F9] ">
      <div className="flex flex-col gap-4 max-w-4xl w-full p-6 ">
        <Link to="/" className="text-[#6A707C] hover:text-black transition-all flex items-center gap-2 mb-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words mb-12 text-center">
          <h1 className="mb-2">Welcome to Re-evaluation Portal</h1>
          <p className="text-[#6A707C] text-lg font-normal">Choose an option to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[16px] border border-[#DADADA] hover:shadow-lg transition-all hover:border-black">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#F7F8F9] flex items-center justify-center">
                <svg className="w-8 h-8 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E232C] mb-2">Register Organization</h3>
                <p className="text-[#6A707C] text-sm mb-6">
                  Create a new account for your educational institution
                </p>
              </div>
              <button className="w-full px-6 py-3 bg-black text-white rounded-[8px] 
                                 hover:bg-gray-800 transition-all" onClick={() => navigate('/organization/register')}>
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
                <h3 className="text-xl font-bold text-[#1E232C] mb-2">Login to Dashboard</h3>
                <p className="text-[#6A707C] text-sm mb-6">
                  Access your organization's dashboard
                </p>
              </div>
              <Link to="/organization/login" className="w-full">
                <button className="w-full px-6 py-3 border-2 border-black text-black rounded-[8px] 
                                 hover:bg-black hover:text-white transition-all">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
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

export default OrganizationAuth;
