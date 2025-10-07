import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentAuth from './pages/StudentAuth';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentAuth />} />
      </Routes>
    </Router>
  )
}

export default App
