import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/StudentDashboard';
import AdditionModule from './pages/AdditionModule';
import MultiplicationModule from './pages/MultiplicationModule';
import FractionsModule from './pages/FractionsModule';
import ShapesModule from './pages/ShapesModule';
import DivisionModule from './pages/DivisionModule';
import ParentDashboard from './pages/ParentDashboard';
import VeggieHome from './pages/Veggie/VeggieHome';
import VeggieLearn from './pages/Veggie/VeggieLearn';
import VeggieQuiz from './pages/Veggie/VeggieQuiz';
import VeggieRoutine from './pages/Veggie/VeggieRoutine';
import VeggieSupport from './pages/Veggie/VeggieSupport';
import SubtractionModule from './pages/SubtractionModule';
import OddEvenModule from './pages/OddEvenModule';
import { useUserProgress } from './context/UserProgressContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { userId } = useUserProgress();
  const location = useLocation();

  if (!userId) {
    // Redirect to Landing Page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <div className="font-sans antialiased text-soft-charcoal">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/parents" element={<ParentDashboard />} />

        {/* Learning Modules */}
        <Route path="/addition" element={
          <ProtectedRoute>
            <AdditionModule />
          </ProtectedRoute>
        } />
        <Route path="/multiplication" element={
          <ProtectedRoute>
            <MultiplicationModule />
          </ProtectedRoute>
        } />
        <Route path="/fractions" element={
          <ProtectedRoute>
            <FractionsModule />
          </ProtectedRoute>
        } />
        <Route path="/shapes" element={
          <ProtectedRoute>
            <ShapesModule />
          </ProtectedRoute>
        } />
        <Route path="/division" element={
          <ProtectedRoute>
            <DivisionModule />
          </ProtectedRoute>
        } />
        <Route path="/subtraction" element={
          <ProtectedRoute>
            <SubtractionModule />
          </ProtectedRoute>
        } />
        <Route path="/odd-even" element={
          <ProtectedRoute>
            <OddEvenModule />
          </ProtectedRoute>
        } />

        {/* Veggie Module */}
        <Route path="/veggie" element={
          <ProtectedRoute>
            <VeggieHome />
          </ProtectedRoute>
        } />
        <Route path="/veggie/learn" element={
          <ProtectedRoute>
            <VeggieLearn />
          </ProtectedRoute>
        } />
        <Route path="/veggie/quiz" element={
          <ProtectedRoute>
            <VeggieQuiz />
          </ProtectedRoute>
        } />
        <Route path="/veggie/routine" element={
          <ProtectedRoute>
            <VeggieRoutine />
          </ProtectedRoute>
        } />
        <Route path="/veggie/support" element={
          <ProtectedRoute>
            <VeggieSupport />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App;
