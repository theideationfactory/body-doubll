import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { TimerProvider } from './context/TimerContext';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { SkillScoreboard } from './pages/SkillScoreboard';
import { NewNeeds } from './pages/NewNeeds';
import { GoTimer } from './pages/GoTimer';
import { Doubll } from './pages/Doubll';
import { FindDoubll } from './pages/FindDoubll';
import { FindClient } from './pages/FindClient';
import { Privacy } from './pages/Privacy';
import { OverallRecord } from './pages/OverallRecord';
import { MoodTracker } from './pages/MoodTracker';
import { MoodLog } from './pages/MoodLog';
import { BagChecklist } from './pages/BagChecklist';
import { SymptomSupport } from './pages/SymptomSupport';
import { PersistentTimer } from './components/timer/PersistentTimer';
import { PrivateRoute } from './components/auth/PrivateRoute';

// Your Google OAuth client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "1033926245533-6ugc2t6q5lncr7nmnpkadulovu1m08ro.apps.googleusercontent.com";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <TimerProvider>
          <Router>
            <PersistentTimer />
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Protected Routes */}
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/skills" element={<PrivateRoute><SkillScoreboard /></PrivateRoute>} />
              <Route path="/new-needs" element={<PrivateRoute><NewNeeds /></PrivateRoute>} />
              <Route path="/timer" element={<PrivateRoute><GoTimer /></PrivateRoute>} />
              <Route path="/doubll" element={<PrivateRoute><Doubll /></PrivateRoute>} />
              <Route path="/find-doubll" element={<PrivateRoute><FindDoubll /></PrivateRoute>} />
              <Route path="/find-client" element={<PrivateRoute><FindClient /></PrivateRoute>} />
              <Route path="/overall-record" element={<PrivateRoute><OverallRecord /></PrivateRoute>} />
              <Route path="/mood" element={<PrivateRoute><MoodTracker /></PrivateRoute>} />
              <Route path="/mood/log" element={<PrivateRoute><MoodLog /></PrivateRoute>} />
              <Route path="/bag-checklist" element={<PrivateRoute><BagChecklist /></PrivateRoute>} />
              <Route path="/symptoms" element={<PrivateRoute><SymptomSupport /></PrivateRoute>} />
            </Routes>
          </Router>
        </TimerProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}