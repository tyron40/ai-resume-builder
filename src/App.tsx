import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import EditResume from './pages/EditResume';
import ViewResume from './pages/ViewResume';
import { FileCheck } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="flex items-center text-blue-600 font-bold text-xl">
                <FileCheck className="mr-2" /> AI Resume Builder
              </a>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a href="/dashboard" className="text-gray-700 hover:text-blue-600">
                      My Resumes
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateResume />} />
            <Route path="/edit/:id" element={<EditResume />} />
            <Route path="/view/:id" element={<ViewResume />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;