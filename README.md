# ⚡ KODOX TECHNOLOGIES — Full-Stack MERN Website

> Smart Digital Solutions for a Smarter Future

A premium, production-ready MERN stack company website for **Kodox Technologies** — featuring a futuristic dark UI, animated hero with particle canvas, glassmorphism cards, Framer Motion page transitions, and a complete Express + MongoDB backend with admin dashboard.

---

## 🗂️ Project Structure

```
kodox-technologies/
├── client/                    # React.js frontend
│   ├── public/
│   │   └── index.html         # SEO meta tags + structured data
│   └── src/
│       ├── components/
│       │   ├── Hero/           # ParticleCanvas + Hero section
│       │   ├── Navbar/         # Sticky glassmorphism navbar
│       │   ├── Footer/         # Full footer
│       │   ├── Services/       # ServiceCard + ServicesData
│       │   ├── Team/           # TeamData
│       │   └── shared/         # Preloader, CustomCursor, WhatsApp, AnimateOnScroll
│       ├── pages/
│       │   ├── Home.jsx        # Hero + services + why us + testimonials + CTA
│       │   ├── About.jsx       # Mission, vision, values, timeline
│       │   ├── Services.jsx    # Full service cards + tech stack + process
│       │   ├── Team.jsx        # 6 team members with hover effects
│       │   ├── Portfolio.jsx   # Filterable grid + modal popup
│       │   ├── Contact.jsx     # Form + map + contact info
│       │   └── AdminDashboard.jsx  # Protected admin: messages + projects
│       ├── styles/
│       │   └── global.css      # Design system: variables, glassmorphism, animations
│       └── utils/
│           ├── api.js          # Axios API utility (all endpoints)
│           └── portfolioData.js # Realistic dummy portfolio data
├── server/                    # Node.js + Express backend
│   ├── config/db.js           # MongoDB connection
│   ├── controllers/           # contact, project, auth controllers
│   ├── middleware/            # JWT auth guard + error handler
│   ├── models/                # Contact, Project, Admin schemas
│   ├── routes/                # contact, project, auth routes
│   └── server.js              # Entry point (Helmet, CORS, rate limiting)
└── package.json               # Root scripts (concurrent dev)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier works)
- Gmail account (for contact form emails)

---

### 1. Clone & Install

```bash
git clone <your-repo-url> kodox-technologies
cd kodox-technologies

# Install all dependencies at once
npm install
npm run install:all
```

---

### 2. Configure Environment Variables

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/kodox-db?retryWrites=true&w=majority

# JWT secret (use a long random string in production)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_chars

# Email (Gmail — enable 2FA and create an App Password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=kodoxtech@gmail.com
EMAIL_PASS=xxxx_xxxx_xxxx_xxxx    # Gmail App Password (16 chars)
EMAIL_TO=kodoxtech@gmail.com

# Frontend URL
CLIENT_URL=http://localhost:3000
```

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App Passwords → Generate

---

### 3. Run in Development

```bash
# From root — starts both client (port 3000) and server (port 5000)
npm run dev
```

Or run separately:
```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm start
```

---

### 4. Create Admin Account

Use MongoDB Compass or Atlas UI — insert a document into the `admins` collection:

```json
{
  "name": "Kodox Admin",
  "email": "admin@kodoxtech.com",
  "password": "$2a$12$..."
}
```

Or add a seed script (recommended for first setup):

```bash
# In server/ directory — create scripts/seed.js:
node scripts/seed.js
```

Then visit `http://localhost:3000/admin` to log in.

---

## 🌐 API Endpoints

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/contact` | Public | Submit contact form |
| GET | `/api/contact` | Admin | View all messages |
| PATCH | `/api/contact/:id/read` | Admin | Mark message as read |
| DELETE | `/api/contact/:id` | Admin | Delete message |
| GET | `/api/projects` | Public | Get all projects |
| GET | `/api/projects/:id` | Public | Get single project |
| POST | `/api/projects` | Admin | Create project |
| PUT | `/api/projects/:id` | Admin | Update project |
| DELETE | `/api/projects/:id` | Admin | Delete project |
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/auth/me` | Admin | Get current admin |
| GET | `/api/health` | Public | Health check |

---

## 🏗️ Build for Production

```bash
# Build React frontend
npm run build
# Output: client/build/

# Serve with Node (add static file serving to server.js)
npm run start:server
```

**Recommended deployment:**
- **Frontend**: Vercel or Netlify (drop `client/build/`)
- **Backend**: Railway, Render, or Heroku
- **Database**: MongoDB Atlas (M0 free tier)

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#05050f` |
| Surface | `rgba(15,15,35,0.8)` |
| Primary | `#7c3aed` (purple) |
| Accent | `#06b6d4` (cyan) |
| Font Display | Space Grotesk |
| Font Mono | JetBrains Mono |
| Font Body | Inter |

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Animated hero + particle canvas | ✅ |
| Glassmorphism cards | ✅ |
| Framer Motion page transitions | ✅ |
| Custom cursor | ✅ |
| Preloader animation | ✅ |
| Responsive (mobile/tablet/desktop) | ✅ |
| SEO meta tags + structured data | ✅ |
| WhatsApp floating button | ✅ |
| Contact form + email notification | ✅ |
| Animated stat counters | ✅ |
| Portfolio filter + modal | ✅ |
| Team cards with hover effects | ✅ |
| Timeline animation (About) | ✅ |
| Sticky glassmorphism navbar | ✅ |
| Admin dashboard (messages + projects) | ✅ |
| JWT-protected admin routes | ✅ |
| Rate limiting (OWASP) | ✅ |
| Helmet security headers | ✅ |
| Input validation (Joi) | ✅ |

---

## 📞 Contact

**Kodox Technologies**
- Email: kodoxtech@gmail.com
- Phone: +91 88484 21752
- WhatsApp: [Chat now](https://wa.me/918848421752)

---

*Built with ❤️ in Kerala, India*
