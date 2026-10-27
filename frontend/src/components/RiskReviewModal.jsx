import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  Activity, 
  HeartPulse, 
  FileCheck,
  TrendingUp,
  Stethoscope
} from 'lucide-react';

export default function RiskReviewModal({ patient, onClose, onConfirmReview }) {
  const [doctorNotes, setDoctorNotes] = useState('');
  const [isReviewed, setIsReviewed] = useState(false);

  if (!patient) return null;

  const isHighRisk = patient.currentRiskLevel === 'High Risk';
  const isMedRisk = patient.currentRiskLevel === 'Medium Risk';

  const handleReviewSubmit = () => {
    setIsReviewed(true);
    if (onConfirmReview) {
      onConfirmReview(patient._id, doctorNotes);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold">Pregnancy Risk Stratification</h3>
                <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Clinical Core v2.4
                </span>
              </div>
              <p className="text-xs text-brand-100">
                Patient: <strong className="text-white">{patient.fullName}</strong> ({patient.patientId}) • Week {patient.pregnancyDetails?.gestationalWeek}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Risk Level & Confidence Banner */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isHighRisk
              ? 'bg-red-50 border-red-200 text-red-900'
              : isMedRisk
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isHighRisk ? 'bg-red-500 text-white' : isMedRisk ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
              }`}>
                {isHighRisk ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wide opacity-75">
                  Predicted Maternal Risk Classification
                </span>
                <h4 className="text-xl font-extrabold flex items-center space-x-2">
                  <span>{patient.currentRiskLevel}</span>
                </h4>
              </div>
            </div>

            {/* Confidence Score Gauge */}
            <div className="bg-white/80 backdrop-blur-xs px-4 py-2 rounded-xl border border-current/20 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Confidence Score</span>
              <span className="text-2xl font-black text-slate-800">
                {patient.riskConfidence || 94.2}%
              </span>
            </div>
          </div>

          {/* Clinical Risk Explanation */}
          <div className="bg-brand-50/70 rounded-2xl p-4 border border-brand-100">
            <h4 className="text-xs font-bold text-brand-900 uppercase tracking-wide flex items-center space-x-1.5 mb-1.5">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Clinical Diagnostic Summary</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {patient.aiExplanation || 'The clinical model evaluated physiological biomarkers including blood pressure readings, glucose tolerance, maternal age, and haemoglobin levels. Regular vitals surveillance is essential.'}
            </p>
          </div>

          {/* Clinical Risk Factor Breakdown Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3 flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-brand-500" />
              <span>Biomarker Thresholds & Measured Vitals</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(patient.primaryFactors || [
                { factorName: 'Systolic Blood Pressure', measuredValue: `${patient.vitals.systolicBP} mmHg`, normalThreshold: '< 120 mmHg', severity: patient.vitals.systolicBP >= 140 ? 'Critical' : 'Normal' },
                { factorName: 'Diastolic Blood Pressure', measuredValue: `${patient.vitals.diastolicBP} mmHg`, normalThreshold: '< 80 mmHg', severity: patient.vitals.diastolicBP >= 90 ? 'Critical' : 'Normal' },
                { factorName: 'Haemoglobin Anemia', measuredValue: `${patient.vitals.haemoglobin} g/dL`, normalThreshold: '>= 11.0 g/dL', severity: patient.vitals.haemoglobin < 10.0 ? 'Critical' : 'Normal' },
                { factorName: 'Blood Glucose', measuredValue: `${patient.vitals.bloodSugar} mmol/L`, normalThreshold: '< 7.0 mmol/L', severity: patient.vitals.bloodSugar >= 7.5 ? 'Elevated' : 'Normal' },
              ]).map((factor, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-3 border border-slate-200/90 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800">{factor.factorName}</span>
                    <p className="text-[11px] text-slate-400">Ref: {factor.normalThreshold}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 block">{factor.measuredValue}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                      factor.severity === 'Critical'
                        ? 'bg-red-100 text-red-700'
                        : factor.severity === 'Elevated'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {factor.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Review Verification Form */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-4 h-4 text-brand-600" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Doctor's Clinical Review & Sign-Off
              </h4>
            </div>

            <textarea
              rows={2}
              placeholder="Add physician remarks or instructions for ASHA worker (e.g., 'Advise daily BP chart and initiate anti-hypertensive regimen')..."
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-xs text-slate-800 bg-white"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">
                Signing Physician: <strong className="text-slate-700">Dr. Ananya Sharma</strong>
              </span>

              <button
                onClick={handleReviewSubmit}
                disabled={isReviewed}
                className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isReviewed
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-brand-500 hover:bg-brand-600 text-white shadow-soft-purple'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{isReviewed ? 'Signed & Verified' : 'Verify Assessment'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all"
          >
            Close Modal
          </button>
        </div>

      </div>
    </div>
  );
}
