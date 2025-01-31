import './App.css'
import React from 'react'
import Dashboard from './components/student_page.jsx'
import TeacherDashboard from './components/teacher_dashboard.jsx'
import AdminDashboard from './components/admin_dashboard.jsx'
import LandingPage from './components/landing_page.jsx'
import AddTeacher from './components/registerPageTeacher.jsx.jsx'
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
// import RegisterCard from './components/register_page.jsx'
import RegisterCardStudent from './components/registerPageStudent.jsx'
import RegisterCardTeacher from './components/registerPageTeacher.jsx.jsx'

import LoginCardTeacher from './components/loginPageTeacher.jsx'
import LoginCardStudent from './components/loginPageStudent.jsx'
import { googleLogout, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import ForgotPasswordEmailPage from './components/forgotPasswordEmailPage.jsx';
import VerifyOtp from './components/VerifyOtp.jsx'
import ResetNewPassword from './components/resetNewPassword.jsx';
import CreateNewPasswordPage from './components/createNewPasswordPage..jsx'
import AddedTeacherSuccessful from './components/addTeacherSuccessful.jsx'
import AddedStudentSuccessful from './components/addStudentSuccessful.jsx'
import AddStudentAdmin from './components/addStudentAdmin.jsx'
import AddTeacherAdmin from './components/addTeacherAdmin.jsx'

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
          <Route path='/admin/add-teacher' element={<AddTeacherAdmin />} />
          <Route path='/admin/add-student' element={<AddStudentAdmin />} />
          <Route path='/admin/generate-report' element={<GenerateReport />} />
          <Route path='/admin/generate-report/student-report' element={<StudentPerformanceReport />} />
          <Route path='/admin/generate-report/teacher-report' element={<TeacherActivityReport />} />
          <Route path='/admin/generate-report/financial-summary' element={<FinancialSummary />} />
          <Route path='/student/question-papers' element={<QuestionPaperViewer />} />
          <Route path='/student/video-solutions' element={<VideoSolutions />} />
          <Route path='/student/answer-sheets' element={<AnswerSheets />} />
          <Route path='/student/register' element={<RegisterCardStudent />} />
          <Route path='/teacher/register' element={<RegisterCardTeacher />} />
          <Route path='/student/login' element={<LoginCardStudent />} />
          <Route path='/teacher/login' element={<LoginCardTeacher />} />
          <Route path='/student/registration-successful' element={<RegisterSuccess />} />
          <Route path='/admin/added-teacher-success' element={<AddedTeacherSuccessful />} />
          <Route path='/admin/added-student-success' element={<AddedStudentSuccessful />} />
          <Route path='/student/forgot-password' element={<ForgotPasswordEmailPage />} />
          <Route path='/teacher/forgot-password' element={<ForgotPasswordEmailPage />} />
          <Route path='/forgot' element={<CreateNewPasswordPage />} />
          <Route path='/student/forgot-password/verify-otp' element={<VerifyOtp />} />
          <Route path='/teacher/forget-password/verify-otp' element={<VerifyOtp />} />
          <Route path='/student/forgot-password/verify-otp/reset-password' element={<ResetNewPassword />} />
          <Route path='/teacher/forgot-password/verify-otp/reset-password' element={<ResetNewPassword />} />
        </Routes>
      </BrowserRouter>
      {/* <ResetPassword/> */}
      {/* <OtpCard/> */}
    </GoogleOAuthProvider>
  );
}

export default App;
