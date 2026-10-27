# MaatriCare AI — Doctor & Hospital Administrator Shared Portal (MERN Stack)

A rural maternal healthcare decision support and hospital administration portal built on the **MERN (MongoDB, Express, React, Node.js)** stack.

This portal mirrors the layout, visual hierarchy, and soft rounded aesthetic of the **Mother interface**, styled in the signature color **`#8B5CF6`** (vibrant violet) and its lighter gradients (`#A78BFA`, `#C4B5FD`, `#DDD6FE`, `#EDE9FE`, `#F5F3FF`).

---

## 🎨 Visual Design & Layout

- **Unified Doctor & Hospital Administrator Portal**: Both roles share the same dashboard with instant view-switching (`Doctor Clinical View` ↔ `Hospital Administrator View`).
- **Signature Hero Section**:
  - Dual-tone headline: *"A Healthier Tomorrow / For Every Mother & Baby"*
  - Clinical decision support tagline and pill CTA buttons (*"Review High Risk Cases →"*, *"Hospital Facility Stats"*)
  - Right-hand doctor clinical illustration card with italic motto *"Dedicated Care, Brighter Tomorrows"* and real-time alert counters.
- **Elevated Floating Bottom Card** (Exact clone of the Mother UI layout):
  - Pill switcher tabs: `[🩺 Patient Roster & Risk]` `[📅 Clinical Appointments]` `[📊 Hospital Facility Stats]`
  - 4 quick-action soft violet cards:
    1. **Track Patients & Vitals**: Gestational weeks, BP, Blood Sugar, Hb, BMI.
    2. **Review AI Risk**: ML Low/Medium/High predictions with confidence gauge & clinical explanations.
    3. **Clinical Consults**: Scheduled appointments, antenatal visits & doctor notes.
    4. **Hospital Analytics**: Bed capacity, ICU status, ASHA worker metrics & audit reports.
- **Fully Mobile Responsive**: Adapts seamlessly to smartphones, tablets, and desktops with hamburger drawer navigation and touch-friendly cards.

---

## 🗂️ Project Structure

```
maatricare-portal/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic (with offline fallback)
│   ├── controllers/
│   │   ├── authController.js     # User authentication & demo session
│   │   ├── patientController.js  # Maternal profiles & vitals filtering
│   │   ├── riskController.js     # ML-based AI risk prediction & explanations
│   │   ├── appointmentController.js # Clinical consults scheduling
│   │   ├── recommendationController.js # Doctor care plans & prescriptions
│   │   └── adminController.js    # Hospital analytics, user directory & reports
│   ├── models/
│   │   ├── User.js               # Roles: Doctor, Hospital Admin, ASHA, Mother
│   │   ├── Patient.js            # Vitals, gestational weeks, obstetric history
│   │   ├── RiskAssessment.js     # Risk level, confidence score, biomarker factors
│   │   ├── Appointment.js        # Scheduled visits & status
│   │   ├── Recommendation.js     # Care plans, medication, diet & referrals
│   │   └── HospitalStats.js      # Facility metrics & risk distribution
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── patientRoutes.js
│   │   ├── riskRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── recommendationRoutes.js
│   │   └── adminRoutes.js
│   ├── server.js                 # Express server entry point (Port 5000)
│   ├── seed.js                   # Seed script for MongoDB
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Pill navigation & role switcher
    │   │   ├── HeroSection.jsx   # Hero section matching Mother UI
    │   │   ├── QuickActionNav.jsx# Elevated floating bottom card
    │   │   ├── PatientRoster.jsx # Patient directory with vitals & risk badges
    │   │   ├── RiskReviewModal.jsx # Detailed ML risk explanation & doctor review
    │   │   ├── RecommendationModal.jsx # Doctor prescriptions & care plans
    │   │   ├── HospitalAnalytics.jsx # Hospital admin stats, bed capacity & charts
    │   │   ├── UserManagement.jsx# User directory & staff registration
    │   │   ├── AppointmentsList.jsx # Clinical appointments list & booking
    │   │   ├── ReportsView.jsx   # Printable clinical and hospital audit document
    │   │   └── Footer.jsx        # Branded footer & emergency hotline
    │   ├── data/
    │   │   └── mockData.js       # Preloaded clinical data matching backend schemas
    │   ├── App.jsx               # Dashboard controller
    │   ├── main.jsx
    │   └── index.css             # Tailwind base & custom gradients
    ├── tailwind.config.js        # Color palette configured for #8B5CF6 & lighter tints
    ├── vite.config.js
    └── package.json
```

---

## 🚀 How to Run

### 1. Frontend (React + Vite)
```bash
cd "C:\Users\Gauri kutty\.gemini\antigravity\scratch\maatricare-portal\frontend"
npm install    # (Already completed)
npm run dev
```
The frontend will start at **http://localhost:3000** (or 5173).

### 2. Backend (Node.js + Express)
```bash
cd "C:\Users\Gauri kutty\.gemini\antigravity\scratch\maatricare-portal\backend"
npm install    # (Already completed)
npm start
```
The API server will start at **http://localhost:5000**.
