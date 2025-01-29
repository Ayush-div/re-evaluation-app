// import './App.css'
// import React from 'react'
// import LandingPage from './components/landing_page.jsx'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import LoginCard from './components/login_page.jsx'
// import AdminDashboard from './components/admin_dashboard.jsx'
// import TeacherDashboard from './components/teacher_dashboard.jsx'
// import Dashboard from './components/student_page.jsx'
// import OtpCard from './components/otp_page.jsx'
// import ForgotPassword from './components/forgot_password.jsx'
// import RegisterCard from './components/register_page.jsx'
// import Dash from './components/dash.jsx'
// function App() {
//   return (
//     <>
//       {/* <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<LandingPage />} />
//           <Route path='/admin' element={<AdminDashboard />} />
//           <Route path='/teacher' element={<TeacherDashboard />} />
//           <Route path='/student' element={<Dashboard />} />/
//           <Route path='/register/login' element={<LoginCard />} />

//         </Routes>
//       </BrowserRouter> */}


//       {/* <Dash/> */}
//       {/* <LoginCard /> */}
//       {/* <OtpCard /> */}
//       {/* <ForgotPassword /> */}
//       <RegisterCard />

//     </>
//   );
// }

// export default App;


import './App.css'
import React from 'react'
import LandingPage from './components/landing_page.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginCard from './components/login_page.jsx'
import AdminDashboard from './components/admin_dashboard.jsx'
import TeacherDashboard from './components/teacher_dashboard.jsx'
import Dashboard from './components/student_page.jsx'
import OtpCard from './components/otp_page.jsx'
import ForgotPassword from './components/forgot_password.jsx'
import RegisterCard from './components/register_page.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/teacher' element={<TeacherDashboard />} />
          <Route path='/student' element={<Dashboard />} />
          <Route path='/login' element={<LoginCard />} />
          <Route path='/register' element={<RegisterCard />} />

        </Routes>
      </BrowserRouter>


      {/* <RegisterCard /> */}
      {/* <LoginCard /> */}
      {/* <OtpCard /> */}
      {/* <ForgotPassword /> */}
    </>
  );
}

export default App;