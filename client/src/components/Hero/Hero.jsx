// src/components/Hero/Hero.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Code2, Cpu, Wifi } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import { useEffect, useState, useRef } from 'react';

// Animated counter
function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '', label: 'Core Services' },
  { value: 1, suffix: '', label: 'Year Since Launch' },
];

const serviceIcons = [
  { icon: <Code2 size={16} />, label: 'Web Dev' },
  { icon: <Cpu size={16} />, label: 'IT Solutions' },
  { icon: <Wifi size={16} />, label: 'IoT' },
];

// Typing animation words
const words = ['Smarter Future.', 'Digital Growth.', 'Better Solutions.', 'Real Results.'];

function TypedWord() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span style={{ color: '#06b6d4' }}>
      {displayed}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden', paddingTop: '80px',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.08) 0%, transparent 50%)',
      }} />
      <ParticleCanvas />

      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 500, height: 500,
                    borderRadius: '50%', background: 'rgba(124,58,237,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 400, height: 400,
                    borderRadius: '50%', background: 'rgba(6,182,212,0.05)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 820 }}>
          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}
          >
            {serviceIcons.map(({ icon, label }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.3rem 0.8rem', borderRadius: 50,
                background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)',
                color: '#a78bfa', fontSize: '0.78rem', fontFamily: "'JetBrains Mono', monospace",
              }}>
                {icon} {label}
              </span>
            ))}
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Smart Digital Solutions<br />
            for a <TypedWord />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#94a3b8', maxWidth: 560, marginBottom: '2.5rem', lineHeight: 1.8,
            }}
          >
            Kodox Technologies builds future-ready digital products — from blazing-fast websites and custom web applications to IoT systems and enterprise IT solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}
          >
            <Link to="/services" className="btn-primary">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '2rem', maxWidth: 560,
            }}
          >
            {stats.map(({ value, suffix, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: '2rem', lineHeight: 1,
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  marginBottom: '0.3rem',
                }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div style={{ color: '#64748b', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          color: '#475569', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.1em', cursor: 'pointer', zIndex: 1,
        }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        SCROLL
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
