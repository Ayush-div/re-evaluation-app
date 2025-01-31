import './App.css'
import React from 'react'
import Dashboard from './components/student_portal/student_page.jsx'
import TeacherDashboard from './components/teacher_portal/teacher_dashboard.jsx'
import AdminDashboard from './components/admin_portal/admin_dashboard.jsx'
import LandingPage from './components/landing_page.jsx'
import AddTeacher from './components/teacher_portal/registerPageTeacher.jsx.jsx'
import GenerateReport from './components/admin_portal/generate_report.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FinancialSummary from '../src/components/admin_portal/reports/financial_summary.jsx'
import TeacherActivityReport from '../src/components/admin_portal/reports/teacher_activity_report.jsx'
import StudentPerformanceReport from '../src/components/admin_portal/reports/student_performance_report.jsx'
import ReEvaluationForm from './components/student_portal/ReEvaluationForm.jsx'
import ReEvaluationStatus from './components/student_portal/ReEvaluationStatus.jsx'
import QuestionPaperViewer from './components/student_portal/QuestionPaperViewer.jsx'
import VideoSolutions from './components/student_portal/VideoSolutions.jsx'
import AnswerSheets from './components/student_portal/AnswerSheets.jsx'
import RegisterSuccess from './components/RegisterSuccess.jsx'
import RegisterCardStudent from './components/student_portal/registerPageStudent.jsx'
import RegisterCardTeacher from './components/teacher_portal/registerPageTeacher.jsx.jsx'
import LoginCardTeacher from './components/teacher_portal/loginPageTeacher.jsx'
import LoginCardStudent from './components/student_portal/loginPageStudent.jsx'
import LoginCard from './components/student_portal/loginPageStudent.jsx'
import ForgotPasswordEmail from './components/ForgotPasswordEmail';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';
import OtpCard from './components/otp_page.jsx'
import ForgotPassword from './components/forgot_password.jsx'
import SearchOrganization from './components/SearchOrganization.jsx';
import ReviewModal from './components/teacher_portal/ReviewModal.jsx'
import AddedTeacherSuccessful from './components/addTeacherSuccessful.jsx'
import AddedStudentSuccessful from './components/addStudentSuccessful.jsx'
import AddStudentAdmin from './components/admin_portal/addStudentAdmin.jsx'
import AddTeacherAdmin from './components/admin_portal/addTeacherAdmin.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/search-organisation' element={<SearchOrganization />} />
        <Route path='/modal' element={<ReviewModal />} />


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
        {/* <Route path='/student/register-success' element={<RegisterSuccess />} /> */}
        <Route path='/admin/added-teacher-success' element={<AddedTeacherSuccessful />} />
        <Route path='/admin/added-student-success' element={<AddedStudentSuccessful />} />
        <Route path='/forgot-password' element={<ForgotPasswordEmail />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
