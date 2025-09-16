import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="academy" element={<Academy />} />
          <Route path="models" element={<Models />} />
          <Route path="brands" element={<Brands />} />
          <Route path="join" element={<Join />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/campaigns" element={<CampaignDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;