import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Pill, 
  Apple, 
  AlertCircle, 
  FileText, 
  Hospital, 
  Check, 
  Send 
} from 'lucide-react';

export default function RecommendationModal({ patient, onClose, onSaveRecommendation }) {
  const [title, setTitle] = useState('Maternal Care & Prescription Protocol');
  const [clinicalNotes, setClinicalNotes] = useState(
    patient?.currentRiskLevel === 'High Risk'
      ? 'High risk of pre-eclampsia. Strict bi-weekly antenatal check-ups. Immediate ultrasound Doppler required.'
      : 'Routine second-trimester prenatal care. Normal fetal heart rate detected.'
  );
  const [dietaryGuidance, setDietaryGuidance] = useState('Low sodium diet (<2g/day), iron-rich green leafy vegetables, jaggery, and adequate hydration (3L/day).');
  const [requiresAdmission, setRequiresAdmission] = useState(false);
  const [referralHospital, setReferralHospital] = useState('District Rural General Hospital - High Dependency Maternity Unit');
  
  const [medications, setMedications] = useState([
    { medicineName: 'Ferrous Ascorbate + Folic Acid', dosage: '100mg / 1.5mg', timing: 'Once daily at bedtime', duration: '60 days' },
    { medicineName: 'Calcium Carbonate + Vit D3', dosage: '500mg', timing: 'Once daily after breakfast', duration: '60 days' },
  ]);

  if (!patient) return null;

  const handleAddMedicine = () => {
    setMedications([
      ...medications,
      { medicineName: '', dosage: '', timing: 'Twice daily', duration: '30 days' }
    ]);
  };

  const handleRemoveMedicine = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleMedChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecommendation = {
      patientId: patient.patientId,
      patientName: patient.fullName,
      title,
      clinicalNotes,
      dietaryGuidance,
      medications,
      requiresAdmission,
      referralHospital: requiresAdmission ? referralHospital : '',
      createdAt: new Date().toISOString(),
    };

    if (onSaveRecommendation) {
      onSaveRecommendation(newRecommendation);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Add Clinical Care Plan & Recommendations</h3>
              <p className="text-xs text-brand-100">
                Patient: <strong className="text-white">{patient.fullName}</strong> ({patient.patientId}) • Week {patient.pregnancyDetails?.gestationalWeek}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          
          {/* Clinical Notes */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center space-x-1.5">
              <span>Physician Clinical Notes & Observations</span>
              <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-xs text-slate-800"
              placeholder="Clinical evaluation, maternal condition, fetal movements, danger signs to watch..."
            />
          </div>

          {/* Medications Prescribed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center space-x-1.5">
                <Pill className="w-4 h-4 text-brand-500" />
                <span>Prescribed Medications & Supplements</span>
              </label>

              <button
                type="button"
                onClick={handleAddMedicine}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs border border-brand-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Medicine</span>
              </button>
            </div>

            <div className="space-y-2">
              {medications.map((med, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 items-center">
                  <div className="col-span-4">
                    <input
                      type="text"
                      placeholder="Medicine Name"
                      value={med.medicineName}
                      onChange={(e) => handleMedChange(index, 'medicineName', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={med.dosage}
                      onChange={(e) => handleMedChange(index, 'dosage', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      placeholder="Timing & Frequency"
                      value={med.timing}
                      onChange={(e) => handleMedChange(index, 'timing', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(index)}
                      className="p-1 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary Guidance */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center space-x-1.5">
              <Apple className="w-4 h-4 text-emerald-500" />
              <span>Dietary, Nutrition & Hydration Guidance</span>
            </label>
            <textarea
              rows={2}
              value={dietaryGuidance}
              onChange={(e) => setDietaryGuidance(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-xs text-slate-800"
              placeholder="Recommended local nutritional diet, pulses, leafy greens, restrictions..."
            />
          </div>

          {/* Tertiary Referral / Admission Toggle */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Hospital className="w-4 h-4 text-amber-700" />
                <span className="font-bold text-amber-900 text-xs sm:text-sm">
                  Hospital Admission / Emergency Referral Required?
                </span>
              </div>
              <input
                type="checkbox"
                checked={requiresAdmission}
                onChange={(e) => setRequiresAdmission(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
              />
            </div>

            {requiresAdmission && (
              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-bold text-amber-900">Referral Center Destination</label>
                <input
                  type="text"
                  value={referralHospital}
                  onChange={(e) => setReferralHospital(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 text-xs bg-white text-slate-800 outline-none focus:border-brand-500"
                />
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-soft-purple transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Issue Care Plan & Recommendation</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
