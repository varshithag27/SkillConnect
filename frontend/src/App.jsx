import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentAuth from './pages/StudentAuth';
import StudentDashboard from './pages/StudentDashBoard';
import CompanyAuth from './pages/CompanyAuth';
import CompanyDashboard from './pages/CompanyDashBoard';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashBoard';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentAuth />} />
        <Route path="/Studentdashboard" element={<StudentDashboard />} />
        <Route path="/CompanyAuth" element={<CompanyAuth />} />
        <Route path="/Companydashboard" element={<CompanyDashboard />} />
        <Route path="/AdminAuth" element={<AdminAuth />} />
      </Routes>
    </Router>
  )
}

export default App
