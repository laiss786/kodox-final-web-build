// src/pages/Services.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Lightbulb, Code2, Rocket } from 'lucide-react';
import ServiceCard from '../components/Services/ServiceCard';
import { servicesData } from '../components/Services/ServicesData';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';

const process = [
  { icon: <MessageSquare size={20} />, step: '01', title: 'Discovery Call', desc: 'We start with a deep-dive consultation to understand your goals, audience, and challenges.' },
  { icon: <Lightbulb size={20} />, step: '02', title: 'Strategy & Planning', desc: 'Our team crafts a tailored roadmap with clear timelines, deliverables, and KPIs.' },
  { icon: <Code2 size={20} />, step: '03', title: 'Build & Execute', desc: 'We execute with precision — using agile methodology and constant communication.' },
  { icon: <Rocket size={20} />, step: '04', title: 'Launch & Support', desc: 'Post-launch we monitor, optimize, and support to ensure lasting results.' },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Kodox Technologies</title>
        <meta name="description" content="Kodox Technologies offers web development, IT solutions, and IoT services. Explore our full range of professional digital services." />
      </Helmet>

      {/* Page hero */}
      <section style={{ paddingTop: 140, paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 70% 30%, rgba(6,182,212,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label">What We Offer</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.5rem' }}>
              Services Built for <span className="gradient-text">Real Results</span>
            </h1>
            <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.8 }}>
              From concept to launch and beyond — we offer end-to-end digital solutions that drive 
              measurable growth for businesses in Kerala and across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service cards */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {servicesData.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Tech stack badge section */}
      <section className="section" style={{ background: 'rgba(5,5,20,0.6)' }}>
        <div className="container">
          <AnimateOnScroll style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label">Technologies We Use</span>
            <h2 className="section-title">Built With the <span className="gradient-text">Best Tools</span></h2>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              {['React.js', 'Node.js', 'MongoDB', 'Express', 'Next.js', 'Python', 'WordPress', 'Arduino',
                'Raspberry Pi', 'Firebase', 'AWS', 'Figma', 'MQTT', 'Docker'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(124,58,237,0.5)', color: '#a78bfa' }}
                  style={{
                    padding: '0.5rem 1.1rem', borderRadius: 50,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    color: '#64748b', fontSize: '0.85rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: 'default', transition: 'all 0.2s',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Our Process */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">How We Work</span>
            <h2 className="section-title">Our <span className="gradient-text">Process</span></h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A clear, collaborative workflow designed to keep you in the loop at every step.
            </p>
          </AnimateOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', position: 'relative' }}>
            {process.map(({ icon, step, title, desc }, i) => (
              <AnimateOnScroll key={step} delay={i * 0.12} variant="fadeUp">
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))',
                    border: '1px solid rgba(124,58,237,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#a78bfa', margin: '0 auto 1rem', position: 'relative',
                  }}>
                    {icon}
                    <span style={{
                      position: 'absolute', top: -8, right: -8,
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
                      fontWeight: 700, color: '#7c3aed',
                      background: '#05050f', border: '1px solid rgba(124,58,237,0.3)',
                      borderRadius: 4, padding: '1px 4px',
                    }}>{step}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: '0.6rem' }}>{title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimateOnScroll>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1rem' }}>
              Not sure which service you need?
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Let's have a free 30-minute strategy call — no commitment needed.</p>
            <Link to="/contact" className="btn-primary">
              Book a Free Consultation <ArrowRight size={16} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
