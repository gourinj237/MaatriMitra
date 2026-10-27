import React from 'react';
import { 
  HeartPulse, 
  Calendar, 
  Users, 
  Building2, 
  UserCheck,
  FileClock,
  Baby,
  FileBarChart,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Activity
} from 'lucide-react';

export default function QuickActionNav({ 
  activeSubView, 
  setActiveSubView, 
  onCardSelect 
}) {
  const allSectionCards = [
    {
      id: 'patients',
      title: 'Patient Health Roster',
      description: 'Track maternal vitals, BP, blood sugar, and gestational progress.',
      icon: Users,
      iconBg: 'bg-brand-500 text-white',
      badge: '142 Registered',
      badgeColor: 'bg-brand-100 text-brand-800 border-brand-200',
    },
    {
      id: 'risk',
      title: 'Risk Review & Telemetry',
      description: 'Review critical biomarker predictions and issue urgent clinical care.',
      icon: ShieldAlert,
      iconBg: 'bg-rose-500 text-white',
      badge: '19 High-Risk',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      id: 'appointments',
      title: 'Antenatal Appointments',
      description: 'Consultations, ultrasound trimester scans & complete visit tracking.',
      icon: Calendar,
      iconBg: 'bg-amber-500 text-white',
      badge: '4 Scheduled',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    },
    {
      id: 'admin',
      title: 'Hospital Facility & Beds',
      description: 'Facility bed capacity, maternal ICU units, and PHC cluster network.',
      icon: Building2,
      iconBg: 'bg-purple-600 text-white',
      badge: '34/50 Beds',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
    },
    {
      id: 'users',
      title: 'Platform User Directory',
      description: 'Manage Doctors, Admins, ASHA Workers, and registered Mothers.',
      icon: UserCheck,
      iconBg: 'bg-indigo-600 text-white',
      badge: 'Roles & Access',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    },
    {
      id: 'pregnancy-history',
      title: 'Previous Pregnancy Records',
      description: 'Archived Mother Dashboard documents and records for 2nd+ pregnancies.',
      icon: FileClock,
      iconBg: 'bg-teal-600 text-white',
      badge: 'Mother EHR Synced',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-200',
    },
    {
      id: 'newborns',
      title: 'Newborn Delivery Registry',
      description: 'Institutional births, APGAR assessment, and birth-dose vaccines.',
      icon: Baby,
      iconBg: 'bg-emerald-600 text-white',
      badge: '4 Registered',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    },
    {
      id: 'reports',
      title: 'Clinical Audit Reports',
      description: 'Monthly maternal outcomes, facility telemetry, and printable PDF audits.',
      icon: FileBarChart,
      iconBg: 'bg-slate-800 text-white',
      badge: 'Monthly Audit',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <div 
      id="navigation-hub" 
      className="relative -mt-6 md:-mt-10 mb-12 w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 z-20 space-y-6 scroll-mt-24"
    >
      
      {/* Floating Elevated Card - Matching Design System */}
      <div className="relative bg-gradient-to-br from-white/95 via-[#FAF8FF] to-brand-50/50 rounded-[16px] p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_-15px_rgba(139,92,246,0.12)] border border-brand-200/80 backdrop-blur-xl overflow-hidden">
        
        {/* Top ambient gradient highlight strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-purple-400 to-indigo-500" />
        
        {/* Header inside floating card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-[22px] sm:text-[24px] font-bold text-slate-900 tracking-tight flex items-center space-x-2.5">
              <Activity className="w-6 h-6 text-brand-600 shrink-0" />
              <span>Clinical Operations &amp; Section Navigation Hub</span>
            </h3>
            <p className="text-[14px] sm:text-[15px] text-slate-500 mt-1 font-normal">
              Quickly preview clinical views below or jump directly to any portal section.
            </p>
          </div>

          {/* Inline Subview Switcher Pills (Design System: Badges/Pills 999px) */}
          <div className="inline-flex p-1.5 rounded-full bg-brand-100/70 border border-brand-200/80 max-w-full overflow-x-auto scrollbar-none shrink-0 shadow-2xs">
            <button
              onClick={() => {
                setActiveSubView('roster');
                onCardSelect('patients');
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeSubView === 'roster'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-700 hover:bg-white/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Preview Roster</span>
            </button>

            <button
              onClick={() => {
                setActiveSubView('appointments');
                onCardSelect('appointments');
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeSubView === 'appointments'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-700 hover:bg-white/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Preview Visits</span>
            </button>

            <button
              onClick={() => {
                setActiveSubView('analytics');
                onCardSelect('admin');
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeSubView === 'analytics'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-brand-700 hover:bg-white/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Preview Facility</span>
            </button>
          </div>
        </div>

        {/* 8-Section Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {allSectionCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onCardSelect(card.id)}
                className="group bg-white rounded-[14px] p-5 border border-brand-100 hover:border-brand-300 hover:shadow-soft-purple transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden transform hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Row: Icon on left, status pill on right (rounded-full) */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-[8px] ${card.iconBg} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${card.badgeColor} border`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Card Title (H3: 16px SemiBold per design system) */}
                  <h4 className="text-[16px] font-semibold text-slate-900 group-hover:text-brand-700 transition-colors leading-tight">
                    {card.title}
                  </h4>

                  {/* Card Description (Body: 14px Regular per design system) */}
                  <p className="text-[14px] text-slate-500 mt-1.5 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Bottom link: Caption 12px Regular with micro arrow */}
                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[12px] font-semibold text-brand-600 group-hover:text-brand-800">
                  <span>Open Section</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
