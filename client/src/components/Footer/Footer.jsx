// src/components/Footer/Footer.jsx
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Linkedin, Twitter, Zap, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/team' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contact', path: '/contact' },
  ],
  Services: [
    { label: 'Digital Marketing', path: '/services' },
    { label: 'Web Development', path: '/services' },
    { label: 'IT Solutions', path: '/services' },
    { label: 'IoT Solutions', path: '/services' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#050510',
      borderTop: '1px solid rgba(124,58,237,0.15)',
      paddingTop: '4rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={18} color="#fff" fill="#fff" />
              </div>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem',
                background: 'linear-gradient(135deg, #f1f5f9, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>KODOX</span>
            </Link>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: 260 }}>
              Smart digital solutions for a smarter future. We build, grow, and innovate.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <Instagram size={16} />, href: 'https://instagram.com/kodoxtech', label: 'Instagram' },
                { icon: <Linkedin size={16} />, href: '#', label: 'LinkedIn' },
                { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                   style={{
                     width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(124,58,237,0.2)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     color: '#94a3b8', transition: 'all 0.2s',
                   }}
                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.2)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.85rem',
                           letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: '1.25rem' }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link to={path} style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => { e.target.style.color = '#94a3b8'; }}
                          onMouseLeave={(e) => { e.target.style.color = '#64748b'; }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.85rem',
                         letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: '1.25rem' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="mailto:kodoxtech@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                 onMouseEnter={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}>
                <Mail size={14} style={{ color: '#7c3aed', flexShrink: 0 }} />
                kodoxtech@gmail.com
              </a>
              <a href="tel:+918848421752" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                 onMouseEnter={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}>
                <Phone size={14} style={{ color: '#06b6d4', flexShrink: 0 }} />
                +91 88484 21752
              </a>
            </div>

            {/* CTA */}
            <a href="/contact" className="btn-outline" style={{ marginTop: '1.5rem', display: 'inline-flex', fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>
              Start a project <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '1.5rem 0',
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ color: '#334155', fontSize: '0.85rem' }}>
            © {year} Kodox Technologies. All rights reserved.
          </p>
          <p style={{ color: '#334155', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>
            Built with ❤️ in Kerala, India
          </p>
        </div>
      </div>
    </footer>
  );
}
