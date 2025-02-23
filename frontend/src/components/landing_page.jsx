import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (roleType) => {
    console.log(`${roleType}/${roleType}-auth`)
    navigate(`${roleType}/${roleType}-auth`, { 
      state: { role: roleType } 
    });
  };

  const roles = [
    {
      title: "Exam Cell",
      description: "Manage your institution's re-evaluation system",
      icon: (
        <svg className="w-12 h-12 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      onClick: () => handleRoleSelect('organization')
    },
    {
      title: "Teacher",
      description: "Review and manage student re-evaluations",
      icon: (
        <svg className="w-12 h-12 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ), 
      onClick: () => handleRoleSelect('teacher') 
    },
    {
      title: "Student",
      description: "Apply for paper re-evaluation",
      icon: (
        <svg className="w-12 h-12 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      onClick: () => handleRoleSelect('student') 
    }
  ]

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Re-evaluation Portal
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">About</button>
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Contact</button>
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Help</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center pt-16 pb-12">
          <h1 className="text-4xl font-bold text-[#1E232C] mb-4">
            Welcome to Re-evaluation Portal
          </h1>
          <p className="text-[#6A707C] text-lg max-w-2xl mx-auto">
            Choose how you want to access the portal. Select your role to continue.
          </p>
        </div>


        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto pb-16">
          {roles.map((role, index) => (
            <div
              key={index}
              onClick={role.onClick} 
              className="group bg-white p-8 rounded-[16px] border border-[#DADADA] 
                        cursor-pointer select-none
                        transition-all duration-300 
                        hover:shadow-lg hover:border-[#000000] hover:scale-[1.02]
                        active:scale-[0.98]"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#F7F8F9] flex items-center justify-center 
                            group-hover:bg-black group-hover:text-white transition-all duration-300 hover:scale-[1.1]">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1E232C]">{role.title}</h3>
                <p className="text-[#6A707C] text-[14px] h-12">{role.description}</p>
                <div className="mt-4">
                  <button className="px-6 py-2 bg-black text-white rounded-[8px] 
                                transition-all duration-300
                                hover:bg-gray-800 hover:scale-[1.02]
                                active:scale-[0.98] ">
                    Continue as {role.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#DADADA] py-8 text-center">
          <p className="text-[#6A707C]">
            Need help? Contact our support team
          </p>
          <button className="mt-4 px-6 py-2 border border-[#DADADA] rounded-[8px] text-[#1E232C]
                          transition-all duration-300
                          hover:border-black hover:shadow-md">
            Contact Support
          </button>
        </div>

      </div>
    </div>
  )
}

export default LandingPage
