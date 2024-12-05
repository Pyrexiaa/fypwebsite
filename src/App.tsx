import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './auth/firebaseConfig';
import { Layout } from './components/Layout';
import { LoginLayout } from './components/LoginLayout';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { AimodelPage } from './pages/AimodelPage';
import { PasthistoryPage } from './pages/PasthistoryPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
    const [user] = useAuthState(auth);

    return (
        <Router>
            <Routes>
                {/* Redirects */}
                <Route
                    path="/"
                    element={user ? <Navigate to="/homepage" /> : <Navigate to="/login" />}
                />

                {/* Login Route with Layout */}
                <Route
                    path="/login"
                    element={user ? <Navigate to="/homepage" /> : <LoginLayout />}
                >
                    <Route
                        index
                        element={<LoginPage />}
                    />
                </Route>

                {/* Protected Routes (with Layout) */}
                <Route
                    path="/"
                    element={user ? <Layout /> : <Navigate to="/login" />}
                >
                    <Route
                        index
                        element={<Navigate to="/homepage" />} // Redirect to homepage if authenticated
                    />
                    <Route
                        path="homepage"
                        element={<HomePage />}
                    />
                    <Route
                        path="calculator"
                        element={<CalculatorPage />}
                    />
                    <Route
                        path="aimodel"
                        element={<AimodelPage />}
                    />
                    <Route
                        path="pasthistory"
                        element={<PasthistoryPage />}
                    />
                    <Route
                        path="/settings"
                        element={<SettingsPage />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}
