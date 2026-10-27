import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Activity, 
  Truck, 
  Baby, 
  CheckCircle2, 
  Download,
  AlertOctagon,
  ChevronRight,
  ShieldCheck,
  Bed,
  HeartPulse,
  MapPin
} from 'lucide-react';

export default function HospitalAnalytics({ stats, onExportReport }) {
  const [filter, setFilter] = useState('All');

  const facility = stats?.facilityCapacity || {
    maternityBedsTotal: 50,
    maternityBedsOccupied: 34,
    icuBedsTotal: 8,
    icuBedsOccupied: 3,
    ambulancesActive: 4,
    onDutyObstetricians: 5,
    activeAshaWorkers: 32,
  };

  const riskPercentages = {
    high: Math.round(((stats?.highRiskCases || 19) / (stats?.totalRegisteredMothers || 142)) * 100),
    med: Math.round(((stats?.mediumRiskCases || 38) / (stats?.totalRegisteredMothers || 142)) * 100),
    low: Math.round(((stats?.lowRiskCases || 61) / (stats?.totalRegisteredMothers || 142)) * 100),
  };

  const maternityBedOccupancy = Math.round((facility.maternityBedsOccupied / facility.maternityBedsTotal) * 100);
  const icuBedOccupancy = Math.round((facility.icuBedsOccupied / facility.icuBedsTotal) * 100);

  return (
    <div className="space-y-6">
      
      {/* Signature Elevated Header Card - Border radius 12px (Design System) */}
      <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_25px_rgba(139,92,246,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-[12px] bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600 shrink-0 shadow-2xs">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            {/* Page Title: 28px Bold */}
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
              Hospital Operations & Risk Analytics
            </h1>
            {/* Caption: 12px Regular */}
            <p className="text-[12px] text-slate-500 font-normal mt-1">
              Section 1.14 Admin Operations • Rural maternal health indicators, PHC telemetry, and facility infrastructure
            </p>
          </div>
        </div>

        {/* Button: 8px border-radius */}
        <button
          onClick={onExportReport}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-[8px] text-[14px] font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25 transition-all shrink-0 hover:scale-102"
        >
          <Download className="w-4 h-4" />
          <span>Export Clinical Audit (PDF)</span>
        </button>
      </div>

      {/* Filter Tabs Bar - Badges/Pills 999px (rounded-full) */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          {[
            { id: 'All', label: 'All Operations' },
            { id: 'Beds', label: 'Bed Capacity' },
            { id: 'Risk', label: 'Risk Stratification' },
            { id: 'PHC', label: 'PHC Network' },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all ${
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

        <span className="text-[12px] font-normal text-slate-500">
          Showing 4 PHC Sub-Centers Linked
        </span>
      </div>

      {/* Primary KPI Cards Grid - Cards: 12px border-radius per design system */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Registered Mothers */}
        <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:shadow-soft-purple hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-brand-100/80 text-brand-600 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-brand-100 text-brand-700">
                  Active Cohort
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="mt-3 text-[12px] text-slate-500 font-normal">
              Registered Mother Registry
            </div>

            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-[28px] font-bold text-slate-900 tracking-tight">
                {stats?.totalRegisteredMothers || 142}
              </span>
              <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">
                Mothers
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[12px] font-normal">
                {stats?.activePregnancies || 118} Active
              </span>
              <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-[12px] font-normal border border-brand-100">
                14 Villages
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500 font-normal">
            <span>100% Digital EHR</span>
            <span className="font-semibold text-brand-600">Supervised</span>
          </div>
        </div>

        {/* Card 2: High Risk Priority */}
        <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:shadow-soft-purple hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-rose-100 text-rose-700">
                  Specialist Alert
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="mt-3 text-[12px] text-slate-500 font-normal">
              Surveillance Engine
            </div>

            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-[28px] font-bold text-rose-600 tracking-tight">
                {stats?.highRiskCases || 19}
              </span>
              <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">
                High Risk
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-[12px] font-semibold border border-rose-100">
                {riskPercentages.high}% of cohort
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[12px] font-normal">
                Daily Telemetry
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500 font-normal">
            <span>Specialist Escalation</span>
            <span className="font-semibold text-rose-600">Active Review</span>
          </div>
        </div>

        {/* Card 3: Completed Deliveries */}
        <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:shadow-soft-purple hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                <Baby className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-emerald-100 text-emerald-800">
                  Zero Mortality
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="mt-3 text-[12px] text-slate-500 font-normal">
              Monthly Deliveries
            </div>

            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-[28px] font-bold text-slate-900 tracking-tight">
                {stats?.completedDeliveriesThisMonth || 27}
              </span>
              <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">
                Births
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[12px] font-normal border border-emerald-100">
                {stats?.normalDeliveriesPercentage || 77.8}% Normal
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[12px] font-normal">
                {stats?.cSectionPercentage || 22.2}% LSCS
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500 font-normal">
            <span>District Maternity Wing</span>
            <span className="font-semibold text-emerald-700">100% Institutional</span>
          </div>
        </div>

        {/* Card 4: Immunization Rate */}
        <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:shadow-soft-purple hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-purple-100 text-purple-800">
                  Target Met
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="mt-3 text-[12px] text-slate-500 font-normal">
              Neonatal Immunization
            </div>

            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-[28px] font-bold text-slate-900 tracking-tight">
                {stats?.infantImmunizationRate || 98.4}%
              </span>
              <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">
                Vaccinated
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-[12px] font-normal border border-purple-100">
                Primary Birth Doses
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[12px] font-normal">
                Zero Dropouts
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500 font-normal">
            <span>Sub-Center Network</span>
            <span className="font-semibold text-purple-700">Verified EHR</span>
          </div>
        </div>

      </div>

      {/* Two-Column Middle Section: Bed Capacity & Risk Stratification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Panel 1: Bed Capacity & Emergency Fleet - Cards: 12px border-radius */}
        <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-[8px] bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                {/* H3: 16px SemiBold per design system */}
                <h3 className="text-[16px] font-semibold text-slate-900">Hospital Facility & Emergency Fleet</h3>
                <p className="text-[12px] text-slate-500 font-normal">Live capacity at District General Hospital</p>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Operational
            </span>
          </div>

          {/* Maternity & ICU Bed Meters - Boxes: 12px */}
          <div className="space-y-3 pt-2">
            <div className="p-3.5 bg-slate-50/70 rounded-[12px] border border-slate-200/80 space-y-2">
              <div className="flex justify-between text-[14px] font-semibold">
                <span className="text-slate-800">Maternity Beds Occupancy</span>
                <span className="text-brand-700">{facility.maternityBedsOccupied} / {facility.maternityBedsTotal} Beds ({maternityBedOccupancy}%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${maternityBedOccupancy}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 bg-slate-50/70 rounded-[12px] border border-slate-200/80 space-y-2">
              <div className="flex justify-between text-[14px] font-semibold">
                <span className="text-slate-800">Maternal ICU / High-Dependency Unit</span>
                <span className="text-purple-700">{facility.icuBedsOccupied} / {facility.icuBedsTotal} ICU Beds ({icuBedOccupancy}%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${icuBedOccupancy}%` }}
                />
              </div>
            </div>
          </div>

          {/* Ambulances & On-Duty Obstetricians */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-emerald-50/60 rounded-[12px] border border-emerald-200/80 text-[14px]">
              <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold mb-1">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Emergency Fleet</span>
              </div>
              <div className="text-[20px] font-bold text-slate-900">{facility.ambulancesActive} Ambulances</div>
              <span className="text-[12px] text-emerald-700 font-normal">GPS Ready for High-Risk Pickup</span>
            </div>

            <div className="p-3.5 bg-brand-50/60 rounded-[12px] border border-brand-200/80 text-[14px]">
              <div className="flex items-center space-x-1.5 text-brand-800 font-semibold mb-1">
                <Users className="w-4 h-4 text-brand-600" />
                <span>On-Duty Specialists</span>
              </div>
              <div className="text-[20px] font-bold text-slate-900">{facility.onDutyObstetricians} Obstetricians</div>
              <span className="text-[12px] text-brand-700 font-normal">{facility.activeAshaWorkers} ASHA field workers</span>
            </div>
          </div>
        </div>

        {/* Panel 2: Population Risk Stratification */}
        <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-[8px] bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-slate-900">Population Risk Stratification</h3>
                <p className="text-[12px] text-slate-500 font-normal">Live risk breakdown across active cohort</p>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              Triaged
            </span>
          </div>

          {/* Risk Breakdown Bar */}
          <div className="space-y-3 pt-2">
            <div className="h-4 w-full bg-slate-100 p-0.5 rounded-full overflow-hidden flex shadow-inner border border-slate-200/80">
              <div 
                style={{ width: `${riskPercentages.high}%` }} 
                className="bg-gradient-to-r from-red-500 to-rose-500 h-full rounded-l-full" 
                title={`High Risk: ${stats?.highRiskCases || 19}`}
              />
              <div 
                style={{ width: `${riskPercentages.med}%` }} 
                className="bg-gradient-to-r from-amber-400 to-yellow-400 h-full" 
                title={`Medium Risk: ${stats?.mediumRiskCases || 38}`}
              />
              <div 
                style={{ width: `${riskPercentages.low}%` }} 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-r-full" 
                title={`Low Risk: ${stats?.lowRiskCases || 61}`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1 text-center text-[14px]">
              <div className="p-3 bg-rose-50/70 rounded-[12px] border border-rose-200/90">
                <span className="font-semibold text-rose-950 block text-[14px]">High ({stats?.highRiskCases || 19})</span>
                <p className="text-[12px] text-rose-700 font-bold mt-0.5">{riskPercentages.high}%</p>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-[12px] border border-amber-200/90">
                <span className="font-semibold text-amber-950 block text-[14px]">Medium ({stats?.mediumRiskCases || 38})</span>
                <p className="text-[12px] text-amber-700 font-bold mt-0.5">{riskPercentages.med}%</p>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-[12px] border border-emerald-200/90">
                <span className="font-semibold text-emerald-950 block text-[14px]">Low ({stats?.lowRiskCases || 61})</span>
                <p className="text-[12px] text-emerald-700 font-bold mt-0.5">{riskPercentages.low}%</p>
              </div>
            </div>
          </div>

          {/* Trimester Division */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-[12px] font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
              Trimester Cohort Distribution
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center text-[14px]">
              <div className="p-2.5 bg-slate-50 rounded-[8px] border border-slate-200/80">
                <span className="text-[12px] text-slate-500 font-normal block">1st Tri</span>
                <strong className="text-[16px] font-semibold text-slate-800">28</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-[8px] border border-slate-200/80">
                <span className="text-[12px] text-slate-500 font-normal block">2nd Tri</span>
                <strong className="text-[16px] font-semibold text-slate-800">49</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-[8px] border border-slate-200/80">
                <span className="text-[12px] text-slate-500 font-normal block">3rd Tri</span>
                <strong className="text-[16px] font-semibold text-slate-800">41</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-[8px] border border-slate-200/80">
                <span className="text-[12px] text-slate-500 font-normal block">Postnatal</span>
                <strong className="text-[16px] font-semibold text-slate-800">24</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Primary Health Center (PHC) Sub-Network Performance */}
      <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-semibold text-slate-900">
              Primary Health Center (PHC) Sub-Network Performance
            </h3>
            <p className="text-[12px] text-slate-500 font-normal">Live rural cluster supervision and antenatal coverage</p>
          </div>
          <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
            4 Active Sub-Centers
          </span>
        </div>

        <div className="overflow-x-auto rounded-[8px] border border-slate-100 shadow-2xs">
          <table className="w-full text-left text-[14px] text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider text-[12px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">PHC Center</th>
                <th className="py-3.5 px-4">Mothers Registered</th>
                <th className="py-3.5 px-4">High-Risk Flagged</th>
                <th className="py-3.5 px-4">Doctor In Charge</th>
                <th className="py-3.5 px-4">ANC Checkup Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {(stats?.phcNetwork || [
                { phcName: 'PHC Rampur', registered: 46, highRisk: 7, docInCharge: 'Dr. Ananya Sharma', coverageRate: '96%' },
                { phcName: 'PHC Bhimnagar', registered: 38, highRisk: 4, docInCharge: 'Dr. Rajesh Nair', coverageRate: '92%' },
                { phcName: 'PHC Noorpur East', registered: 32, highRisk: 5, docInCharge: 'Dr. Kavita Singhal', coverageRate: '94%' },
                { phcName: 'Sub-Center Kalyanpur', registered: 26, highRisk: 3, docInCharge: 'Dr. Ananya Sharma', coverageRate: '91%' },
              ]).map((phc, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{phc.phcName}</td>
                  <td className="py-3.5 px-4 font-normal text-slate-700">{phc.registered}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold text-[12px] border border-rose-200">
                      {phc.highRisk} High Risk
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-normal text-slate-700">{phc.docInCharge}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[12px] border border-emerald-200">
                      {phc.coverageRate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
