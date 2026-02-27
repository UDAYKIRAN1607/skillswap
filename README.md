# SkillSwap 🔄

A full-stack skill exchange platform where users can offer skills they know and find skills they want to learn — powered by **Google Gemini AI** for intelligent skill matching.

![Tech Stack](https://img.shields.io/badge/React-TypeScript-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=flat-square&logo=mongodb)
![Gemini AI](https://img.shields.io/badge/Google-Gemini%20AI-orange?style=flat-square&logo=google)

---

## 🚀 Features

### ✅ Implemented
- User authentication (Signup & Login)
- Secure password hashing using bcrypt
- JWT-based authorization & protected API routes
- Skill model — create, browse, filter, delete skills
- Exchange request model — send, accept, reject, complete
- RESTful API for skills, exchanges, and AI matching
- Modular backend architecture (routes, controllers, middleware, models)

### 🔄 In Progress
- Frontend core pages — Navbar, SkillListing, Profile
- Exchange request flow UI
- Dashboard with stats

### 📅 Coming Soon
- AI-powered skill recommendations (Google Gemini) *(backend ready)*
- AI description generator for skill listings
- MongoDB seed data
- Deployment (Render + Vercel)

---

## 🛠 Tech Stack

### Frontend
- React.js + TypeScript
- Tailwind CSS
- React Router DOM

### Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- Google Gemini AI (`gemini-1.5-flash`)

---

## 📁 Project Structure

```
skillswap/
├── client/                  # React + TypeScript frontend
│   └── src/
│       ├── components/      # Navbar, SkillCard
│       ├── pages/           # SkillListing, Profile, Exchanges, AIMatches
│       ├── App.tsx
│       └── api.ts
└── server/                  # Node.js + Express backend
    ├── config/              # MongoDB connection
    ├── controllers/         # authController, skillController, exchangeController, aiController
    ├── middleware/          # JWT authMiddleware
    ├── models/              # User, Skill, Exchange
    ├── routes/              # authRoutes, userRoutes, skillRoutes, exchangeRoutes, aiRoutes
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

### AI (Gemini)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ai/matches` | Get personalized skill recommendations |
| POST | `/api/ai/describe` | AI-generate a skill description |

---

## ⚙️ Setup & Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

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
GEMINI_API_KEY=your_gemini_api_key
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

---

## 👨‍💻 Author

**M S Uday Kiran**  
Full Stack Developer | [GitHub](https://github.com/UDAYKIRAN1607)
