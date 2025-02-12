import { div } from 'framer-motion/client'
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Applied',
      details: '03'
    },
    {
      title: 'In Progress',
      details: '01'
    },
    {
      title: 'Completed',
      details: '02'
    },
    {
      title: 'Pending Payment',
      details: '00'
    }
  ]
  const cards = [

    {
      title: 'Apply For Re-evaluation',
      icon: (<svg className="w-8 h-8 text-[#]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>),
      description: 'Submit your application'
      , route: '/student/apply-reevaluation'
    },
    {
      title: 'Check Status',
      description: 'Track your application',
      icon: (<svg className="w-8 h-8 text-[#]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 0 012 2" />
      </svg>)
      , route: '/student/check-status'
    },
    {
      title: 'Question Papers',
      description: 'View papers & answers',
      icon: (<svg className="w-8 h-8 text-[#]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M10 14h4m-4-3h7" />
      </svg>)
      , route: '/student/question-papers'
    },
    {
      title: 'Video Solutions',
      description: 'See Video Solution of your doubt',
      icon: (<svg className="w-8 h-8 text-[#1E232C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      </svg>)
      , route: '/student/video-solutions'
    },
    {
      title: 'Answer Sheets',
      description: 'See Your Answer Sheets',
      icon: (
        <svg className="w-8 h-8 text-[#]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2h-2a2 2 0 01-2-2v0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12h6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 16h4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M16 16h.01" />
        </svg>
      ),
      route: '/student/answer-sheets'
    }
  ]

  return (
    <div className="w-full min-h-screen bg-[#F7F8F9] font-['Urbanist']">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full sticky top-0 z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-[#1E232C]">
              Student Dashboard
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Profile</button>
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Settings</button>
              <button className="text-[#6A707C] hover:text-[#000000] hover:scale-[1.1] duration-300">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-6">
        {/* Greeting Section */}
        <div className="pt-8 pb-6">
          <h1 className="text-2xl font-bold text-[#1E232C]">
            Welcome back, Student! 👋
          </h1>
          <p className="text-[#6A707C] mt-2">
            Here's what you can do with your re-evaluation portal
          </p>
        </div>

        {/* Stats Section */}
        {/* <div className="flex justify-center mb-8 "> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
        {/* <div className='flex gap-12'> */}
        <div className="grid grid-cols- md:grid-cols-2 gap-4 mb-8">
          {
            stats.map((stat, index) => {
              const color = stat.title === 'Pending Payment' ? 'text-green-500' : 'text-[#1E232C]';

              return (
                <div key={index} className="bg-white p-4 rounded-[12px] border border-[#DADADA] hover:shadow-md transition-all">
                  <p className="text-[#6A707C] text-sm ">{stat.title}</p>
                  <p className={`text-2xl font-bold ${color} mt-1`}>{stat.details}</p>
                </div>
              )
            })
          }
        </div>


        {/* Main Options Grid */}

        <div className='flex justify-center'>

          <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8 ">
            {
              cards.map((card, index) =>
                <Link to={card.route} key={index}>
                  <div key={index}
                    className="w-full max-w-[220px] aspect-square bg-white p-4 rounded-[12px] border border-[#DADADA] 
            cursor-pointer select-none
            transition-all duration-300 
                   hover:shadow-lg hover:border-[#000000] hover:scale-[1.02]
                   active:scale-[0.98]"
                  // onClick={() => card.title === 'Apply For Re-evaluation' && navigate('/student/apply-reevaluation')}
                  >
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-[#F7F8F9] flex items-center justify-center mb-3">
                        {card.icon}
                      </div>
                      <h3 className="text-[#1E232C] text-base font-bold mb-1">{card.title}</h3>
                      <p className="text-[#6A707C] text-xs">{card.description}</p>
                    </div>
                  </div>
                </Link>
              )
            }
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-[12px] border border-[#DADADA] p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1E232C] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#F7F8F9] rounded-[8px]">
              <div>
                <p className="text-[#1E232C] font-medium">Mathematics Paper Re-evaluation</p>
                <p className="text-[#6A707C] text-sm">Application submitted</p>
              </div>
              <span className="text-[#000000] text-sm">2 days ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#F7F8F9] rounded-[8px]">
              <div>
                <p className="text-[#1E232C] font-medium">Physics Paper Status</p>
                <p className="text-[#6A707C] text-sm">Result updated</p>
              </div>
              <span className="text-[#000000] text-sm">5 days ago</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-[#FFFFFF] bg-opacity-10 rounded-[12px] p-6 mb-8 border-[#DADADA] border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1E232C] mb-2">Need Help?</h2>
              <p className="text-[#6A707C]">Contact our support team for assistance</p>
            </div>
            <button className="bg-[#000000] text-white px-6 py-2 rounded-[8px] 
                           hover:bg-[#FFFFFF] hover:text-black hover:border-[.69px] transition-colors duration-300">
              Contact Support
            </button>
          </div>
        </div>

        <Outlet /> {/* Add this to render nested routes */}

      </div>
    </div>
  )
}

export default Dashboard
