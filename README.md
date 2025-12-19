# SkillSwap 🚀

SkillSwap is a full-stack web application designed to enable users to showcase their skills, discover others’ skills, and collaborate through a structured skill-exchange platform.

The project is being developed with a scalable architecture and future-ready integrations.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **TypeScript**
- Tailwind CSS (for styling)

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB Atlas**

### Authentication
- **JWT-based authentication** (implemented)

### AI (Planned)
- **LLM API integration** for intelligent skill matching, recommendations, and assisted interactions

---

## ✨ Features

### ✅ Implemented
- User authentication (Signup & Login)
- Secure password hashing using bcrypt
- JWT-based authorization
- Protected API routes
- Backend health check API
- Modular backend architecture (routes, controllers, middleware, models)

### 🔄 In Progress
- Frontend ↔ Backend integration
- User dashboard data loading
- Skill offer management

### 🔮 Planned
- Skill offer creation & discovery
- AI-powered skill recommendations using LLM APIs
- Advanced search and filtering
- User profile enhancements

---

## 📂 Project Structure

```text
skillswap/
├── client/        # React + TypeScript frontend
└── server/        # Node.js + Express backend
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── index.js
