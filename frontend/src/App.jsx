import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentAuth from './pages/StudentAuth';
import StudentDashboard from './pages/StudentDashBoard';
import CompanyAuth from './pages/CompanyAuth';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentAuth />} />
        <Route path="/Studentdashboard" element={<StudentDashboard />} />
        <Route path="/CompanyAuth" element={<CompanyAuth />} />
      </Routes>
    </Router>
  )
}

export default App
