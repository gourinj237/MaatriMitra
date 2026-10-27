import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import QuickActionNav from './components/QuickActionNav';
import PatientRoster from './components/PatientRoster';
import RiskReviewModal from './components/RiskReviewModal';
import RecommendationModal from './components/RecommendationModal';
import HospitalAnalytics from './components/HospitalAnalytics';
import UserManagement from './components/UserManagement';
import AppointmentsList from './components/AppointmentsList';
import PreviousPregnancyHistory from './components/PreviousPregnancyHistory';
import NewbornRegistration from './components/NewbornRegistration';
import ReportsView from './components/ReportsView';
import Footer from './components/Footer';

import { 
  ArrowUpRight,
  ShieldAlert,
  Users,
  Calendar,
  Building2,
  FileBarChart,
  UserCheck,
  FileClock,
  Baby
} from 'lucide-react';

import { 
  INITIAL_PATIENTS, 
  HOSPITAL_STATS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_USERS,
  INITIAL_PREVIOUS_PREGNANCY_HISTORY,
  INITIAL_NEWBORNS
} from './data/mockData';

export default function App() {
  // Navigation & View state
  // Tabs: overview, patients, risk, appointments, admin, users, pregnancy-history, newborns, reports
  const [activeTab, setActiveTab] = useState('overview'); 
  const [activeSubView, setActiveSubView] = useState('roster'); // roster, appointments, analytics
  const [viewMode, setViewMode] = useState('doctor'); // 'doctor' or 'admin'
  const [activeScrollSection, setActiveScrollSection] = useState('overview');

  const homeContainerRef = useRef(null);

  // Application Data state
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [hospitalStats, setHospitalStats] = useState(HOSPITAL_STATS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [previousPregnancyHistory, setPreviousPregnancyHistory] = useState(INITIAL_PREVIOUS_PREGNANCY_HISTORY);
  const [newborns, setNewborns] = useState(INITIAL_NEWBORNS);

  // Active Modals
  const [selectedPatientForRisk, setSelectedPatientForRisk] = useState(null);
  const [selectedPatientForRec, setSelectedPatientForRec] = useState(null);

  // Scrollspy: track which section is visible when scrolling on the home page
  useEffect(() => {
    if (activeTab !== 'overview') return;
    const container = homeContainerRef.current;
    if (!container) return;

    const sectionMap = [
      { id: 'overview', elId: 'hero-section' },
      { id: 'patients', elId: 'section-patients' },
      { id: 'risk', elId: 'section-risk' },
      { id: 'appointments', elId: 'section-appointments' },
      { id: 'admin', elId: 'section-admin' },
      { id: 'reports', elId: 'section-reports' },
      { id: 'users', elId: 'section-users' },
      { id: 'pregnancy-history', elId: 'section-pregnancy-history' },
      { id: 'newborns', elId: 'section-newborns' },
    ];

    const onScroll = () => {
      const scrollPos = container.scrollTop;
      if (scrollPos < 120) {
        setActiveScrollSection('overview');
        return;
      }

      const checkPos = scrollPos + 220;
      for (let i = sectionMap.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionMap[i].elId);
        if (el) {
          if (checkPos >= el.offsetTop) {
            setActiveScrollSection(sectionMap[i].id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [activeTab]);

  // Smooth scroll helper
  const scrollToSection = (sectionId) => {
    setActiveScrollSection(sectionId);
    const container = homeContainerRef.current;
    if (!container) return;

    if (sectionId === 'overview' || sectionId === 'hero') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(`section-${sectionId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Unified Navbar click handler supporting scroll navigation
  const handleNavClick = (targetId) => {
    if (activeTab === 'overview') {
      scrollToSection(targetId);
    } else {
      if (targetId === 'overview') {
        setActiveTab('overview');
        setTimeout(() => {
          scrollToSection('overview');
        }, 80);
      } else {
        setActiveTab(targetId);
      }
    }
  };

  // Quick Action Card Selection from Floating Hub
  const handleCardSelect = (cardId) => {
    if (activeTab === 'overview') {
      scrollToSection(cardId);
    } else {
      setActiveTab(cardId);
    }

    if (cardId === 'risk') {
      const highRiskPatient = patients.find(p => p.currentRiskLevel === 'High Risk');
      if (highRiskPatient) {
        setSelectedPatientForRisk(highRiskPatient);
      }
    }
  };

  // Hero Section CTA Clicks
  const handleReviewRiskClick = () => {
    handleNavClick('risk');
    const highRiskPatient = patients.find(p => p.currentRiskLevel === 'High Risk');
    if (highRiskPatient) {
      setSelectedPatientForRisk(highRiskPatient);
    }
  };

  const handleAdminClick = () => {
    handleNavClick('admin');
  };

  // Clinical Review Confirmation
  const handleConfirmReview = (patientId, notes) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p._id === patientId) {
          return {
            ...p,
            doctorNotes: notes,
            reviewedByDoctor: true,
          };
        }
        return p;
      })
    );
  };

  // Add Care Plan / Recommendation
  const handleSaveRecommendation = (rec) => {
    alert(`Clinical Care Plan successfully recorded for ${rec.patientName}! Instructions dispatched to ASHA worker.`);
  };

  // Add User / Staff
  const handleAddUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  // Book Appointment
  const handleBookAppointment = (newApt) => {
    setAppointments((prev) => [newApt, ...prev]);
  };

  // Ensure Appointment Visit Has Completed
  const handleCompleteAppointment = (aptId) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt._id === aptId) {
          return {
            ...apt,
            status: 'Completed',
            completedTimestamp: new Date().toLocaleTimeString(),
          };
        }
        return apt;
      })
    );
  };

  // Register Newborn
  const handleRegisterNewborn = (newborn) => {
    setNewborns((prev) => [newborn, ...prev]);
  };

  const highRiskPatientsCount = patients.filter(p => p.currentRiskLevel === 'High Risk').length;

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gradient-to-br from-[#F6F3FE] via-[#FAF8FF] to-[#EFE9FC] text-slate-800 font-sans selection:bg-brand-200 selection:text-brand-900 relative">
      
      {/* Top Navigation Bar with scroll navigation & active indicator */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        highRiskCount={highRiskPatientsCount}
        activeScrollSection={activeScrollSection}
        onNavClick={handleNavClick}
      />

      {/* Main Container below Top Navbar */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* TOP-RIGHT FLOWING VIOLET GRADIENT WAVE matching reference image */}
        <div className="absolute -top-6 -right-6 w-[560px] h-[380px] pointer-events-none z-0 overflow-hidden">
          <svg 
            className="w-full h-full opacity-65" 
            viewBox="0 0 560 380" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M560 0H200C280 80 310 150 250 220C170 310 270 370 370 380H560V0Z" 
              fill="url(#topRightWave1)" 
            />
            <path 
              d="M560 0H290C360 65 390 120 340 185C280 265 370 340 450 380H560V0Z" 
              fill="url(#topRightWave2)" 
              opacity="0.8"
            />
            <defs>
              <linearGradient id="topRightWave1" x1="200" y1="0" x2="560" y2="380" gradientUnits="userSpaceOnUse">
                <stop stopColor="#DDD6FE" stopOpacity="0.85" />
                <stop offset="0.5" stopColor="#C4B5FD" stopOpacity="0.6" />
                <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="topRightWave2" x1="290" y1="0" x2="560" y2="380" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E9D5FF" stopOpacity="0.9" />
                <stop offset="0.6" stopColor="#DDD6FE" stopOpacity="0.7" />
                <stop offset="1" stopColor="#A78BFA" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* AMBIENT VIOLET LIGHTING BEHIND THE DIV CARDS */}
        <div className="absolute top-1/4 left-1/4 w-[650px] h-[550px] rounded-full bg-brand-300/18 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-10 right-1/4 w-[550px] h-[450px] rounded-full bg-purple-300/18 blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-2/3 left-10 w-[450px] h-[350px] rounded-full bg-indigo-200/15 blur-[100px] pointer-events-none z-0" />

        {/* Conditionally Render: Landing Page with Scroll Navigation vs Dedicated Sidebar View */}
        {activeTab === 'overview' ? (
          /* LANDING PAGE WITH SCROLL NAVIGATION ACROSS ALL NAVBAR SECTIONS */
          <main 
            ref={homeContainerRef}
            id="home-scroll-container" 
            className="flex-1 overflow-y-auto z-10 scroll-smooth"
          >
            {/* 1. HERO SECTION */}
            <HeroSection
              onReviewRiskClick={handleReviewRiskClick}
              onAdminClick={handleAdminClick}
              stats={hospitalStats}
            />

            {/* 2. CLINICAL OPERATIONS & SECTION NAVIGATION HUB (Wider Length) */}
            <QuickActionNav
              activeSubView={activeSubView}
              setActiveSubView={setActiveSubView}
              onCardSelect={handleCardSelect}
            />

            {/* 3. PATIENTS SECTION */}
            <section 
              id="section-patients" 
              className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-16 scroll-mt-24 space-y-5"
            >
              <div className="bg-white rounded-[16px] p-6 border border-brand-100 shadow-[0_4px_25px_rgba(139,92,246,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-[10px] bg-brand-500 text-white flex items-center justify-center shadow-soft-purple">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 border border-brand-200">
                        Section 1.1 • Active Telemetry
                      </span>
                    </div>
                    <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mt-0.5">
                      Patient Health Roster
                    </h2>
                    <p className="text-[14px] text-slate-500">
                      Track maternal vitals, BP, blood sugar, and gestational progress across rural clusters.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('patients')}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-brand-200 bg-brand-50/60 hover:bg-brand-100 text-brand-700 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  <span>Open Dedicated Workspace</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <PatientRoster
                patients={patients}
                onSelectPatientForRisk={(p) => setSelectedPatientForRisk(p)}
                onSelectPatientForRec={(p) => setSelectedPatientForRec(p)}
              />
            </section>

            {/* 4. RISK REVIEW & TELEMETRY SECTION */}
            <section 
              id="section-risk" 
              className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-16 scroll-mt-24 space-y-5"
            >
              <div className="bg-gradient-to-r from-rose-50/90 via-white to-purple-50/80 rounded-[16px] p-6 border border-rose-200/80 shadow-[0_4px_25px_rgba(244,63,94,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-[10px] bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                        Section 1.2 • Urgent AI Stratification
                      </span>
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-rose-600 text-white">
                        {highRiskPatientsCount} Critical Detected
                      </span>
                    </div>
                    <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mt-0.5">
                      Clinical Risk Surveillance &amp; Urgent Telemetry
                    </h2>
                    <p className="text-[14px] text-slate-500">
                      Algorithmic biomarker triage, immediate maternal alerts, and clinician escalation.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('risk')}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  <span>Open Dedicated Risk Suite</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <PatientRoster
                patients={patients.filter((p) => p.currentRiskLevel === 'High Risk')}
                onSelectPatientForRisk={(p) => setSelectedPatientForRisk(p)}
                onSelectPatientForRec={(p) => setSelectedPatientForRec(p)}
              />
            </section>

            {/* 5. APPOINTMENTS SECTION */}
            <section 
              id="section-appointments" 
              className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-16 scroll-mt-24 space-y-5"
            >
              <div className="bg-white rounded-[16px] p-6 border border-brand-100 shadow-[0_4px_25px_rgba(139,92,246,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-[10px] bg-amber-500 text-white flex items-center justify-center shadow-soft-purple">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        Section 1.3 • Antenatal Schedule
                      </span>
                    </div>
                    <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mt-0.5">
                      Antenatal Appointments &amp; Clinical Visits
                    </h2>
                    <p className="text-[14px] text-slate-500">
                      Consultations, ultrasound trimester scans, and complete visit tracking.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('appointments')}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  <span>Open Calendar Workspace</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <AppointmentsList
                appointments={appointments}
                onBookAppointment={handleBookAppointment}
                onCompleteAppointment={handleCompleteAppointment}
              />
            </section>

            {/* 6. HOSPITAL ADMIN / OPERATIONS SECTION */}
            <section 
              id="section-admin" 
              className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-16 scroll-mt-24 space-y-5"
            >
              <div className="bg-white rounded-[16px] p-6 border border-brand-100 shadow-[0_4px_25px_rgba(139,92,246,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-[10px] bg-purple-600 text-white flex items-center justify-center shadow-soft-purple">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                        Section 1.4 • Healthcare Logistics
                      </span>
                    </div>
                    <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mt-0.5">
                      Hospital Facility, Beds &amp; Network Analytics
                    </h2>
                    <p className="text-[14px] text-slate-500">
                      Facility bed capacity, maternal ICU units, and PHC cluster network.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setViewMode('admin');
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  <span>Open Hospital Admin Suite</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <HospitalAnalytics
                stats={hospitalStats}
                onExportReport={() => handleNavClick('reports')}
              />
            </section>

            {/* 7. CLINICAL AUDIT REPORTS SECTION */}
            <section 
              id="section-reports" 
              className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-16 scroll-mt-24 space-y-5"
            >
              <div className="bg-white rounded-[16px] p-6 border border-brand-100 shadow-[0_4px_25px_rgba(139,92,246,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-[10px] bg-slate-800 text-white flex items-center justify-center shadow-soft-purple">
                    <FileBarChart className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        Section 1.5 • Healthcare Compliance
                      </span>
                    </div>
                    <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mt-0.5">
                      Clinical Audit &amp; Outcomes Reports
                    </h2>
                    <p className="text-[14px] text-slate-500">
                      Official monthly maternal outcomes report, risk assessment audits, and referral metrics.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('reports')}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  <span>Open Full Reports Suite</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <ReportsView
                stats={hospitalStats}
                patients={patients}
              />
            </section>

            {/* 8. EXTENDED MODULES (User Directory, Pregnancy Records, Newborn Registry) */}
            <section 
              id="section-users" 
              className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-16 scroll-mt-24 space-y-5"
            >
              <div className="bg-white rounded-[16px] p-6 border border-brand-100 shadow-[0_4px_25px_rgba(139,92,246,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-[10px] bg-indigo-600 text-white flex items-center justify-center shadow-soft-purple">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
                      Extended Module • Access Control
                    </span>
                    <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mt-0.5">
                      Platform User Directory &amp; Staff Roles
                    </h2>
                    <p className="text-[14px] text-slate-500">
                      Manage Doctors, Admins, ASHA Workers, and registered Mothers.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('users')}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  <span>Open User Directory</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <UserManagement
                users={users}
                onAddUser={handleAddUser}
              />
            </section>

            <section 
              id="section-pregnancy-history" 
              className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-16 scroll-mt-24 space-y-5"
            >
              <div className="bg-white rounded-[16px] p-6 border border-brand-100 shadow-[0_4px_25px_rgba(139,92,246,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-[10px] bg-teal-600 text-white flex items-center justify-center shadow-soft-purple">
                    <FileClock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 border border-teal-200">
                      Extended Module • Mother EHR
                    </span>
                    <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mt-0.5">
                      Previous Pregnancy Records &amp; Mother Docs
                    </h2>
                    <p className="text-[14px] text-slate-500">
                      Archived Mother Dashboard documents and records for 2nd+ pregnancies.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('pregnancy-history')}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  <span>Open History Workspace</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <PreviousPregnancyHistory
                historyData={previousPregnancyHistory}
                currentPatient={patients.find((p) => p.pregnancyDetails?.gravida > 1) || patients[0]}
              />
            </section>

            <section 
              id="section-newborns" 
              className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-16 scroll-mt-24 space-y-5"
            >
              <div className="bg-white rounded-[16px] p-6 border border-brand-100 shadow-[0_4px_25px_rgba(139,92,246,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-[10px] bg-emerald-600 text-white flex items-center justify-center shadow-soft-purple">
                    <Baby className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                      Extended Module • Delivery Registry
                    </span>
                    <h2 className="text-[22px] font-bold text-slate-900 tracking-tight mt-0.5">
                      Newborn Delivery Registry &amp; APGAR Records
                    </h2>
                    <p className="text-[14px] text-slate-500">
                      Institutional births, neonatal health scoring, and birth-dose immunization.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('newborns')}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  <span>Open Newborn Registry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <NewbornRegistration
                newborns={newborns}
                onRegisterNewborn={handleRegisterNewborn}
              />
            </section>

            {/* FOOTER */}
            <Footer onNavClick={handleNavClick} />
          </main>
        ) : (
          /* DEDICATED WORKSPACE MODE WITH FIXED NON-MOVABLE LEFT SIDEBAR */
          <>
            {/* FIXED LEFT SIDEBAR - Permanently docked, non-movable on scroll */}
            <div className="hidden md:block z-20 shrink-0 h-full overflow-y-auto">
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                highRiskCount={highRiskPatientsCount}
              />
            </div>

            {/* Main Workspace Area - Independently scrollable */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl z-10 relative">
              
              {/* 1. PATIENTS */}
              {activeTab === 'patients' && (
                <PatientRoster
                  patients={patients}
                  onSelectPatientForRisk={(p) => setSelectedPatientForRisk(p)}
                  onSelectPatientForRec={(p) => setSelectedPatientForRec(p)}
                />
              )}

              {/* 2. RISK REVIEW */}
              {activeTab === 'risk' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-[16px] p-6 border border-brand-100 shadow-soft-purple">
                    <h2 className="text-[20px] font-semibold text-slate-900">Clinical Risk Surveillance</h2>
                    <p className="text-[14px] text-slate-500 mt-1">
                      Real-time telemetry and algorithmic stratification for rural maternal emergencies.
                    </p>
                  </div>
                  <PatientRoster
                    patients={patients.filter((p) => p.currentRiskLevel === 'High Risk')}
                    onSelectPatientForRisk={(p) => setSelectedPatientForRisk(p)}
                    onSelectPatientForRec={(p) => setSelectedPatientForRec(p)}
                  />
                </div>
              )}

              {/* 3. APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <AppointmentsList
                  appointments={appointments}
                  onBookAppointment={handleBookAppointment}
                  onCompleteAppointment={handleCompleteAppointment}
                />
              )}

              {/* 4. HOSPITAL ADMIN / OPERATIONS */}
              {activeTab === 'admin' && (
                <HospitalAnalytics
                  stats={hospitalStats}
                  onExportReport={() => handleNavClick('reports')}
                />
              )}

              {/* 5. USER MANAGEMENT (STANDALONE PAGE) */}
              {activeTab === 'users' && (
                <UserManagement
                  users={users}
                  onAddUser={handleAddUser}
                />
              )}

              {/* 6. PREVIOUS PREGNANCY HISTORY (2nd PREGNANCY & MOTHER DASHBOARD DOCS) */}
              {activeTab === 'pregnancy-history' && (
                <PreviousPregnancyHistory
                  historyData={previousPregnancyHistory}
                  currentPatient={patients.find((p) => p.pregnancyDetails?.gravida > 1) || patients[0]}
                />
              )}

              {/* 7. NEWBORN REGISTRATION MODULE */}
              {activeTab === 'newborns' && (
                <NewbornRegistration
                  newborns={newborns}
                  onRegisterNewborn={handleRegisterNewborn}
                />
              )}

              {/* 8. REPORTS */}
              {activeTab === 'reports' && (
                <ReportsView
                  stats={hospitalStats}
                  patients={patients}
                />
              )}
            </main>
          </>
        )}
      </div>

      {/* Clinical AI Risk Review Modal */}
      {selectedPatientForRisk && (
        <RiskReviewModal
          patient={selectedPatientForRisk}
          onClose={() => setSelectedPatientForRisk(null)}
          onConfirmReview={handleConfirmReview}
          onOpenCarePlan={(p) => setSelectedPatientForRec(p)}
        />
      )}

      {/* Clinical Care Recommendation Modal */}
      {selectedPatientForRec && (
        <RecommendationModal
          patient={selectedPatientForRec}
          onClose={() => setSelectedPatientForRec(null)}
          onSaveRecommendation={handleSaveRecommendation}
        />
      )}
    </div>
  );
}
