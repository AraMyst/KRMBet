// src/routes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SportsPage from './pages/SportsPage';
import CasinoPage from './pages/CasinoPage';
import PromotionPage from './pages/PromotionPage';
import PromotionDetailPage from './pages/PromotionDetailPage';
import PaymentPage from './pages/PaymentPage';
import ChatWindow from './Chat/ChatWindow';
import AccountDetails from './Account/AccountDetails';
import BetsHistory from './Account/BetsHistory';
import Verification from './Account/Verification';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './Common/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/sports" element={<SportsPage />} />
    <Route path="/casino" element={<CasinoPage />} />
    <Route path="/promotions" element={<PromotionPage />} />
    <Route path="/promotions/:id" element={<PromotionDetailPage />} />
    <Route path="/payment" element={<PaymentPage />} />
    <Route path="/chat" element={<ChatWindow />} />

    {/* Protected routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/account/details"
      element={
        <ProtectedRoute>
          <AccountDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path="/account/bets"
      element={
        <ProtectedRoute>
          <BetsHistory />
        </ProtectedRoute>
      }
    />
    <Route
      path="/account/verify"
      element={
        <ProtectedRoute>
          <Verification />
        </ProtectedRoute>
      }
    />

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
