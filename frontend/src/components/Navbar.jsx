import React, { useState } from 'react';
import { 
  Heart, 
  Stethoscope, 
  Building2, 
  Users, 
  ShieldAlert, 
  Calendar, 
  Menu, 
  X, 
  ChevronDown,
  Activity,
  FileBarChart,
  Home,
  UserCheck,
  FileClock,
  Baby
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  viewMode, 
  setViewMode, 
  highRiskCount = 2,
  activeScrollSection,
  onNavClick
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const primaryNavLinks = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'risk', label: 'Risk Review', icon: ShieldAlert, badge: highRiskCount },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'admin', label: 'Hospital Admin', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
  ];

  const secondaryNavLinks = [
    { id: 'users', label: 'User Directory', icon: UserCheck, desc: 'Role permissions & staff roster' },
    { id: 'pregnancy-history', label: 'Pregnancy History', icon: FileClock, desc: 'Prior birth records & Mother docs' },
    { id: 'newborns', label: 'Newborn Registry', icon: Baby, desc: 'Birth vitals, APGAR & vaccines' },
  ];

  const currentActive = (activeTab === 'overview' && activeScrollSection) ? activeScrollSection : activeTab;
  const isSecondaryActive = secondaryNavLinks.some(link => link.id === currentActive);

  const handleLinkClick = (id) => {
    if (onNavClick) {
      onNavClick(id);
    } else {
      setActiveTab(id);
    }
    setMoreDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-brand-100/80 shadow-[0_2px_15px_rgba(139,92,246,0.05)] transition-all duration-200 w-full">
      {/* Full width container with generous padding */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Enlarged typography & crisp pod */}
          <div 
            onClick={() => handleLinkClick('overview')}
            className="flex items-center space-x-3.5 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-[12px] bg-gradient-to-tr from-brand-600 via-brand-500 to-purple-600 flex items-center justify-center text-white shadow-soft-purple group-hover:scale-105 transition-transform duration-200 ring-2 ring-brand-200/60">
              <div className="relative">
                <Heart className="w-6 h-6 fill-white stroke-white" />
                <Activity className="w-3.5 h-3.5 text-brand-700 absolute top-1 left-1 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[22px] font-bold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                  MaatriMitra
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 border border-brand-200 shadow-2xs">
                  AI
                </span>
              </div>
              <p className="text-[13px] text-brand-600 font-semibold -mt-0.5">Doctor & Admin Portal</p>
            </div>
          </div>

          {/* Center Navigation Links - Increased Font Size & Spacing (Design System) */}
          <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-2">
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentActive === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-[8px] text-[15px] font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-brand-700 bg-brand-50 font-bold border border-brand-200/60 shadow-2xs'
                      : 'text-slate-700 hover:text-brand-700 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600 stroke-[2.2]' : 'text-slate-500'}`} />
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-1 text-[11px] px-2 py-0.5 rounded-full font-black bg-rose-500 text-white shadow-2xs">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* "More Modules" Dropdown with increased typography */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-[8px] text-[15px] font-semibold transition-all cursor-pointer ${
                  isSecondaryActive
                    ? 'text-brand-700 bg-brand-50 font-bold border border-brand-200/60'
                    : 'text-slate-700 hover:text-brand-700 hover:bg-slate-100/70'
                }`}
                title="Access additional clinical modules"
              >
                <span>More</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-[16px] shadow-2xl border border-brand-100 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Extended Modules
                  </div>
                  {secondaryNavLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentActive === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleLinkClick(item.id)}
                        className={`w-full text-left p-3 rounded-[8px] flex items-start space-x-3 transition-colors cursor-pointer ${
                          isActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="p-2 rounded-[8px] bg-brand-100/70 text-brand-600 shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold">{item.label}</div>
                          <div className="text-[12px] text-slate-500 font-normal">{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section - Doctor Badge & Profile Dropdown */}
          <div className="hidden sm:flex items-center space-x-4 shrink-0">
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-3 pl-3 pr-4 py-2 rounded-full border border-brand-200/90 hover:border-brand-400 bg-white shadow-2xs hover:shadow-soft-purple transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-slate-900 text-[14px] leading-tight">Dr. Ananya Sharma</div>
                  <div className="text-[12px] text-brand-600 font-semibold capitalize">{viewMode} Mode</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs ml-1">
                  AS
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-[16px] shadow-2xl border border-brand-100 py-2.5 z-50 animate-in fade-in">
                  <div className="px-4 py-2.5 border-b border-brand-50">
                    <p className="text-[12px] text-slate-400 font-medium">Signed in as</p>
                    <p className="text-[15px] font-bold text-slate-800">Dr. Ananya Sharma, MD</p>
                    <p className="text-[12px] text-brand-600 font-medium">Chief Obstetrician & Center Head</p>
                  </div>
                  <div className="p-2 border-b border-brand-50">
                    <button
                      onClick={() => {
                        setViewMode('doctor');
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[8px] text-[13px] font-semibold flex items-center justify-between ${
                        viewMode === 'doctor' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>Doctor View</span>
                      {viewMode === 'doctor' && <span className="w-2 h-2 rounded-full bg-brand-600"></span>}
                    </button>
                    <button
                      onClick={() => {
                        setViewMode('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[8px] text-[13px] font-semibold flex items-center justify-between ${
                        viewMode === 'admin' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>Hospital Admin View</span>
                      {viewMode === 'admin' && <span className="w-2 h-2 rounded-full bg-brand-600"></span>}
                    </button>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        alert('Dr. Ananya Sharma signed out of clinical portal session.');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-[8px] text-[13px] font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-[8px] text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-100 bg-white/95 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top">
          {primaryNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentActive === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] text-[14px] font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 border border-brand-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-brand-600" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-rose-500 text-white">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
              More Modules
            </div>
            {secondaryNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentActive === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] font-semibold cursor-pointer ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-brand-600" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
