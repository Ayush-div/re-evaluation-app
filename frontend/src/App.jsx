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
import {AddQuestionPaper} from './components/admin_portal/createQuestionPaper.jsx'
import QuestionPapersPage from './components/admin_portal/questionPapersPage.jsx'

function App() {
  return (
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/search-organization" element={<SearchOrganization />} /> {/* Verify spelling */}

        <Route path="/organization">
          <Route path="register" element={<RegisterOrganization />} />
          <Route path="login" element={<LoginOrganization />} />
          <Route path="organization-auth" element={<OrganizationAuth />} />
          <Route path="question-papers" element={<QuestionPapersPage />} />
          <Route path="create-question-paper" element={<AddQuestionPaper />} />
          <Route path='add-teacher' element={<AddTeacherAdmin />} />
          <Route path='add-student' element={<AddStudentAdmin />} />
          <Route path='generate-report' element={<GenerateReport />} />
          <Route path='generate-report/student-report' element={<StudentPerformanceReport />} />
          <Route path='generate-report/teacher-report' element={<TeacherActivityReport />} />
          <Route path='generate-report/financial-summary' element={<FinancialSummary />} />
          <Route path='added-teacher-success' element={<AddedTeacherSuccessful />} />
          <Route path='added-student-success' element={<AddedStudentSuccessful />} />
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="/student">
          <Route path="login" element={<LoginCardStudent />} />
          <Route path="register" element={<RegisterCardStudent />} />
          <Route path='student-auth' element={<StudentAuth />} />
          <Route path='apply-reevaluation' element={<ReEvaluationForm />} />
          <Route path='check-status' element={<ReEvaluationStatus />} />
          <Route path='question-papers' element={<QuestionPaperViewer />} />
          <Route path='video-solutions' element={<VideoSolutions />} />
          <Route path='answer-sheets' element={<AnswerSheets />} />
          <Route path='registration-successful' element={<RegisterSuccess />} />
          <Route path='forgot-password/verify-otp/create-new-password' element={<CreateNewPasswordPage />} />
          <Route path='forgot-password' element={<ForgotPasswordEmailPage />} />
          <Route path='forgot-password/verify-otp/reset-password' element={<ResetNewPassword />} />
          <Route path='forgot-password/verify-otp' element={<VerifyOtp />} />
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="/teacher">
          <Route path="login" element={<LoginCardTeacher />} />
          <Route path="register" element={<RegisterCardTeacher />} />
          <Route path='teacher-auth' element={<TeacherAuth />} />
          <Route path='forgot-password' element={<ForgotPasswordEmailPage />} />
          <Route path='forgot-password/verify-otp/create-new-password' element={<CreateNewPasswordPage />} />
          <Route path='forget-password/verify-otp' element={<VerifyOtp />} />
          <Route path='forgot-password/verify-otp/reset-password' element={<ResetNewPassword />} />
          <Route index element={<TeacherDashboard />} />
        </Route>

      </Routes>
  );
}

export default App;