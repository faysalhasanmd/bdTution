# eTuitionBd – Tuition Management System

## Live Links

- **Live Site:** https://preeminent-mermaid-04ba7b.netlify.app/
- **Github Repo:** https://github.com/faysalhasanmd/bdTution

---

## Project Purpose

**eTuitionBd** is a MERN-stack Tuition Management System that connects students with qualified tutors in a structured and secure way.

### Why this project?

- Solve the problem of finding **trusted tutors**
- Provide a **centralized tuition platform**
- Reduce communication gap between student & tutor
- Enable **secure payment system**
- Help admin **monitor & control platform activities**

---

## Features

### Student Features

- Create, update, delete tuition posts
- View tutor applications
- Accept / Reject tutor
- Stripe payment for hiring tutor
- View payment history

### Tutor Features

- Browse tuition posts
- Apply for tuition
- Track application status
- View ongoing (approved) tuitions
- Revenue history

### Admin Features

- User Management (CRUD + Role control)
- Tuition Approval / Rejection
- Reports & Analytics (earnings, transactions)
- Full system monitoring

---

## Authentication & Security

- Firebase Authentication (Email + Password + Google Login)
- JWT Token-based Authorization
- Role-based access control (Admin / Tutor / Student)
- Protected routes (No redirect issue after reload)
- Secure environment variables (.env)
  - Firebase keys
  - MongoDB URI
  - JWT secret

---

## Pages & Layout

### Public Pages

- Home
- Tuitions Listing
- Tuition Details
- Tutors Listing
- Tutor Profile
- About
- Contact
- Login / Register

### Dashboard Pages

#### Student Dashboard

- My Tuitions
- Post Tuition
- Applied Tutors
- Payments
- Profile Settings

#### Tutor Dashboard

- My Applications
- Ongoing Tuitions
- Revenue History

#### Admin Dashboard

- User Management
- Tuition Management
- Reports & Analytics

---

## System Workflow

1. Student posts tuition → Status: **Pending**
2. Admin approves → Status: **Approved**
3. Tutors apply for tuition
4. Student selects tutor → Payment via Stripe
5. Tutor becomes **Approved**

---

## Advanced Features (Challenge Part)

- Search by subject & location
- Sort by budget & date
- Pagination (tuition listing page)
- Advanced filter (class, subject, location)
- JWT verification (role + token expiry)

---

## UI/UX Highlights

- Fully responsive (Mobile / Tablet / Desktop)
- Sticky Navbar (DaisyUI)
- Clean & premium design
- Framer Motion animations
- Dashboard charts (Admin analytics)
- Consistent layout & spacing

---

## Technologies & Packages

### Frontend

- React.js
- React Router
- Tailwind CSS
- DaisyUI
- Framer Motion
- Axios
- AOS
- React Hook Form
- Chart.js / Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- Stripe API
- CORS
- dotenv

### Authentication

- Firebase

---

## Installation & Setup

### 1️ Clone the repository

```bash
git clone https://github.com/faysalhasanmd/bdTution
cd bdTution
```

### 2️ Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3️ Environment Variables

Frontend `.env`:

```
VITE_API_URL=https://bdtutionsf.vercel.app
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
```

Backend `.env`:

```
MONGODB_URI=your_mongodb_uri
STRIPE_SECRETE_KEY=your_stripe_key
FB_SERVICE_KEY=your_firebase_base64_key
PORT=3000
```

### 4️ Run locally

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```
