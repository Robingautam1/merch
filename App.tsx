import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { CustomCursor } from './components/CustomCursor';
import { LandingPage } from './pages/LandingPage';
import { CatalogPage } from './pages/CatalogPage';
import { CustomizerPage } from './pages/CustomizerPage';
import { CheckoutPage } from './pages/CheckoutPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-background min-h-screen text-white font-sans antialiased selection:bg-accent selection:text-black">
        <CustomCursor />
        <Navbar />
        <CartDrawer />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<CustomizerPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="py-12 border-t border-border text-center text-gray-500 text-sm">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; 2024 The Art of Merchandise. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                </div>
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;