import React, { useState } from 'react';
import { 
  FileClock, 
  Search, 
  FileText, 
  Download, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  Baby, 
  X,
  Eye,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export default function PreviousPregnancyHistory({ records = [] }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filteredRecords = records.filter((rec) => {
    const matchesSearch = 
      rec.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.patientId.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'All') return true;
    if (filter === 'Gravida 2') return rec.currentPregnancy.gravida === 2;
    if (filter === 'Gravida 3+') return rec.currentPregnancy.gravida >= 3;
    if (filter === 'Complications') return rec.previousPregnancy.pastComplications && rec.previousPregnancy.pastComplications.length > 0;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Signature Elevated Header Card - Border radius 12px (Design System) */}
      <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_25px_rgba(139,92,246,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-[12px] bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600 shrink-0 shadow-2xs">
            <FileClock className="w-7 h-7" />
          </div>
          <div>
            {/* Page Title: 28px Bold per design system */}
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
              Previous Pregnancy History & Health Records
            </h1>
            {/* Caption: 12px Regular */}
            <p className="text-[12px] text-slate-500 font-normal mt-1">
              Section 1.9 Health Care • Clinical records & diagnostics archived from Mother Dashboard for multigravida pregnancies
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
            Mother Dashboard Synced
          </span>
        </div>
      </div>

      {/* Notice Banner - Cards/Boxes: 12px */}
      <div className="bg-gradient-to-r from-brand-50 via-purple-50 to-indigo-50/50 rounded-[12px] p-4 border border-brand-200/60 flex items-start space-x-3 text-[14px]">
        <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <div className="text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800">
            Longitudinal EHR Archive (Prior Pregnancy Cycle 1 & 2):
          </p>
          <p className="font-normal text-[12px] leading-relaxed">
            When a mother registers for her second pregnancy, clinical documents, diagnostic scans, and delivery discharge summaries previously uploaded to the Mother Dashboard are seamlessly indexed here for obstetric review.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        {/* Filter Pills - Badges/Pills: 999px (rounded-full) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'All', label: 'All Multigravida Mothers' },
            { id: 'Gravida 2', label: 'Gravida 2' },
            { id: 'Gravida 3+', label: 'Gravida 3+' },
            { id: 'Complications', label: 'With Prior Complications' },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-white/60 font-normal'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search - Input: 8px border-radius */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search mother name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-[8px] border border-slate-200 text-[14px] focus:border-brand-500 outline-none bg-white font-normal"
          />
        </div>
      </div>

      {/* 2-Column Grid matching reference cards - Cards: 12px border-radius */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRecords.map((rec) => {
          const prev = rec.previousPregnancy;

          return (
            <div
              key={rec._id}
              className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:shadow-soft-purple hover:-translate-y-0.5 transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Gravida Tag, Status Badge, Chevron */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-full bg-brand-100/80 text-brand-600 flex items-center justify-center font-bold text-[16px] shrink-0">
                      {rec.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        {/* H3: 16px SemiBold per design system */}
                        <h3 className="text-[16px] font-semibold text-slate-900 leading-tight">
                          {rec.fullName}
                        </h3>
                        <span className="text-[12px] font-semibold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                          G{rec.currentPregnancy.gravida} P{rec.currentPregnancy.parity}
                        </span>
                      </div>
                      <span className="inline-block mt-0.5 text-[12px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-[8px]">
                        {rec.patientId} • Age {rec.age} • Current: Wk {rec.currentPregnancy.currentGestationalWeek}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-brand-100 text-brand-700">
                      Cycle {prev.cycleNumber} Delivery
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Prior Pregnancy Delivery Statistics - Body: 14px Regular */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-[14px]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-700 font-normal">
                    <div className="flex items-center space-x-1.5 text-brand-900 font-semibold">
                      <Calendar className="w-4 h-4 text-brand-500" />
                      <span>Delivered: {prev.deliveryDate}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center space-x-1.5">
                      <Stethoscope className="w-4 h-4 text-brand-500" />
                      <span>Mode: <strong className="text-slate-900 font-semibold">{prev.deliveryType}</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 text-[12px] font-normal">
                    <div className="flex items-center space-x-1.5">
                      <Baby className="w-4 h-4 text-brand-400" />
                      <span>{prev.babyGender} • {prev.birthWeightKg} kg • Gestation: {prev.gestationalWeeksAtBirth}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center space-x-1.5">
                      <Building2 className="w-4 h-4 text-brand-400" />
                      <span className="truncate">{prev.deliveryFacility}</span>
                    </div>
                  </div>

                  {/* Past Complications Flags */}
                  {prev.pastComplications && prev.pastComplications.length > 0 && (
                    <div className="pt-1 flex flex-wrap items-center gap-1.5">
                      <span className="text-[12px] font-semibold text-amber-800 uppercase tracking-wide">
                        Prior Complications:
                      </span>
                      {prev.pastComplications.map((comp, idx) => (
                        <span key={idx} className="text-[12px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                          {comp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Archived Documents from Mother Dashboard - Boxes: 12px */}
                <div className="mt-3.5 bg-slate-50/80 rounded-[12px] p-3 border border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
                      <FileText className="w-4 h-4 text-brand-600" />
                      <span>DOCUMENTS SYNCED FROM MOTHER DASHBOARD ({rec.archivedDocuments.length}):</span>
                    </span>
                    <span className="text-[12px] text-brand-600 font-semibold">EHR Verified</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {rec.archivedDocuments.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDoc(doc)}
                        className="text-left p-2.5 rounded-[8px] bg-white border border-brand-100 hover:border-brand-400 hover:shadow-2xs transition-all flex items-center justify-between group"
                      >
                        <div className="truncate pr-2">
                          <div className="text-[12px] font-semibold text-slate-800 group-hover:text-brand-700 truncate">
                            {doc.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal">
                            {doc.uploadDate} • {doc.fileSize}
                          </div>
                        </div>
                        <Eye className="w-4 h-4 text-brand-400 group-hover:text-brand-600 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Longitudinal Doctor Assessment */}
                <div className="mt-3 bg-brand-50/50 rounded-[12px] p-3 border border-brand-100/50 text-[14px]">
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-brand-700 block mb-1">
                    OBSTETRIC RISK CONTINUITY FOR 2ND PREGNANCY:
                  </span>
                  <p className="text-slate-600 leading-relaxed font-normal text-[12px]">
                    {rec.doctorLongitudinalNote}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Document Inspector Modal - Modals: 16px border-radius */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] p-6 max-w-lg w-full shadow-2xl border border-brand-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-[8px] bg-brand-100 text-brand-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-[16px]">{selectedDoc.title}</h3>
                  <p className="text-[12px] text-brand-600 font-medium">{selectedDoc.source}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-[14px]">
              <div className="bg-slate-50 p-3.5 rounded-[12px] border border-slate-200 space-y-2 text-[12px]">
                <div className="flex justify-between text-slate-500">
                  <span>File Name:</span>
                  <span className="font-mono font-medium text-slate-800">{selectedDoc.fileName}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Category:</span>
                  <span className="font-semibold text-slate-700">{selectedDoc.category}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Archived Date:</span>
                  <span className="text-slate-700">{selectedDoc.uploadDate}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>File Size:</span>
                  <span className="text-slate-700">{selectedDoc.fileSize}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-800 block mb-1">Clinical Summary & Findings:</span>
                <p className="p-3 bg-brand-50/60 rounded-[8px] text-slate-700 leading-relaxed border border-brand-100 text-[14px] font-normal">
                  {selectedDoc.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 rounded-[8px] text-slate-600 hover:bg-slate-100 border border-slate-200 font-semibold text-[14px]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Downloading archived report: ${selectedDoc.fileName}`);
                  }}
                  className="px-5 py-2 rounded-[8px] bg-brand-600 hover:bg-brand-700 text-white font-semibold text-[14px] flex items-center space-x-1.5 shadow-soft-purple"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
