import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { AimodelPage } from './pages/AimodelPage';
import { PasthistoryPage } from './pages/PasthistoryPage';

export function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<LoginPage />} // Default content for "/"
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
                </Route>
                <Route
                    path="/settings"
                    element={<div>Settings Page</div>}
                />
            </Routes>
        </Router>
    );
}
