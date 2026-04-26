// src/pages/Home.jsx
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { ArrowRight, Shield, Zap, Users, HeartHandshake } from 'lucide-react';
import Hero from '../components/Hero/Hero';
import ServiceCard from '../components/Services/ServiceCard';
import { servicesData } from '../components/Services/ServicesData';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';

const whyUs = [
  { icon: <Zap size={20} />, color: '#7c3aed', title: 'Fast Delivery', desc: 'We respect deadlines. Projects ship on time, every time — without compromising quality.' },
  { icon: <Shield size={20} />, color: '#06b6d4', title: 'Secure & Scalable', desc: 'Industry-standard security practices and architecture designed to grow with your business.' },
  { icon: <Users size={20} />, color: '#9333ea', title: 'Dedicated Team', desc: 'A passionate team of specialists — not generalists — focused on your specific goals.' },
  { icon: <HeartHandshake size={20} />, color: '#10b981', title: 'Ongoing Support', desc: 'We don\'t disappear after launch. Long-term partnerships built on transparency and trust.' },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Kodox Technologies — Smart Digital Solutions</title>
        <meta name="description" content="Kodox Technologies delivers web development, IT solutions, and IoT services. Smart Digital Solutions for a Smarter Future." />
      </Helmet>

      {/* Hero */}
      <Hero />

      {/* Quick intro */}
      <section className="section" style={{ background: 'rgba(10,10,25,0.5)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <AnimateOnScroll variant="slideLeft">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">
                Where Technology Meets <span className="gradient-text">Strategy</span>
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Kodox Technology is a professional digital solutions company based in Kerala, India. We specialize in 
                web development, IT services, and IoT solutions — helping startups and businesses 
                build a powerful digital presence.
              </p>
              <Link to="/about" className="btn-outline">
                Learn More <ArrowRight size={16} />
              </Link>
            </AnimateOnScroll>

            <AnimateOnScroll variant="slideRight" delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Founded', value: '2025' },
                  { label: 'Team Members', value: '3+' },
                  { label: 'Core Services', value: '3' },
                  { label: 'Client Retention', value: '95%' },
                ].map(({ label, value }) => (
                  <div key={label} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 700,
                      background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>{value}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Our Core <span className="gradient-text">Services</span></h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Three pillars of digital excellence — each crafted to deliver measurable impact.
            </p>
          </AnimateOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {servicesData.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>

          <AnimateOnScroll style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn-primary">
              Explore All Services <ArrowRight size={16} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'rgba(5,5,20,0.8)' }}>
        <div className="container">
          <AnimateOnScroll style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Why Kodox</span>
            <h2 className="section-title">Built Different, <span className="gradient-text">By Design</span></h2>
          </AnimateOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {whyUs.map(({ icon, color, title, desc }, i) => (
              <AnimateOnScroll key={title} delay={i * 0.1}>
                <div className="glass-card" style={{ padding: '2rem', height: '100%' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${color}15`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, marginBottom: '1.25rem',
                  }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll>
            <div style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: 24, padding: 'clamp(2.5rem, 6vw, 4rem)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              {/* Background decoration */}
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200,
                            borderRadius: '50%', background: 'rgba(124,58,237,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -40, left: -40, width: 150, height: 150,
                            borderRadius: '50%', background: 'rgba(6,182,212,0.06)', filter: 'blur(40px)', pointerEvents: 'none' }} />

              <span className="section-label" style={{ position: 'relative' }}>Let's Build Together</span>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700, marginBottom: '1rem', position: 'relative',
              }}>
                Ready to Transform Your <span className="gradient-text">Digital Future?</span>
              </h2>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem', fontSize: '1rem', lineHeight: 1.8, position: 'relative' }}>
                Let's talk about your project. We'll respond within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
                <Link to="/contact" className="btn-primary">
                  Start a Project <ArrowRight size={16} />
                </Link>
                <a href="tel:+918848421752" className="btn-outline">
                  Call Us Now
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
