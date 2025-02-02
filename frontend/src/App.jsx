import './App.css'
import React from 'react'
import Dashboard from './components/student_portal/student_page.jsx'
import TeacherDashboard from './components/teacher_portal/teacher_dashboard.jsx'
import AdminDashboard from './components/admin_portal/organization_dashboard.jsx'
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
import ForgotPasswordEmailPage from './components/forgotPasswordEmailPage.jsx';
import VerifyOtp from './components/VerifyOtp.jsx'
import ResetNewPassword from './components/resetNewPassword.jsx';
import CreateNewPasswordPage from './components/createNewPasswordPage..jsx'
import RegisterCardStudent from './components/student_portal/registerPageStudent.jsx'
import RegisterCardTeacher from './components/teacher_portal/registerPageTeacher.jsx.jsx'
import LoginCardTeacher from './components/teacher_portal/loginPageTeacher.jsx'
import LoginCardStudent from './components/student_portal/loginPageStudent.jsx'
import LoginCard from './components/student_portal/loginPageStudent.jsx'
import SearchOrganization from './components/SearchOrganization.jsx';
import ReviewModal from './components/teacher_portal/ReviewModal.jsx'
import AddedTeacherSuccessful from './components/addTeacherSuccessful.jsx'
import AddedStudentSuccessful from './components/addStudentSuccessful.jsx'
import AddStudentAdmin from './components/admin_portal/addStudentAdmin.jsx'
import AddTeacherAdmin from './components/admin_portal/addTeacherAdmin.jsx'
import RegisterOrganization from './components/admin_portal/registerOrganization.jsx'
import OrganizationAuth from './components/auth/OrganizationAuth.jsx';
import TeacherAuth from './components/auth/TeacherAuth.jsx'
import StudentAuth from './components/auth/StudentAuth.jsx'
import LoginOrganization from './components/admin_portal/LoginOrganization';
import QuestionPaperBuilder from './components/admin_portal/createQuestionPaper.jsx';
import CreateQuestionPaper from './components/admin_portal/createQuestionPaper.jsx'
import AddQuestionPaper from './components/admin_portal/addQuestionPaper.jsx'
// import GoogleSignInButton from './components/googleOauth/googleOauth.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing and Organization Routes */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/search-organization" element={<SearchOrganization />} />
        <Route path="/organization/register" element={<RegisterOrganization />} />
        <Route path="/organization/organization-auth" element={<OrganizationAuth />} />
        <Route path="/organization/login" element={<LoginOrganization />} />

        {/* Student Routes */}
        <Route path="/student/login" element={<LoginCardStudent />} />
        <Route path="/student/register" element={<RegisterCardStudent />} />
        <Route path="/student/*" element={<Dashboard />} />

        {/* Teacher Routes */}
        <Route path="/teacher/login" element={<LoginCardTeacher />} />
        <Route path="/teacher/register" element={<RegisterCardTeacher />} />
        <Route path="/teacher/*" element={<TeacherDashboard />} />

        <Route path='/organization' element={<AdminDashboard />} />
        <Route path='/student/apply-reevaluation' element={<ReEvaluationForm />} />
        <Route path='/student/check-status' element={<ReEvaluationStatus />} />
        <Route path='/admin/add-teacher' element={<AddTeacherAdmin />} />
        <Route path='/admin/add-student' element={<AddStudentAdmin />} />
        <Route path='/admin/generate-report' element={<GenerateReport />} />
        <Route path='/admin/generate-report/student-report' element={<StudentPerformanceReport />} />
        <Route path='/admin/generate-report/teacher-report' element={<TeacherActivityReport />} />
        <Route path='/admin/generate-report/financial-summary' element={<FinancialSummary />} />
        <Route path='/student/question-papers' element={<QuestionPaperViewer />} />
        <Route path='/student/video-solutions' element={<VideoSolutions />} />
        <Route path='/student/answer-sheets' element={<AnswerSheets />} />
        <Route path='/student/registration-successful' element={<RegisterSuccess />} />
        <Route path='/admin/added-teacher-success' element={<AddedTeacherSuccessful />} />
        <Route path='/admin/added-student-success' element={<AddedStudentSuccessful />} />
        <Route path='/student/forgot-password' element={<ForgotPasswordEmailPage />} />
        <Route path='/teacher/forgot-password' element={<ForgotPasswordEmailPage />} />
        <Route path='/student/forgot-password/verify-otp/create-new-password' element={<CreateNewPasswordPage />} />
        <Route path='/teacher/forgot-password/verify-otp/create-new-password' element={<CreateNewPasswordPage />} />
        <Route path='/student/forgot-password/verify-otp' element={<VerifyOtp />} />
        <Route path='/teacher/forget-password/verify-otp' element={<VerifyOtp />} />
        <Route path='/student/forgot-password/verify-otp/reset-password' element={<ResetNewPassword />} />
        <Route path='/teacher/forgot-password/verify-otp/reset-password' element={<ResetNewPassword />} />
        <Route path='/modal' element={<ReviewModal />} />
        <Route path='/teacher/teacher-auth' element={<TeacherAuth />} />
        <Route path='/student/student-auth' element={<StudentAuth />} />
        <Route path="/organization/add-question-paper" element={<AddQuestionPaper />} />
        <Route path="/organization/create-question-paper" element={<CreateQuestionPaper />} />

        {/* <Route path='/google-button' element={<GoogleSignInButton />} /> */}

      </Routes>
      <Routes>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
