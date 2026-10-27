import React, { useState } from 'react';
import { 
  Baby, 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  X,
  Stethoscope,
  Activity,
  Heart
} from 'lucide-react';

export default function NewbornRegistration({ newborns = [], onRegisterNewborn }) {
  const [filter, setFilter] = useState('All');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    babyName: '',
    motherName: 'Priya Meena',
    motherId: 'MC-2026-081',
    birthDateTime: '',
    gender: 'Female',
    birthWeightKg: '',
    birthLengthCm: '',
    headCircumferenceCm: '',
    gestationalWeeksAtBirth: '',
    deliveryType: 'Normal Delivery',
    apgarScore1Min: 8,
    apgarScore5Min: 9,
    healthStatus: 'Healthy / Stable',
    facilityName: 'District Rural General Hospital',
    clinicalRoom: 'Maternity Labor Suite 2',
    immunizationsGiven: ['Vitamin K1 (1mg)', 'BCG Vaccine', 'OPV-0 Dose', 'Hepatitis B (Birth Dose)'],
    attendingDoctor: 'Dr. Ananya Sharma',
    ashaWorker: 'Sunita Devi',
    notes: '',
  });

  const filteredNewborns = newborns.filter((nb) => {
    if (filter === 'All') return true;
    if (filter === 'Healthy') return nb.healthStatus.toLowerCase().includes('healthy');
    if (filter === 'NICU') return nb.healthStatus.toLowerCase().includes('nicu') || nb.healthStatus.toLowerCase().includes('observation');
    return true;
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (onRegisterNewborn) {
      onRegisterNewborn({
        ...formData,
        _id: 'nb_' + Date.now(),
        babyId: 'NB-2026-0' + (newborns.length + 42),
        registrationTimestamp: new Date().toLocaleString(),
      });
    }
    setIsRegisterModalOpen(false);
    setFormData({
      babyName: '',
      motherName: 'Priya Meena',
      motherId: 'MC-2026-081',
      birthDateTime: '',
      gender: 'Female',
      birthWeightKg: '',
      birthLengthCm: '',
      headCircumferenceCm: '',
      gestationalWeeksAtBirth: '',
      deliveryType: 'Normal Delivery',
      healthStatus: 'Healthy / Stable',
      facilityName: 'District Rural General Hospital',
      clinicalRoom: 'Maternity Labor Suite 2',
      immunizationsGiven: ['Vitamin K1 (1mg)', 'BCG Vaccine', 'OPV-0 Dose', 'Hepatitis B (Birth Dose)'],
      attendingDoctor: 'Dr. Ananya Sharma',
      attendingPediatrician: 'Dr. Suniti Rao, MD (Pediatrics)',
      ashaWorker: 'Sunita Devi',
      notes: '',
    });
  };

  const toggleVaccine = (vaccine) => {
    setFormData((prev) => {
      const exists = prev.immunizationsGiven.includes(vaccine);
      return {
        ...prev,
        immunizationsGiven: exists
          ? prev.immunizationsGiven.filter(v => v !== vaccine)
          : [...prev.immunizationsGiven, vaccine]
      };
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Signature Elevated Header Card - Border radius 12px (Design System) */}
      <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_25px_rgba(139,92,246,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-[12px] bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600 shrink-0 shadow-2xs">
            <Baby className="w-7 h-7" />
          </div>
          <div>
            {/* Page Title: 28px Bold per design system */}
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
              Newborn Delivery Registry & Neonatal Health
            </h1>
            {/* Caption: 12px Regular */}
            <p className="text-[12px] text-slate-500 font-normal mt-1">
              Section 1.15 Neonatal Care • Institutional birth registration, birth dose vaccines
            </p>
          </div>
        </div>

        {/* Button: 8px border-radius */}
        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-[8px] text-[14px] font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25 transition-all shrink-0 hover:scale-102"
        >
          <Plus className="w-4 h-4" />
          <span>Register Newborn Baby</span>
        </button>
      </div>

      {/* Filter Tabs Bar - Badges/Pills 999px (rounded-full) */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          {[
            { id: 'All', label: 'All Newborns' },
            { id: 'Healthy', label: 'Healthy / Stable' },
            { id: 'NICU', label: 'NICU Observation' },
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

        {/* Caption: 12px Regular */}
        <span className="text-[12px] font-normal text-slate-500">
          Showing {filteredNewborns.length} Registered Newborns
        </span>
      </div>

      {/* 2-Column Grid matching reference cards - Cards: 12px border-radius */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredNewborns.map((nb) => {
          const isHealthy = nb.healthStatus.toLowerCase().includes('healthy');

          return (
            <div
              key={nb._id}
              className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:shadow-soft-purple hover:-translate-y-0.5 transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Baby Name, Baby ID, Status Badge, Chevron */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-full bg-brand-100/80 text-brand-600 flex items-center justify-center shrink-0">
                      <Baby className="w-6 h-6" />
                    </div>
                    <div>
                      {/* Card Title (H3: 16px SemiBold per design system) */}
                      <h3 className="text-[16px] font-semibold text-slate-900 leading-tight">
                        {nb.babyName || `Baby of ${nb.motherName}`}
                      </h3>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <span className="text-[12px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-[8px]">
                          {nb.babyId}
                        </span>
                        <span className="text-[12px] text-brand-600 font-medium">
                          Mother: {nb.motherName} ({nb.motherId})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                      isHealthy
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {nb.healthStatus}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Birth Delivery & Vitals Meta - Body: 14px Regular */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-[14px]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-700 font-normal">
                    <div className="flex items-center space-x-1.5 text-brand-900 font-semibold">
                      <Calendar className="w-4 h-4 text-brand-500" />
                      <span>{nb.birthDateTime}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center space-x-1.5">
                      <Stethoscope className="w-4 h-4 text-brand-500" />
                      <span>Type: <strong className="text-slate-900 font-semibold">{nb.deliveryType}</strong></span>
                    </div>
                  </div>

                  {/* Physical Biometrics - Boxes: 12px border-radius */}
                  <div className="grid grid-cols-4 gap-2 bg-brand-50/40 p-3 rounded-[12px] border border-brand-100/50 text-center">
                    <div>
                      <span className="text-[11px] text-slate-400 font-semibold block uppercase">Weight</span>
                      <strong className="text-[14px] text-slate-800 font-bold">{nb.birthWeightKg} kg</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 font-semibold block uppercase">Length</span>
                      <strong className="text-[14px] text-slate-800 font-bold">{nb.birthLengthCm} cm</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 font-semibold block uppercase">Gestation</span>
                      <strong className="text-[14px] text-slate-800 font-bold">{nb.gestationalWeeksAtBirth} wks</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 font-semibold block uppercase">APGAR (1/5m)</span>
                      <strong className="text-[14px] text-brand-700 font-bold">{nb.apgarScore1Min}/{nb.apgarScore5Min}</strong>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-slate-500 text-[12px] font-normal pt-0.5">
                    <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>{nb.facilityName} • {nb.clinicalRoom}</span>
                  </div>
                </div>

                {/* Immediate Birth Dose Vaccines Box */}
                <div className="mt-3.5 bg-slate-50 rounded-[12px] p-3 border border-slate-200/70 space-y-1.5">
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-600 block">
                    NEONATAL BIRTH DOSE IMMUNIZATIONS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {nb.immunizationsGiven && nb.immunizationsGiven.map((vac, idx) => (
                      <span key={idx} className="text-[12px] font-medium px-2.5 py-0.5 rounded-[8px] bg-white border border-emerald-200 text-emerald-800 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{vac}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pediatrician Notes */}
                {nb.notes && (
                  <div className="mt-3 bg-brand-50/50 rounded-[12px] p-3.5 border border-brand-100/50 text-[14px]">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-brand-600 block mb-1">
                      PEDIATRICIAN CLINICAL ASSESSMENT:
                    </span>
                    <p className="text-slate-600 leading-relaxed font-normal text-[12px]">
                      {nb.notes}
                    </p>
                    <div className="text-[12px] text-slate-400 font-normal mt-1">
                      Attending: {nb.attendingDoctor} • Pediatrician: {nb.attendingPediatrician}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Register Newborn Modal - Modals: 16px border-radius */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] p-6 max-w-xl w-full shadow-2xl border border-brand-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-[8px] bg-brand-100 text-brand-600 flex items-center justify-center">
                  <Baby className="w-4 h-4" />
                </div>
                <h3 className="text-[20px] font-semibold text-slate-900 leading-tight">
                  Register Institutional Newborn Delivery
                </h3>
              </div>
              <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-[14px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mother's Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mother Patient ID</label>
                  <input
                    required
                    type="text"
                    value={formData.motherId}
                    onChange={(e) => setFormData({ ...formData, motherId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal font-mono text-[14px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Baby Name (or identifier)</label>
                  <input
                    type="text"
                    placeholder="e.g. Baby of Priya Meena"
                    value={formData.babyName}
                    onChange={(e) => setFormData({ ...formData, babyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 bg-white font-normal text-[14px]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Birth Date & Time</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 30 Sep 2026, 06:30 PM"
                    value={formData.birthDateTime}
                    onChange={(e) => setFormData({ ...formData, birthDateTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Delivery Type</label>
                  <select
                    value={formData.deliveryType}
                    onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 bg-white font-normal text-[14px]"
                  >
                    <option value="Normal Vaginal Delivery">Normal Vaginal Delivery</option>
                    <option value="Emergency LSCS">Emergency LSCS</option>
                    <option value="Elective Cesarean Section">Elective Cesarean Section</option>
                    <option value="Assisted Delivery (Vacuum/Forceps)">Assisted Delivery (Vacuum/Forceps)</option>
                  </select>
                </div>
              </div>

              {/* Physical Measurements - Inputs: 8px */}
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Weight (kg)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    placeholder="3.10"
                    value={formData.birthWeightKg}
                    onChange={(e) => setFormData({ ...formData, birthWeightKg: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 text-center font-normal text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Length (cm)</label>
                  <input
                    required
                    type="number"
                    step="0.1"
                    placeholder="49.0"
                    value={formData.birthLengthCm}
                    onChange={(e) => setFormData({ ...formData, birthLengthCm: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 text-center font-normal text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Head Circ (cm)</label>
                  <input
                    required
                    type="number"
                    step="0.1"
                    placeholder="34.0"
                    value={formData.headCircumferenceCm}
                    onChange={(e) => setFormData({ ...formData, headCircumferenceCm: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 text-center font-normal text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Gestation (wks)</label>
                  <input
                    required
                    type="number"
                    step="0.1"
                    placeholder="38.5"
                    value={formData.gestationalWeeksAtBirth}
                    onChange={(e) => setFormData({ ...formData, gestationalWeeksAtBirth: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 text-center font-normal text-[14px]"
                  />
                </div>
              </div>

              {/* APGAR & Status */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">APGAR (1 min)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.apgarScore1Min}
                    onChange={(e) => setFormData({ ...formData, apgarScore1Min: e.target.value })}
                    className="w-full px-3 py-2 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 text-center font-normal text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">APGAR (5 min)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.apgarScore5Min}
                    onChange={(e) => setFormData({ ...formData, apgarScore5Min: e.target.value })}
                    className="w-full px-3 py-2 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 text-center font-normal text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Clinical Status</label>
                  <select
                    value={formData.healthStatus}
                    onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 bg-white font-normal text-[14px]"
                  >
                    <option value="Healthy / Stable">Healthy / Stable</option>
                    <option value="NICU Observation">NICU Observation</option>
                    <option value="Phototherapy Required">Phototherapy Required</option>
                  </select>
                </div>
              </div>

              {/* Vaccines administered */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Birth Dose Vaccines Administered:</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Vitamin K1 (1mg)', 'BCG Vaccine', 'OPV-0 Dose', 'Hepatitis B (Birth Dose)'].map((vac) => {
                    const isChecked = formData.immunizationsGiven.includes(vac);
                    return (
                      <label key={vac} className="flex items-center space-x-2 p-2.5 rounded-[8px] border border-slate-200 bg-slate-50 cursor-pointer text-[12px]">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleVaccine(vac)}
                          className="rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span className="text-slate-700 font-medium">{vac}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pediatrician / Obstetrician Notes</label>
                <textarea
                  rows={2}
                  placeholder="Immediate birth cry, resuscitation details, feeding..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2.5 rounded-[8px] text-slate-600 hover:bg-slate-100 border border-slate-200 font-semibold text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-[8px] bg-brand-600 hover:bg-brand-700 text-white font-semibold text-[14px] shadow-soft-purple"
                >
                  Save Birth Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
