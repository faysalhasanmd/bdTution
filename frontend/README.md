# eduPulseBd – Tuition Management System

## Live Links

- **Live Site:** https://cerulean-maamoul-f79e46.netlify.app/
- **Client Repo:** https://github.com/faysalhasanmd/eduPulseBd/tree/main/frontend
- **Server Repo:** https://github.com/faysalhasanmd/eduPulseBd/tree/main/backend

---

## Project Purpose

**eduPulseBd** is a MERN-stack Tuition Management System that connects students with qualified tutors in a structured and secure way.

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

### 1️ Clone the repositories

```bash
git clone https://github.com/faysalhasanmd/eduPulseBd/tree/main/frontend
git clone https://github.com/faysalhasanmd/eduPulseBd/tree/main/backend
```
