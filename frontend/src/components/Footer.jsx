import React from 'react';
import { Heart, Activity, PhoneCall, ShieldCheck, Mail, Hospital } from 'lucide-react';

export default function Footer({ onNavClick }) {
  return (
    <footer className="bg-white border-t border-brand-100/90 mt-16 pt-12 pb-8">
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-brand-50">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-soft-purple">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">MaatriMitra AI</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              An intelligent rural maternal healthcare decision support and hospital administrative platform.
            </p>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Unified Clinical & Admin Portal</span>
            </div>
          </div>

          {/* Quick Access */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Doctor Modules</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <button onClick={() => onNavClick('patients')} className="hover:text-brand-600 transition-colors">
                  Patient Health Records & Vitals
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('risk')} className="hover:text-brand-600 transition-colors">
                  Clinical Risk Prediction & Factor Review
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('appointments')} className="hover:text-brand-600 transition-colors">
                  Clinical Appointments & Consults
                </button>
              </li>
            </ul>
          </div>

          {/* Admin Modules */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Hospital Administration</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <button onClick={() => onNavClick('admin')} className="hover:text-brand-600 transition-colors">
                  Facility Bed & ICU Capacity
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('users')} className="hover:text-brand-600 transition-colors">
                  Staff Role Directory & Permissions
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('reports')} className="hover:text-brand-600 transition-colors">
                  Facility Audit & Monthly Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Support / Emergency Helpdesk */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Clinical Support & Dispatch</h4>
            <div className="space-y-2 text-slate-600">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-brand-600 shrink-0" />
                <span>108 / 102 Emergency Obstetric Ambulance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Hospital className="w-4 h-4 text-brand-600 shrink-0" />
                <span>District Rural General Hospital, Ward 3</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <span>clinical-support@maatricare.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 MaatriMitra AI Rural Maternal Care Initiative. All clinical protocols aligned with WHO & FOGSI.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="hover:text-slate-600 cursor-pointer">HIPAA & DISHA Compliance</span>
            <span className="hover:text-slate-600 cursor-pointer">Clinical Privacy Terms</span>
            <span className="hover:text-slate-600 cursor-pointer">Security Audits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
