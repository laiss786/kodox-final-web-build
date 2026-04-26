// src/pages/Contact.jsx
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, Send, CheckCircle, AlertCircle, MapPin, Clock, MessageSquare } from 'lucide-react';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';
import { contactAPI } from '../utils/api';

const contactInfo = [
  { icon: <Mail size={18} />, label: 'Email', value: 'kodoxtech@gmail.com', href: 'mailto:kodoxtech@gmail.com', color: '#7c3aed' },
  { icon: <Phone size={18} />, label: 'Phone', value: '+91 88484 21752', href: 'tel:+918848421752', color: '#06b6d4' },
  { icon: <MapPin size={18} />, label: 'Location', value: 'Kerala, India', href: null, color: '#10b981' },
  { icon: <Clock size={18} />, label: 'Response Time', value: 'Within 24 hours', href: null, color: '#f59e0b' },
];

const inputStyle = {
  width: '100%', padding: '0.85rem 1rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 10, color: '#f1f5f9',
  fontFamily: "'Inter', sans-serif", fontSize: '0.9rem',
  outline: 'none', transition: 'border-color 0.2s, background 0.2s',
  boxSizing: 'border-box',
};

const inputFocus = {
  borderColor: 'rgba(124,58,237,0.5)',
  background: 'rgba(124,58,237,0.04)',
};

function FloatingInput({ label, error, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{ fontSize: '0.82rem', color: error ? '#f87171' : '#64748b', fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </label>
      {props.as === 'textarea' ? (
        <textarea
          {...props}
          rows={5}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle,
            resize: 'vertical', minHeight: 120,
            ...(focused || error ? { borderColor: error ? 'rgba(248,113,113,0.5)' : 'rgba(124,58,237,0.5)', background: error ? 'rgba(248,113,113,0.03)' : 'rgba(124,58,237,0.04)' } : {}),
          }}
        />
      ) : (
        <input
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle,
            ...(focused ? inputFocus : {}),
            ...(error ? { borderColor: 'rgba(248,113,113,0.5)', background: 'rgba(248,113,113,0.03)' } : {}),
          }}
        />
      )}
      {error && <span style={{ fontSize: '0.75rem', color: '#f87171' }}>{error}</span>}
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      await contactAPI.submit(data);
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact — Kodox Technologies</title>
        <meta name="description" content="Get in touch with Kodox Technologies. Email us at kodoxtech@gmail.com or call +91 88484 21752. We respond within 24 hours." />
      </Helmet>

      {/* Page hero */}
      <section style={{ paddingTop: 140, paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 40% 30%, rgba(124,58,237,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label">Get In Touch</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.5rem' }}>
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h1>
            <p style={{ color: '#94a3b8', maxWidth: 550, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.8 }}>
              Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

            {/* Contact info */}
            <AnimateOnScroll variant="slideLeft">
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  Contact Information
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                  Reach us via any of these channels — we're always happy to talk.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                  {contactInfo.map(({ icon, label, value, href, color }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: `${color}15`, border: `1px solid ${color}25`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color,
                      }}>
                        {icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#475569', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.1rem' }}>{label}</div>
                        {href ? (
                          <a href={href} style={{ color: '#94a3b8', fontSize: '0.9rem', transition: 'color 0.2s' }}
                             onMouseEnter={(e) => e.target.style.color = '#f1f5f9'}
                             onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                            {value}
                          </a>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp quick link */}
                <a
                  href="https://wa.me/918848421752?text=Hi%20Kodox%20Technologies!%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.85rem 1.5rem', borderRadius: 12,
                    background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)',
                    color: '#25D366', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.18)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,0.1)'; }}
                >
                  <MessageSquare size={18} />
                  Chat on WhatsApp
                </a>

                {/* Map embed */}
                <div style={{ marginTop: '2.5rem', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <iframe
                    title="Kodox Technologies Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.3!2d76.95!3d8.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zCMKwMzAnMDAuMCJOIDc2wrA1NycwMC4wIkU!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
                    width="100%" height="200"
                    style={{ display: 'block', border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
                    allowFullScreen loading="lazy"
                  />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Contact form */}
            <AnimateOnScroll variant="slideRight" delay={0.15}>
              <div style={{
                background: 'rgba(10,10,30,0.7)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(124,58,237,0.15)',
                borderRadius: 20, padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.75rem' }}>
                  Send us a Message
                </h2>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      textAlign: 'center', padding: '3rem 1rem',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
                    }}
                  >
                    <motion.div animate={{ scale: [0.8, 1.1, 1] }} transition={{ duration: 0.5 }}>
                      <CheckCircle size={56} style={{ color: '#10b981' }} />
                    </motion.div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem' }}>Message Sent!</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button onClick={() => setStatus(null)} className="btn-outline" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <FloatingInput
                          label="Full Name *"
                          type="text"
                          placeholder="Your name"
                          error={errors.name?.message}
                          {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
                        />
                        <FloatingInput
                          label="Email Address *"
                          type="email"
                          placeholder="you@example.com"
                          error={errors.email?.message}
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                          })}
                        />
                      </div>
                      <FloatingInput
                        label="Phone Number"
                        type="tel"
                        placeholder="+91 xxxxx xxxxx"
                        {...register('phone')}
                      />
                      <FloatingInput
                        label="Subject"
                        type="text"
                        placeholder="What's this about?"
                        {...register('subject')}
                      />
                      <FloatingInput
                        as="textarea"
                        label="Message *"
                        placeholder="Tell us about your project, goals, and timeline..."
                        error={errors.message?.message}
                        {...register('message', {
                          required: 'Message is required',
                          minLength: { value: 10, message: 'Message too short (min 10 chars)' },
                        })}
                      />

                      {status === 'error' && (
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: '0.6rem',
                          padding: '0.75rem 1rem', borderRadius: 8,
                          background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)',
                          color: '#f87171', fontSize: '0.85rem',
                        }}>
                          <AlertCircle size={16} /> {errorMsg}
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-primary"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          justifyContent: 'center',
                          opacity: status === 'loading' ? 0.7 : 1,
                          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {status === 'loading' ? (
                          <>
                            <motion.div
                              style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send size={16} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
