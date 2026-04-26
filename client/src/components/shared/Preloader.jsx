// src/components/shared/Preloader.jsx
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#05050f',
               display: 'flex', flexDirection: 'column', alignItems: 'center',
               justifyContent: 'center', gap: '2rem' }}
    >
      {/* Animated rings */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <motion.div
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid rgba(124,58,237,0.3)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          style={{
            position: 'absolute', inset: 8, borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#7c3aed',
            borderRightColor: '#06b6d4',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1rem', fontWeight: 700,
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>K</div>
      </div>

      {/* Logo text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem',
          fontWeight: 700, letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        KODOX TECHNOLOGIES
      </motion.div>

      {/* Progress bar */}
      <div style={{ width: 200, height: 2, background: 'rgba(124,58,237,0.15)', borderRadius: 1, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #06b6d4)', borderRadius: 1 }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  );
}
