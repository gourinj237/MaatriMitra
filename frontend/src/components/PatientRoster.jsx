import React, { useState } from 'react';
import { 
  Search, 
  HeartPulse, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Users, 
  Plus, 
  ChevronRight,
  UserPlus
} from 'lucide-react';

export default function PatientRoster({ 
  patients, 
  onSelectPatientForRisk, 
  onSelectPatientForRec,
  onRegisterMother
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [trimesterFilter, setTrimesterFilter] = useState('All');

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = 
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.village.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = 
      riskFilter === 'All' || 
      patient.currentRiskLevel.toLowerCase().includes(riskFilter.toLowerCase());

    const matchesTrimester = 
      trimesterFilter === 'All' || 
      patient.pregnancyDetails?.trimester === trimesterFilter;

    return matchesSearch && matchesRisk && matchesTrimester;
  });

  return (
    <div className="space-y-6">
      
      {/* Signature Elevated Header Card - Border radius 12px (Design System) */}
      <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_25px_rgba(139,92,246,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-[12px] bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600 shrink-0 shadow-2xs">
            <Users className="w-7 h-7" />
          </div>
          <div>
            {/* Page Title: 28px Bold per design system */}
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
              Maternal Health Risk & Surveillance
            </h1>
            {/* Caption: 12px Regular per design system */}
            <p className="text-[12px] text-slate-500 font-normal mt-1">
              Section 1.8 Doctor Dashboard • Monitor vitals, gestational weeks, and clinical risk predictions
            </p>
          </div>
        </div>

        {/* Action Button: 8px border-radius per design system */}
        <button
          onClick={() => {
            alert('Opening Maternal Intake Form to register a new pregnant mother into EHR.');
          }}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-[8px] text-[14px] font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25 transition-all shrink-0 hover:scale-102"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New Mother</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar matching reference image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        {/* Risk Level Pills Filter - Badges/Pills 999px (rounded-full) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'High Risk', 'Medium Risk', 'Low Risk'].map((level) => {
            const isActive = riskFilter === level;
            return (
              <button
                key={level}
                onClick={() => setRiskFilter(level)}
                className={`px-5 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-white/60 font-normal'
                }`}
              >
                {level === 'All' ? 'All Patients' : level}
              </button>
            );
          })}
        </div>

        {/* Search - Input: 8px border-radius */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search mother, ID, village..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-[8px] border border-slate-200 text-[14px] focus:border-brand-500 outline-none bg-white font-normal"
          />
        </div>
      </div>

      {/* Showing Counter: 12px Regular */}
      <div className="text-[12px] font-normal text-slate-500 px-1">
        Showing {filteredPatients.length} Registered Mothers
      </div>

      {/* Grid of Cards - Cards: 12px border-radius per design system */}
      {filteredPatients.length === 0 ? (
        <div className="bg-white rounded-[12px] p-10 text-center border border-dashed border-brand-200 shadow-2xs">
          <HeartPulse className="w-10 h-10 text-brand-400 mx-auto mb-2 animate-pulse" />
          <p className="text-slate-700 font-semibold text-[16px]">No registered mothers match this filter criteria.</p>
          <p className="text-slate-400 text-[12px] mt-1 font-normal">Try resetting the search keywords or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => {
            const isHighRisk = patient.currentRiskLevel === 'High Risk';
            const isMedRisk = patient.currentRiskLevel === 'Medium Risk';

            return (
              <div
                key={patient._id}
                className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:shadow-soft-purple hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Avatar on Left, Risk Pill on Right + Chevron */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-brand-100/80 text-brand-600 flex items-center justify-center font-bold text-[16px] shrink-0">
                      {patient.fullName.charAt(0)}
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[12px] font-semibold ${
                        isHighRisk 
                          ? 'bg-rose-100 text-rose-700' 
                          : isMedRisk 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isHighRisk && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                        {isMedRisk && <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                        {!isHighRisk && !isMedRisk && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>{patient.currentRiskLevel}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Sub-meta: 12px Regular */}
                  <div className="mt-3 flex items-center space-x-2 text-[12px] text-slate-500 font-normal">
                    <span className="font-mono font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded-[8px]">{patient.patientId}</span>
                    <span className="text-slate-300">•</span>
                    <span>Wk {patient.pregnancyDetails?.gestationalWeek}</span>
                    <span className="text-slate-300">•</span>
                    <span>{patient.age} yrs</span>
                  </div>

                  {/* Card Title (H3: 16px SemiBold per design system) */}
                  <h3 
                    onClick={() => onSelectPatientForRisk(patient)}
                    className="mt-1.5 text-[16px] font-semibold text-slate-900 tracking-tight hover:text-brand-600 transition-colors cursor-pointer"
                  >
                    {patient.fullName}
                  </h3>

                  {/* Pill tags - 999px rounded-full */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[12px] font-normal">
                      {patient.pregnancyDetails?.trimester}
                    </span>

                    <span className={`px-3 py-1 rounded-full text-[12px] font-normal ${
                      patient.vitals.systolicBP >= 140 || patient.vitals.diastolicBP >= 90
                        ? 'bg-rose-100 text-rose-800 font-semibold'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      BP: {patient.vitals.systolicBP}/{patient.vitals.diastolicBP}
                    </span>

                    <span className={`px-3 py-1 rounded-full text-[12px] font-normal ${
                      patient.vitals.bloodSugar >= 7.5
                        ? 'bg-amber-100 text-amber-800 font-semibold'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      Sugar: {patient.vitals.bloodSugar}
                    </span>

                    <span className={`px-3 py-1 rounded-full text-[12px] font-normal ${
                      patient.vitals.haemoglobin < 10.0
                        ? 'bg-rose-100 text-rose-800 font-semibold'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      Hb: {patient.vitals.haemoglobin}
                    </span>
                  </div>
                </div>

                {/* Bottom Row - Buttons: 8px border-radius */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[14px]">
                  <div>
                    <div className="font-semibold text-slate-900 leading-tight">
                      {patient.vitals.systolicBP}/{patient.vitals.diastolicBP} <span className="text-[12px] font-normal text-slate-400">mmHg</span>
                    </div>
                    <div className="text-slate-500 flex items-center space-x-1 font-normal text-[12px] mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span className="truncate max-w-[110px]">{patient.village}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectPatientForRec(patient)}
                      className="p-2.5 rounded-[8px] bg-slate-100 hover:bg-brand-50 text-slate-600 hover:text-brand-600 transition-colors"
                      title="Care Plan & Prescription"
                    >
                      <FileText className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSelectPatientForRisk(patient)}
                      className="px-4 py-2.5 rounded-[8px] bg-brand-600 hover:bg-brand-700 text-white text-[14px] font-semibold transition-all shadow-sm"
                    >
                      Review Risk
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
