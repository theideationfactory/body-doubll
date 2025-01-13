import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { CreateDoubllProfile } from './pages/CreateClientProfile';
import { CreateClientProfile } from './pages/CreateDoubllProfile';
import { ViewMatches } from './pages/ViewMatches';
import { MatchRequests } from './pages/MatchRequests';
import { Privacy } from './pages/Privacy';
import { OverallRecord } from './pages/OverallRecord';
import { MoodTracker } from './pages/MoodTracker';
import { MoodLog } from './pages/MoodLog';
import { BagChecklist } from './pages/BagChecklist';
import { SymptomSupport } from './pages/SymptomSupport';
import { Chat } from './pages/Chat';
import { DirectMessages } from './pages/DirectMessages';
import { PersistentTimer } from './components/timer/PersistentTimer';
import { PrivateRoute } from './components/auth/PrivateRoute';

export default function App() {
  return (
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
            <Route path="/create-doubll-profile" element={<PrivateRoute><CreateDoubllProfile /></PrivateRoute>} />
            <Route path="/create-client-profile" element={<PrivateRoute><CreateClientProfile /></PrivateRoute>} />
            <Route path="/match-requests" element={<PrivateRoute><MatchRequests /></PrivateRoute>} />
            <Route path="/view-matches" element={<PrivateRoute><ViewMatches /></PrivateRoute>} />
            <Route path="/overall-record" element={<PrivateRoute><OverallRecord /></PrivateRoute>} />
            <Route path="/mood" element={<PrivateRoute><MoodTracker /></PrivateRoute>} />
            <Route path="/mood/log" element={<PrivateRoute><MoodLog /></PrivateRoute>} />
            <Route path="/bag-checklist" element={<PrivateRoute><BagChecklist /></PrivateRoute>} />
            <Route path="/symptoms" element={<PrivateRoute><SymptomSupport /></PrivateRoute>} />
            <Route path="/chat/:matchId" element={<Chat />} />
            <Route path="/direct-messages" element={<DirectMessages />} />
          </Routes>
        </Router>
      </TimerProvider>
    </AuthProvider>
  );
}