# SkillSwap 🔄

A full-stack skill exchange platform where users can offer skills they know and find skills they want to learn — powered by **Groq AI (LLaMA 3.3)** for intelligent skill matching and description generation.

![Tech Stack](https://img.shields.io/badge/React-TypeScript-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=flat-square&logo=mongodb)
![Groq AI](https://img.shields.io/badge/Groq-LLaMA%203.3-orange?style=flat-square&logo=groq)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Deployed-Render-blue?style=flat-square&logo=render)

---

## 🌐 Live Demo

- 🚀 **Frontend:** https://skillswap-frontend-livid.vercel.app
- 🔧 **Backend API:** https://skillswap-backend-18hj.onrender.com/api/health

> **Note:** Backend is hosted on Render free tier — first request may take 30-60 seconds to wake up.

---

## 🚀 Features

### ✅ Implemented

- User authentication (Signup & Login)
- Secure password hashing using bcrypt
- JWT-based authorization & protected API routes
- Skill listing — create, browse, filter by category/level/type, search, delete
- Exchange request flow — send, accept, reject, complete, cancel
- Exchange request modal with skill selection and message
- Dashboard with live stats (skills listed, pending requests, active exchanges)
- RESTful API for skills, exchanges, users, and AI
- Modular backend architecture (routes, controllers, middleware, models)
- **AI Mentor Chat** — floating chat widget powered by Groq AI for skill learning guidance, roadmaps, and career advice
- **AI-powered skill description generator** using Groq AI (LLaMA 3.3)
- **AI-powered personalized skill matching** with match scores and reasons
- **Explainable AI Matches** — AI skill matching with detailed bullet-point explanations for why each match is recommended
- MongoDB seed data — 10 users and 25 skills across multiple categories
- Fully deployed — frontend on Vercel, backend on Render

---

## 🛠 Tech Stack

### Frontend
- React.js + TypeScript
- Tailwind CSS
- React Router DOM
- Fetch API

### Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcryptjs
- Groq AI SDK (`llama-3.3-70b-versatile`)

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas (AWS Mumbai)

---

## 📁 Project Structure

```
skillswap/
├── client/                  # React + TypeScript frontend
│   └── src/
│       ├── components/      # Navbar, SkillCard
│       ├── pages/           # Dashboard, SkillListing, Profile, Exchanges, AIMatches
│       ├── App.tsx
│       └── api.ts
└── server/                  # Node.js + Express backend
    ├── config/              # MongoDB connection
    ├── controllers/         # authController, skillController, exchangeController, aiController
    ├── middleware/          # JWT authMiddleware
    ├── models/              # User, Skill, Exchange
    ├── routes/              # authRoutes, userRoutes, skillRoutes, exchangeRoutes, aiRoutes
    ├── seed.js              # Database seed script
    └── index.js
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT token |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills` | Browse all skills (with filters) |
| GET | `/api/skills/my` | Get my skills |
| POST | `/api/skills` | Create a new skill |
| PUT | `/api/skills/:id` | Update skill |
| DELETE | `/api/skills/:id` | Delete skill |

### Exchanges
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/exchanges` | Send exchange request |
| GET | `/api/exchanges/my` | Get sent & received requests |
| PUT | `/api/exchanges/:id/status` | Accept / Reject / Complete |
| DELETE | `/api/exchanges/:id` | Cancel pending request |

### AI (Groq)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ai/matches` | Get personalized skill recommendations |
| POST | `/api/ai/describe` | AI-generate a skill description |

---

## ⚙️ Setup & Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Backend
```bash
cd server
npm install
```

Create `server/.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

Create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### Seed Database (Optional)
```bash
cd server
node seed.js
```
Creates 10 sample users and 25 skills across multiple categories for testing.

---

## 🔑 Test Credentials

After running seed script, you can login with any seed user:
- **Email:** `alice@example.com`
- **Password:** `seed123456`

---

## 👨‍💻 Author

**M S Uday Kiran**
Full Stack Developer | [GitHub](https://github.com/UDAYKIRAN1607)
