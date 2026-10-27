import React from 'react';
import { 
  Home, 
  Users, 
  ShieldAlert, 
  Calendar, 
  Building2, 
  UserCheck, 
  FileClock, 
  Baby, 
  FileBarChart, 
  Heart,
  Activity
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, highRiskCount = 2 }) {
  const menuItems = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'risk', label: 'Risk Review', icon: ShieldAlert, badge: highRiskCount },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'admin', label: 'Hospital Admin', icon: Building2 },
    { id: 'users', label: 'User Directory', icon: UserCheck },
    { id: 'pregnancy-history', label: 'Pregnancy History', icon: FileClock },
    { id: 'newborns', label: 'Newborn Registry', icon: Baby },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#FAF8FE]/90 backdrop-blur-xl border-r border-brand-100/80 h-full flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* Top Menu Links */}
      <div className="p-4 sm:p-5 space-y-1 z-10">
        <div className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Clinical Portal
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[8px] text-[14px] font-semibold transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-100/90 text-brand-700 font-bold shadow-2xs border border-brand-200/60'
                  : 'text-slate-700 hover:text-brand-700 hover:bg-white/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-brand-600 stroke-[2.2]' : 'text-slate-500'
                }`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-rose-500 text-white shadow-2xs">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Decorative Bottom Corner with Tagline & Organic Wave matching reference image */}
      <div className="p-5 pb-6 relative z-10">
        <div className="pt-3 border-t border-brand-100/60">
          <div className="flex items-center space-x-2 mb-1.5">
            <div className="w-7 h-7 rounded-[8px] bg-white/90 border border-brand-200/60 flex items-center justify-center text-brand-600 shadow-2xs">
              <Activity className="w-4 h-4" />
            </div>
            <Heart className="w-4 h-4 text-brand-500 fill-brand-300" />
          </div>
          <p className="text-[12px] text-slate-600 font-normal leading-relaxed">
            Better care,<br />
            <span className="text-brand-600 font-bold">healthier tomorrows</span>
          </p>
        </div>
      </div>

      {/* Signature Dual Organic Waves matching bottom-left of reference image */}
      <div className="absolute bottom-0 left-0 w-52 h-44 pointer-events-none z-0">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 208 176" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer large gentle wave */}
          <path 
            d="M0 65C55 65 85 95 110 128C130 152 165 170 208 176H0V65Z" 
            fill="url(#sidebarWaveOuter)" 
            opacity="0.45"
          />
          {/* Inner deeper violet wave */}
          <path 
            d="M0 105C42 105 68 126 92 148C110 162 134 172 160 176H0V105Z" 
            fill="url(#sidebarWaveInner)" 
            opacity="0.65"
          />
          <defs>
            <linearGradient id="sidebarWaveOuter" x1="0" y1="65" x2="208" y2="176" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DDD6FE" />
              <stop offset="0.7" stopColor="#C4B5FD" />
              <stop offset="1" stopColor="#A78BFA" />
            </linearGradient>
            <linearGradient id="sidebarWaveInner" x1="0" y1="105" x2="160" y2="176" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C4B5FD" />
              <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle violet ambient glow orb */}
      <div className="absolute top-1/3 -right-10 w-32 h-32 rounded-full bg-brand-300/15 pointer-events-none blur-2xl" />
    </aside>
  );
}
