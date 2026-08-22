# eduPulseBd – Tuition Management System

> A full-stack MERN-based platform that seamlessly connects **students** with **qualified tutors** — with secure payments, role-based dashboards, and admin control.

---

## Live Links & Demo Credentials

| Platform    | Link                                                                                    |
| ----------- | --------------------------------------------------------------------------------------- |
| Live Site   | [preeminent-mermaid-04ba7b.netlify.app](https://preeminent-mermaid-04ba7b.netlify.app/) |
| GitHub Repo | [github.com/faysalhasanmd/bdTution](https://github.com/faysalhasanmd/bdTution)          |

> **These credentials are for demo/testing purposes only.**

### Student Account

| Field    | Value                |
| -------- | -------------------- |
| Email    | `alumarka@gmail.com` |
| Password | `aluMarka1234$`      |

### Tutor Account

| Field    | Value                        |
| -------- | ---------------------------- |
| Email    | `faysalhasanmd393@gmail.com` |
| Password | `Faysal12345$`               |

### Admin Account

| Field    | Value               |
| -------- | ------------------- |
| Email    | `Jamsher@gmail.com` |
| Password | `Jamsher1234$`      |

---

## Project Purpose

**eduPulseBd** is a MERN-stack Tuition Management System that connects students with qualified tutors in a structured and secure way.

### Why This Project?

- Solve the problem of finding **trusted tutors**
- Provide a **centralized tuition platform**
- Reduce communication gap between student & tutor
- Enable a **secure payment system**
- Help admin **monitor & control** platform activities

---

## Features

### Student Features

- Create, update, and delete tuition posts
- View and manage tutor applications
- Accept / Reject tutors
- Stripe payment for hiring a tutor
- View payment history

### Tutor Features

- Browse available tuition posts
- Apply for tuitions
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
- Protected routes (no redirect issue after reload)
- Secure environment variables (`.env`)
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

```
Student posts tuition → Status: Pending
↓
Admin approves → Status: Approved
↓
Tutors apply for tuition
↓
Student selects tutor → Payment via Stripe
↓
Tutor becomes Approved
```

---

## Advanced Features

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

| Package             | Purpose             |
| ------------------- | ------------------- |
| React.js            | UI Framework        |
| React Router        | Client-side routing |
| Tailwind CSS        | Styling             |
| DaisyUI             | UI Components       |
| Framer Motion       | Animations          |
| Axios               | HTTP requests       |
| AOS                 | Scroll animations   |
| React Hook Form     | Form handling       |
| Chart.js / Recharts | Data visualization  |

### Backend

| Package    | Purpose               |
| ---------- | --------------------- |
| Node.js    | Runtime               |
| Express.js | Server framework      |
| MongoDB    | Database              |
| JWT        | Authorization         |
| Stripe API | Payment processing    |
| CORS       | Cross-origin support  |
| dotenv     | Environment variables |

### Authentication

| Service  | Purpose                        |
| -------- | ------------------------------ |
| Firebase | Auth (Email, Password, Google) |

---

## Installation & Setup

### 1 Clone the Repository

```bash
git clone https://github.com/faysalhasanmd/bdTution
cd bdTution
```

### 2 Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3 Environment Variables

**Frontend `.env`:**

```env
VITE_API_URL=https://bdtutionsf.vercel.app
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
```

**Backend `.env`:**

```env
MONGODB_URI=your_mongodb_uri
STRIPE_SECRETE_KEY=your_stripe_key
FB_SERVICE_KEY=your_firebase_base64_key
PORT=3000
```

### 4 Run Locally

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

---

<div align="center">
Made with by <a href="https://github.com/faysalhasanmd">Faysal Hasan</a>
</div>
