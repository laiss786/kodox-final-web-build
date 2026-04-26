// src/pages/Portfolio.jsx
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData, categories } from '../utils/portfolioData';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#0a0a20',
            border: `1px solid ${project.accent}30`,
            borderRadius: 20, maxWidth: 560, width: '100%',
            overflow: 'hidden',
            boxShadow: `0 25px 80px ${project.accent}20`,
          }}
        >
          {/* Image area */}
          <div style={{
            height: 220, background: project.imageGradient,
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 700,
              color: 'rgba(255,255,255,0.15)', letterSpacing: '-0.02em', textAlign: 'center', padding: '0 2rem',
            }}>
              {project.title}
            </div>
            {/* Close */}
            <button onClick={onClose} style={{
              position: 'absolute', top: '1rem', right: '1rem',
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)', border: 'none', color: '#94a3b8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              <X size={16} />
            </button>
            {/* Category badge */}
            <span style={{
              position: 'absolute', bottom: '1rem', left: '1rem',
              background: `${project.accent}25`, border: `1px solid ${project.accent}50`,
              color: project.accent, padding: '0.25rem 0.75rem', borderRadius: 50,
              fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace",
            }}>
              {project.category}
            </span>
          </div>

          {/* Content */}
          <div style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', marginBottom: '1rem' }}>
              {project.title}
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {project.description}
            </p>
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0.25rem 0.65rem', borderRadius: 50,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#64748b', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace",
                }}>
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {project.liveUrl && project.liveUrl !== '#' && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.65rem 1.5rem' }}>
                  View Live <ExternalLink size={14} />
                </a>
              )}
              <button onClick={onClose} className="btn-outline" style={{ fontSize: '0.85rem', padding: '0.65rem 1.5rem' }}>
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, onClick, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onClick(project)}
      style={{
        background: 'rgba(10,10,30,0.7)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16, overflow: 'hidden',
        cursor: 'pointer', transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${project.accent}50`;
        e.currentTarget.style.boxShadow = `0 12px 40px ${project.accent}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div style={{
        height: 180, background: project.imageGradient,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', fontWeight: 700,
          color: 'rgba(255,255,255,0.12)', textAlign: 'center', padding: '0 1rem',
        }}>
          {project.title}
        </div>
        {project.featured && (
          <span style={{
            position: 'absolute', top: '0.75rem', left: '0.75rem',
            background: 'rgba(124,58,237,0.8)', color: '#fff',
            padding: '0.2rem 0.6rem', borderRadius: 50,
            fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace",
          }}>FEATURED</span>
        )}
        <span style={{
          position: 'absolute', bottom: '0.75rem', right: '0.75rem',
          background: `${project.accent}20`, border: `1px solid ${project.accent}40`,
          color: project.accent,
          padding: '0.2rem 0.6rem', borderRadius: 50,
          fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace",
        }}>{project.category}</span>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          fontSize: '1rem', marginBottom: '0.5rem', color: '#f1f5f9',
        }}>
          {project.title}
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              padding: '0.2rem 0.5rem', borderRadius: 50,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
              color: '#475569', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace",
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = active === 'All' ? portfolioData : portfolioData.filter((p) => p.category === active);

  return (
    <>
      <Helmet>
        <title>Portfolio — Kodox Technologies</title>
        <meta name="description" content="Browse Kodox Technologies' portfolio of web development, digital marketing, IoT, and IT projects delivered across India." />
      </Helmet>

      {/* Page hero */}
      <section style={{ paddingTop: 140, paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(6,182,212,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label">Our Work</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.5rem' }}>
              Projects We're <span className="gradient-text">Proud Of</span>
            </h1>
            <p style={{ color: '#94a3b8', maxWidth: 550, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.8 }}>
              A curated showcase of the work we've done across web development, digital marketing, IoT, and IT solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: '0.55rem 1.3rem', borderRadius: 50,
                  border: active === cat ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.08)',
                  background: active === cat ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
                  color: active === cat ? '#a78bfa' : '#64748b',
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '0.88rem',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
          >
            <AnimatePresence>
              {filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} onClick={setSelected} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#475569' }}>
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'rgba(5,5,20,0.6)', paddingTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimateOnScroll>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1rem' }}>
              Have a project in mind?
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Let's add it to this portfolio.</p>
            <Link to="/contact" className="btn-primary">
              Start a Project <ArrowRight size={16} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
