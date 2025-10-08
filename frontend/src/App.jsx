import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentAuth from './pages/StudentAuth';
import StudentDashboard from './pages/StudentDashBoard';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentAuth />} />
        <Route path="/Studentdashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
