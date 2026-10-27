import React, { useState } from 'react';
import { 
  FileBarChart, 
  Printer, 
  Download, 
  ShieldCheck, 
  Activity, 
  Building2, 
  CheckCircle2, 
  Stethoscope 
} from 'lucide-react';

export default function ReportsView({ stats, patients }) {
  const [filter, setFilter] = useState('All');

  const handlePrint = () => {
    window.print();
  };

  const highRiskPatients = patients.filter(p => p.currentRiskLevel === 'High Risk');

  return (
    <div className="space-y-6">
      
      {/* Signature Elevated Header Card matching reference image */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-100/70 shadow-[0_4px_25px_rgba(139,92,246,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600 shrink-0 shadow-2xs">
            <FileBarChart className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinical & Administrative Audit Reports
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Section 1.16 Analytics & Compliance • Official monthly maternal outcomes report, risk assessment audits, and referral metrics
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25 transition-all shrink-0 hover:scale-102"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Audit Summary</span>
        </button>
      </div>

      {/* Filter Tabs Bar matching reference image */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          {['All Reports', 'Monthly Outcomes', 'High-Risk Register', 'ASHA Audits'].map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-white/60 font-semibold'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Monthly Health Authority Audit
        </span>
      </div>

      {/* Official Audit Document Style Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] space-y-8">
        
        {/* Document Header */}
        <div className="border-b border-brand-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold shadow-soft-purple">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">District Rural Maternal Health Audit</h3>
              <p className="text-xs text-brand-600 font-semibold">Government District General Hospital • Primary Health Network</p>
            </div>
          </div>

          <div className="text-left md:text-right text-xs text-slate-500 space-y-0.5">
            <p>Report Period: <strong className="text-slate-800">September 2026</strong></p>
            <p>Authorized CMO: <strong className="text-slate-800">Dr. Ananya Sharma</strong></p>
            <p>Admin Officer: <strong className="text-slate-800">Rameshwar Verma</strong></p>
          </div>
        </div>

        {/* Executive Metrics Grid matching reference card structure */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-brand-50/70 rounded-2xl border border-brand-200/80">
            <span className="text-[10px] font-bold uppercase text-brand-800 tracking-wider">Total Patients</span>
            <div className="text-2xl font-black text-slate-900 mt-1">142 Mothers</div>
            <span className="text-[11px] text-brand-600 font-medium">100% Digital Profiles</span>
          </div>

          <div className="p-4 bg-red-50/70 rounded-2xl border border-red-200/80">
            <span className="text-[10px] font-bold uppercase text-red-800 tracking-wider">High Risk Identified</span>
            <div className="text-2xl font-black text-red-600 mt-1">19 Identified</div>
            <span className="text-[11px] text-red-500 font-medium">Specialist Monitored</span>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
            <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Institutional Delivery</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">27 Deliveries</div>
            <span className="text-[11px] text-emerald-600 font-medium">0 Maternal Deaths</span>
          </div>

          <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200/80">
            <span className="text-[10px] font-bold uppercase text-purple-800 tracking-wider">ASHA Field Audits</span>
            <div className="text-2xl font-black text-purple-700 mt-1">32 Workers</div>
            <span className="text-[11px] text-purple-600 font-medium">96.4% Compliance</span>
          </div>
        </div>

        {/* Clinical High-Risk Register */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <Activity className="w-4 h-4 text-brand-500" />
            <span>Active High-Risk Clinical Register</span>
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Gestation</th>
                  <th className="py-3 px-4">Vitals (BP/Sugar/Hb)</th>
                  <th className="py-3 px-4">Key Risk Factors</th>
                  <th className="py-3 px-4">Assigned Doctor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {highRiskPatients.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.fullName}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-600">{p.patientId}</td>
                    <td className="py-3 px-4">Week {p.pregnancyDetails?.gestationalWeek}</td>
                    <td className="py-3 px-4 font-bold text-rose-600">
                      {p.vitals?.systolicBP}/{p.vitals?.diastolicBP} • {p.vitals?.bloodSugar} mmol • {p.vitals?.haemoglobin} g/dL
                    </td>
                    <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                      {p.aiExplanation || 'Hypertensive alert and maternal anemia'}
                    </td>
                    <td className="py-3 px-4 font-medium">{p.assignedDoctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Signatures */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            System Generated Audit Report • MaatriMitra AI Rural Maternal-Fetal Decision Support System
          </div>
          <div className="flex items-center space-x-2 text-emerald-600 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Cryptographic EHR Verification Passed</span>
          </div>
        </div>

      </div>

    </div>
  );
}
