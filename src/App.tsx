import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroSlider from './components/IntroSlider';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Academy from './pages/Academy';
import Models from './pages/Models';
import Brands from './pages/Brands';
import Join from './pages/Join';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import CampaignDashboard from './pages/CampaignDashboard';
import { Shield } from 'lucide-react';

// ─── Simple Admin Password Gate ───────────────────────────────────────────────
// Change ADMIN_PASSWORD to whatever you want
const ADMIN_PASSWORD = 'royale2025';

const AdminGate: React.FC = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === 'true');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authed', 'true');
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setPw('');
      setTimeout(() => setShake(false), 500);
    }
  };

  if (authed) return <Admin />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div
        className={`bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm transition-all ${shake ? 'animate-bounce' : ''}`}
        style={shake ? { animation: 'shake 0.4s ease' } : {}}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-blue-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Access</h1>
          <p className="text-sm text-gray-500 mt-1">ROYALE DOXA Dashboard</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              autoFocus
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                error ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {error && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <span>✕</span> Incorrect password. Try again.
              </p>
            )}
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-blue-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            Enter Dashboard
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Session expires when browser tab is closed
        </p>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) setShowIntro(false);
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroSlider onComplete={handleIntroComplete} />;
  }

  return (
    <Router>
      <Routes>
        {/* Public routes inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="academy" element={<Academy />} />
          <Route path="models" element={<Models />} />
          <Route path="brands" element={<Brands />} />
          <Route path="join" element={<Join />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin — password protected */}
        <Route path="/admin" element={<AdminGate />} />

        {/* Campaign dashboard */}
        <Route path="/campaigns" element={<CampaignDashboard />} />

        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;