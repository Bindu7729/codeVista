import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import DashboardPage from './features/dashboard/DashboardPage';
import LibraryPage from './features/library/LibraryPage';
import EditorPage from './features/editor/EditorPage';
import DocsPage from './features/docs/DocsPage';
import ProfilePage from './features/profile/ProfilePage';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core Marketing Infrastructure paths */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dynamic App Shell Framework paths */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Catch-all Redirection boundary */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}