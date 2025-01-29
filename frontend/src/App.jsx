import './App.css'
import React from 'react'
import Dashboard from './components/student_page.jsx'
import TeacherDashboard from './components/teacher_dashboard.jsx'
import AdminDashboard from './components/admin_dashboard.jsx'
import LandingPage from './components/landing_page.jsx'
import AddTeacher from './components/add_teacher.jsx'
import GenerateReport from './components/generate_report.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentPerformanceReport from './components/reports/student_performance_report.jsx'
import TeacherActivityReport from './components/reports/teacher_activity_report.jsx'
import FinancialSummary from './components/reports/financial_summary.jsx'
import ReEvaluationForm from './components/ReEvaluationForm.jsx'
import ReEvaluationStatus from './components/ReEvaluationStatus.jsx'
import QuestionPaperViewer from './components/QuestionPaperViewer.jsx'
import VideoSolutions from './components/VideoSolutions.jsx'
import AnswerSheets from './components/AnswerSheets.jsx'
import RegisterSuccess from './components/RegisterSuccess.jsx'
import RegisterCard from './components/register_page.jsx'
import LoginCard from './components/login_page.jsx'
import { googleLogout, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import ForgotPasswordEmail from './components/ForgotPasswordEmail';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';
import OtpCard from './components/otp_page.jsx'
import ForgotPassword from './components/forgot_password.jsx'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/teacher' element={<TeacherDashboard />} />
          <Route path='/student/apply-reevaluation' element={<ReEvaluationForm />} />
          <Route path='/student/check-status' element={<ReEvaluationStatus />} />
          <Route path='/student' element={<Dashboard />} />
          <Route path='/admin/add-teacher' element={<AddTeacher />} />
          <Route path='/admin/generate-report' element={<GenerateReport />} />
          <Route path='/admin/generate-report/student-report' element={<StudentPerformanceReport />} />
          <Route path='/admin/generate-report/teacher-report' element={<TeacherActivityReport />} />
          <Route path='/admin/generate-report/financial-summary' element={<FinancialSummary />} />
          <Route path='/student/question-papers' element={<QuestionPaperViewer />} />
          <Route path='/student/video-solutions' element={<VideoSolutions />} />
          <Route path='/student/answer-sheets' element={<AnswerSheets />} />
          <Route path='/register' element={<RegisterCard />} />
          <Route path='/login' element={<LoginCard />} />
          <Route path='/register-success' element={<RegisterSuccess />} />


          <Route path='/forgot-password' element={<ForgotPasswordEmail />} />
          <Route path='/forgot' element={<ForgotPassword />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      {/* <ResetPassword/> */}
      {/* <OtpCard/> */}
    </GoogleOAuthProvider>
  );
}

export default App;
