// src/pages/About.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Eye, Rocket, Lightbulb, Users, Globe } from 'lucide-react';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';

const timeline = [
  { year: '2022', title: 'Founded', desc: 'Kodox Technologies was born from a shared vision — to make world-class digital services accessible to every business.' },
  { year: '2022', title: 'First 10 Clients', desc: 'Within months of launch, we served our first 10 clients across web development and digital marketing.' },
  { year: '2023', title: 'IoT Division Launched', desc: 'Expanded into IoT solutions, serving academic projects and early industrial automation clients in Kerala.' },
  { year: '2023', title: '50+ Projects', desc: 'Crossed 50 delivered projects milestone — with a 95% client retention rate and zero missed deadlines.' },
  { year: '2024', title: 'IT Solutions Division', desc: 'Launched our full IT solutions arm — custom software, cloud infrastructure, and enterprise support.' },
  { year: '2025', title: 'Scaling Up', desc: 'Growing our team and expanding services across South India. The journey has just begun.' },
];

const values = [
  { icon: <Lightbulb size={22} />, color: '#7c3aed', title: 'Innovation First', desc: 'We embrace new technologies and creative approaches to solve old problems in better ways.' },
  { icon: <Users size={22} />, color: '#06b6d4', title: 'Client-Centric', desc: 'Your success is our success. We measure our performance by the results we deliver for you.' },
  { icon: <Globe size={22} />, color: '#10b981', title: 'Impact-Driven', desc: 'Every project we take on must create real, measurable value — not just deliverables.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Kodox Technologies</title>
        <meta name="description" content="Learn about Kodox Technologies — our story, mission, vision, and the passionate team behind Kerala's rising digital solutions company." />
      </Helmet>

      {/* Page Hero */}
      <section style={{ paddingTop: 140, paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label">Our Story</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.5rem' }}>
              Building the <span className="gradient-text">Digital Future</span>
            </h1>
            <p style={{ color: '#94a3b8', maxWidth: 650, margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Kodox Technology is a professional digital solutions company specializing in digital marketing, 
              web development, IT services, and IoT solutions — empowering businesses to thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: 'rgba(5,5,20,0.6)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <Target size={28} />, color: '#7c3aed',
                title: 'Our Mission',
                text: 'To empower businesses of every size with innovative digital solutions — delivering measurable growth through technology, strategy, and relentless execution. We make world-class digital services accessible and impactful.',
              },
              {
                icon: <Eye size={28} />, color: '#06b6d4',
                title: 'Our Vision',
                text: 'To become South India\'s most trusted technology partner — known for transformative digital work, exceptional client relationships, and a culture of constant innovation that shapes the future of business.',
              },
            ].map(({ icon, color, title, text }, i) => (
              <AnimateOnScroll key={title} delay={i * 0.15} variant={i === 0 ? 'slideLeft' : 'slideRight'}>
                <div style={{
                  background: `linear-gradient(135deg, ${color}08, ${color}15)`,
                  border: `1px solid ${color}25`,
                  borderRadius: 20, padding: '2.5rem', height: '100%',
                }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 16,
                    background: `${color}20`, border: `1px solid ${color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, marginBottom: '1.5rem',
                  }}>
                    {icon}
                  </div>
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h2>
                  <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>{text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title">Our Core <span className="gradient-text">Values</span></h2>
          </AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {values.map(({ icon, color, title, desc }, i) => (
              <AnimateOnScroll key={title} delay={i * 0.12} variant="scaleUp">
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: `${color}15`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, margin: '0 auto 1.25rem',
                  }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: '0.6rem' }}>{title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'rgba(5,5,20,0.6)' }}>
        <div className="container">
          <AnimateOnScroll style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">How We <span className="gradient-text">Got Here</span></h2>
          </AnimateOnScroll>

          <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: 1, background: 'linear-gradient(to bottom, #7c3aed40, #06b6d440, transparent)',
              transform: 'translateX(-50%)',
            }} />

            {timeline.map(({ year, title, desc }, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1} variant={i % 2 === 0 ? 'slideLeft' : 'slideRight'}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 40px 1fr',
                  gap: '1.5rem',
                  marginBottom: '2.5rem',
                  alignItems: 'center',
                }}>
                  {/* Left side */}
                  {i % 2 === 0 ? (
                    <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'right' }}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem',
                        color: '#7c3aed', marginBottom: '0.4rem',
                      }}>{year}</div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1rem', marginBottom: '0.4rem' }}>{title}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.83rem', lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  ) : <div />}

                  {/* Dot */}
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                    border: '3px solid #05050f',
                    justifySelf: 'center',
                    boxShadow: '0 0 12px rgba(124,58,237,0.5)',
                  }} />

                  {/* Right side */}
                  {i % 2 !== 0 ? (
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem',
                        color: '#06b6d4', marginBottom: '0.4rem',
                      }}>{year}</div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1rem', marginBottom: '0.4rem' }}>{title}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.83rem', lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  ) : <div />}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Rocket CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimateOnScroll>
            <div style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))',
              border: '1px solid rgba(124,58,237,0.2)', borderRadius: 20, padding: '3rem',
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', maxWidth: 550,
            }}>
              <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 3, repeat: Infinity }}>
                <Rocket size={40} style={{ color: '#7c3aed' }} />
              </motion.div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.6rem' }}>
                Ready to launch your project?
              </h2>
              <a href="/contact" className="btn-primary">Let's Talk <Rocket size={16} /></a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
