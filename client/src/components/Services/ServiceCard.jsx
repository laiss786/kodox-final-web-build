// src/components/Services/ServiceCard.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

export default function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: 'rgba(10,10,30,0.7)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${expanded ? service.color + '40' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 16, padding: '2rem',
        cursor: 'pointer',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        boxShadow: expanded ? `0 8px 40px ${service.glow}` : 'none',
        transform: expanded ? 'translateY(-4px)' : 'none',
      }}
      onClick={() => setExpanded(!expanded)}
      whileHover={{ y: -4, boxShadow: `0 8px 40px ${service.glow}` }}
    >
      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: `linear-gradient(135deg, ${service.color}20, ${service.color}40)`,
        border: `1px solid ${service.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.25rem',
        transition: 'background 0.3s',
      }}>
        <Icon size={22} style={{ color: service.color }} />
      </div>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <span style={{
            display: 'inline-block', fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem', color: service.color, letterSpacing: '0.08em',
            marginBottom: '0.4rem',
          }}>
            {service.tagline}
          </span>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '1.25rem', color: '#f1f5f9',
          }}>
            {service.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: '#475569', flexShrink: 0, marginTop: 4 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>

      <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '0.75rem' }}>
        {service.description}
      </p>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: '1.5rem', paddingTop: '1.5rem',
              borderTop: `1px solid ${service.color}20`,
            }}>
              <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {service.details.map((detail) => (
                  <li key={detail} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                    <CheckCircle2 size={14} style={{ color: service.color, flexShrink: 0, marginTop: 2 }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
