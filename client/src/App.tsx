// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import SkillListing from "./pages/SkillListing";
import ExchangeRequests from "./pages/ExchangeRequests";
import AIMatches from "./pages/AIMatches";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/skills" element={<SkillListing />} />
        <Route path="/exchanges" element={<ExchangeRequests />} />
        <Route path="/ai-matches" element={<AIMatches />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



