import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      
    </Routes>
  )
}
