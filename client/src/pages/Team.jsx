// src/pages/Team.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { teamData } from '../components/Team/TeamData';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';

function TeamCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8 }}
      style={{
        background: 'rgba(10,10,30,0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 20, overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${member.color}50`;
        e.currentTarget.style.boxShadow = `0 20px 60px ${member.color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top gradient bar */}
      <div style={{
        height: 4,
        background: `linear-gradient(90deg, ${member.color}, ${member.color}80)`,
      }} />

      {/* Avatar area */}
      <div style={{
        padding: '2rem 2rem 1.5rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      }}>
        {/* Avatar circle */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: `linear-gradient(135deg, ${member.color}40, ${member.color}80)`,
            border: `2px solid ${member.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '1.5rem', color: member.color,
            letterSpacing: '-0.02em',
          }}>
            {member.initials}
          </div>
          {/* Glow ring */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
            style={{
              position: 'absolute', inset: -4, borderRadius: '50%',
              border: `1px solid ${member.color}30`,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Name & Role */}
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: '1.05rem', marginBottom: '0.25rem', color: '#f1f5f9',
        }}>
          {member.name}
        </h3>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
          color: member.color, letterSpacing: '0.06em', marginBottom: '1rem',
          display: 'block',
        }}>
          {member.role}
        </span>

        {/* Bio */}
        <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          {member.bio}
        </p>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
          {member.social.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
               style={{
                 width: 34, height: 34, borderRadius: 8,
                 border: `1px solid ${member.color}25`,
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: '#475569', transition: 'all 0.2s',
               }}
               onMouseEnter={(e) => { e.currentTarget.style.color = member.color; e.currentTarget.style.borderColor = member.color; e.currentTarget.style.background = `${member.color}15`; }}
               onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = `${member.color}25`; e.currentTarget.style.background = 'transparent'; }}>
              <Linkedin size={14} />
            </a>
          )}
          {member.social.instagram && (
            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               style={{
                 width: 34, height: 34, borderRadius: 8,
                 border: `1px solid ${member.color}25`,
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: '#475569', transition: 'all 0.2s',
               }}
               onMouseEnter={(e) => { e.currentTarget.style.color = member.color; e.currentTarget.style.borderColor = member.color; e.currentTarget.style.background = `${member.color}15`; }}
               onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = `${member.color}25`; e.currentTarget.style.background = 'transparent'; }}>
              <Instagram size={14} />
            </a>
          )}
          {member.social.portfolio && (
            <a href={member.social.portfolio} target="_blank" rel="noopener noreferrer" aria-label="Portfolio"
               style={{
                 width: 34, height: 34, borderRadius: 8,
                 border: `1px solid ${member.color}25`,
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: '#475569', transition: 'all 0.2s',
               }}
               onMouseEnter={(e) => { e.currentTarget.style.color = member.color; e.currentTarget.style.borderColor = member.color; e.currentTarget.style.background = `${member.color}15`; }}
               onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = `${member.color}25`; e.currentTarget.style.background = 'transparent'; }}>
              <Globe size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <>
      <Helmet>
        <title>Our Team — Kodox Technologies</title>
        <meta name="description" content="Meet the founders behind Kodox Technologies — builders, engineers, and innovators shaping the digital future." />
      </Helmet>

      {/* Page hero */}
      <section style={{ paddingTop: 140, paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label">The Founders</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.5rem' }}>
              Meet the Minds Behind <span className="gradient-text">Kodox</span>
            </h1>
            <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.8 }}>
              Three founders united by one goal — building digital products that actually work and businesses that actually grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {teamData.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Culture section */}
      <section className="section" style={{ background: 'rgba(5,5,20,0.6)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <AnimateOnScroll variant="slideLeft">
              <span className="section-label">Our Culture</span>
              <h2 className="section-title">
                We Work Hard, <span className="gradient-text">We Build Bold</span>
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                At Kodox, we believe great work comes from great teams. We're a remote-friendly, idea-driven 
                group where every voice matters. We move fast, learn constantly, and celebrate wins together.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Agile & fast-moving culture', 'Continuous learning encouraged', 'Open communication always', 'Results over processes'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="slideRight" delay={0.15}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.08))',
                border: '1px solid rgba(124,58,237,0.2)', borderRadius: 20, padding: '2.5rem',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '3.5rem', fontWeight: 700,
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  marginBottom: '0.5rem',
                }}>3</div>
                <div style={{ color: '#94a3b8', marginBottom: '2rem' }}>Main Founders</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 700,
                  background: 'linear-gradient(135deg, #06b6d4, #a78bfa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  marginBottom: '0.5rem',
                }}>∞</div>
                <div style={{ color: '#94a3b8' }}>Ideas In The Pipeline</div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Join us */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimateOnScroll>
            <span className="section-label">Join the Team</span>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Want to Build With Us?
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
              We're always looking for talented people who share our passion for technology and impact.
            </p>
            <Link to="/contact" className="btn-primary">
              Get In Touch <ArrowRight size={16} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
