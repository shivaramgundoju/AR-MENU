import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import ARViewPage from './pages/ARViewPage';
import WhyChooseUs from './components/WhyChooseUs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/ar/:dishId" element={<ARViewPage />} />
            <Route path="/about" element={<WhyChooseUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;