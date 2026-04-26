// src/components/Navbar/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          background: scrolled ? 'rgba(5,5,15,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(124,58,237,0.15)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: '1.1rem', letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #f1f5f9, #a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              KODOX<span style={{ color: '#06b6d4', WebkitTextFillColor: '#06b6d4' }}> TECHNOLOGIES</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
               className="nav-desktop">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    position: 'relative',
                    padding: '0.5rem 1rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500, fontSize: '0.9rem',
                    color: active ? '#a78bfa' : '#94a3b8',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    borderRadius: 8,
                  }}
                  onMouseEnter={(e) => { if (!active) e.target.style.color = '#f1f5f9'; }}
                  onMouseLeave={(e) => { if (!active) e.target.style.color = '#94a3b8'; }}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute', bottom: 2, left: '50%', translateX: '-50%',
                        width: 4, height: 4, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
            <Link to="/contact" className="btn-primary" style={{ marginLeft: '0.5rem', padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="nav-mobile-btn"
            style={{
              background: 'none', border: 'none', color: '#f1f5f9',
              padding: '0.5rem', borderRadius: 8, cursor: 'pointer',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 850,
              background: 'rgba(5,5,20,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(124,58,237,0.2)',
              padding: '1.5rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.path}
                  style={{
                    display: 'block', padding: '0.85rem 0',
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                    color: location.pathname === link.path ? '#a78bfa' : '#94a3b8',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '1.05rem',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/contact" className="btn-primary" style={{ marginTop: '1.5rem', display: 'block', textAlign: 'center' }}>
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-mobile-btn { display: none; }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
