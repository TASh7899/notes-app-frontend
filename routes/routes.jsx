import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import EditorPage from '../pages/EditorPage.jsx';

import Protected from '../components/protectedRoute/Protected.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<Protected/>}>
      <Route path="/editor" element={<EditorPage />} />
      </Route>

    </Routes>
  )
}
