// src/pages/AdminDashboard.jsx
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, FolderOpen, Trash2, LogOut, Lock, Plus, RefreshCw, CheckCircle } from 'lucide-react';
import { contactAPI, projectAPI, authAPI } from '../utils/api';

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await authAPI.login({ email, password });
      localStorage.setItem('kodox_admin_token', res.data.token);
      onLogin(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputSt = {
    width: '100%', padding: '0.8rem 1rem',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, color: '#f1f5f9', fontSize: '0.9rem', outline: 'none',
    fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'rgba(10,10,30,0.9)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: 20, padding: '3rem', width: '100%', maxWidth: 420,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Lock size={24} color="#fff" />
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.5rem' }}>Admin Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.3rem' }}>Kodox Technologies</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputSt} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputSt} />
            {error && <p style={{ color: '#f87171', fontSize: '0.82rem' }}>{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Tab: Messages ────────────────────────────────────────────────────────────
function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contactAPI.getAll();
      setMessages(res.data.data);
    } catch { } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id) => {
    await contactAPI.markRead(id);
    setMessages((prev) => prev.map((m) => m._id === id ? { ...m, isRead: true } : m));
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await contactAPI.remove(id);
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem' }}>Contact Messages</h2>
          {unread > 0 && (
            <span style={{ fontSize: '0.78rem', color: '#a78bfa', fontFamily: "'JetBrains Mono', monospace" }}>
              {unread} unread
            </span>
          )}
        </div>
        <button onClick={load} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#475569' }}>Loading messages...</div>
      ) : messages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#475569' }}>No messages yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg) => (
            <div key={msg._id} style={{
              background: msg.isRead ? 'rgba(255,255,255,0.02)' : 'rgba(124,58,237,0.05)',
              border: `1px solid ${msg.isRead ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.2)'}`,
              borderRadius: 12, padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.95rem' }}>
                    {msg.name} {!msg.isRead && <span style={{ fontSize: '0.65rem', background: '#7c3aed', color: '#fff', padding: '1px 6px', borderRadius: 50, marginLeft: '0.4rem' }}>NEW</span>}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>
                    {msg.email} {msg.phone && `· ${msg.phone}`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  {!msg.isRead && (
                    <button onClick={() => markRead(msg._id)} title="Mark as read"
                      style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer' }}>
                      <CheckCircle size={16} />
                    </button>
                  )}
                  <button onClick={() => remove(msg._id)} title="Delete"
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {msg.subject && <div style={{ fontSize: '0.8rem', color: '#7c3aed', marginBottom: '0.4rem' }}>{msg.subject}</div>}
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7 }}>{msg.message}</p>
              <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: '#334155', fontFamily: "'JetBrains Mono', monospace" }}>
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tab: Projects ────────────────────────────────────────────────────────────
function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: 'Web', tags: '', imageUrl: '', liveUrl: '' });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await projectAPI.getAll();
      setProjects(res.data.data);
    } catch { } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) };
      await projectAPI.create(payload);
      setShowForm(false);
      setForm({ title: '', description: '', category: 'Web', tags: '', imageUrl: '', liveUrl: '' });
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await projectAPI.remove(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  const inputSt = {
    width: '100%', padding: '0.7rem 0.9rem',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, color: '#f1f5f9', fontSize: '0.85rem', outline: 'none',
    fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem' }}>
          Projects ({projects.length})
        </h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.55rem 1.2rem' }}>
          <Plus size={14} /> Add Project
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleSave} style={{
          background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem',
        }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: '1.25rem', fontSize: '1rem' }}>New Project</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title *" required style={inputSt} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ ...inputSt }}>
              {['Web', 'Marketing', 'IoT', 'IT'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description *" required rows={3} style={{ ...inputSt, resize: 'vertical', marginBottom: '1rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags (comma-separated)" style={inputSt} />
            <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="Live URL (optional)" style={inputSt} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" disabled={saving} className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.55rem 1.2rem', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : 'Save Project'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline" style={{ fontSize: '0.82rem', padding: '0.55rem 1.2rem' }}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#475569' }}>Loading projects...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {projects.map((p) => (
            <div key={p._id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10, padding: '1rem 1.25rem',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{p.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}>
                  {p.category} · {new Date(p.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button onClick={() => handleDelete(p._id)} title="Delete"
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', flexShrink: 0 }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {projects.length === 0 && <div style={{ textAlign: 'center', padding: '2rem', color: '#475569' }}>No projects yet. Add one above.</div>}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState('messages');

  useEffect(() => {
    const token = localStorage.getItem('kodox_admin_token');
    if (!token) { setChecking(false); return; }
    authAPI.me()
      .then((res) => setAdmin(res.data.data))
      .catch(() => localStorage.removeItem('kodox_admin_token'))
      .finally(() => setChecking(false));
  }, []);

  const logout = () => {
    localStorage.removeItem('kodox_admin_token');
    setAdmin(null);
  };

  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
      Loading...
    </div>
  );

  if (!admin) return <LoginForm onLogin={setAdmin} />;

  const tabs = [
    { id: 'messages', label: 'Messages', icon: <Mail size={16} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={16} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.6rem' }}>Dashboard</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Welcome back, {admin.name}</p>
          </div>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.55rem 1rem', color: '#64748b', cursor: 'pointer', fontSize: '0.85rem', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
          {tabs.map(({ id, label, icon }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.25rem',
              background: 'none', border: 'none',
              borderBottom: tab === id ? '2px solid #7c3aed' : '2px solid transparent',
              color: tab === id ? '#a78bfa' : '#64748b',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '0.9rem',
              cursor: 'pointer', marginBottom: -1, transition: 'color 0.2s',
            }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {tab === 'messages' ? <MessagesTab /> : <ProjectsTab />}
        </motion.div>
      </div>
    </div>
  );
}
