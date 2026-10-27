import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  User, 
  Stethoscope, 
  ChevronRight, 
  FileText, 
  CheckCircle,
  X
} from 'lucide-react';

export default function AppointmentsList({ appointments, onBookAppointment, onCompleteAppointment }) {
  const [filter, setFilter] = useState('All');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: 'MC-2026-081',
    appointmentDate: '',
    timeSlot: '10:00 AM',
    visitType: 'Routine Checkup',
    location: 'PHC Rampur - Clinical Room 2',
    clinicalNotes: '',
  });

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'All') return true;
    return apt.status.toLowerCase() === filter.toLowerCase();
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (onBookAppointment) {
      onBookAppointment({
        ...formData,
        _id: 'apt_' + Date.now(),
        status: 'Upcoming',
        doctorName: 'Dr. Ananya Sharma',
      });
    }
    setIsBookModalOpen(false);
    setFormData({
      patientName: '',
      patientId: 'MC-2026-081',
      appointmentDate: '',
      timeSlot: '10:00 AM',
      visitType: 'Routine Checkup',
      location: 'PHC Rampur - Clinical Room 2',
      clinicalNotes: '',
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Signature Elevated Header Card - Border radius 12px (Design System) */}
      <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_25px_rgba(139,92,246,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-[12px] bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600 shrink-0 shadow-2xs">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            {/* Page Title: 28px Bold per design system */}
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
              Clinical Consultations & Antenatal Visits
            </h1>
            {/* Caption / Small Text: 12px Regular per design system */}
            <p className="text-[12px] text-slate-500 font-normal mt-1">
              Section 1.7 Appointment Management • Scheduled trimester scans, high-risk reviews & PHC clinic visits
            </p>
          </div>
        </div>

        {/* Action Button: 8px border-radius per design system */}
        <button
          onClick={() => setIsBookModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-[8px] text-[14px] font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25 transition-all shrink-0 hover:scale-102"
        >
          <Plus className="w-4 h-4" />
          <span>Book Maternal Consult</span>
        </button>
      </div>

      {/* Filter Tabs Bar - Badges/Pills 999px (rounded-full) */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          {['All', 'Upcoming', 'Completed'].map((status) => {
            const isActive = filter === status;
            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-white/60 font-normal'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Caption: 12px Regular */}
        <span className="text-[12px] font-normal text-slate-500">
          Showing {filteredAppointments.length} Appointments
        </span>
      </div>

      {/* 2-Column Appointments Grid - Cards: 12px border-radius per design system */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAppointments.map((apt) => {
          const isUpcoming = apt.status === 'Upcoming';

          return (
            <div
              key={apt._id}
              className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:shadow-soft-purple hover:-translate-y-0.5 transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, ID, Status Badge, Chevron */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-full bg-brand-100/80 text-brand-600 flex items-center justify-center shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      {/* Card Title (H3: 16px SemiBold per design system) */}
                      <h3 className="text-[16px] font-semibold text-slate-900 leading-tight">
                        {apt.patientName}
                      </h3>
                      {/* ID tag: 8px border-radius */}
                      <span className="inline-block mt-0.5 text-[12px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-[8px]">
                        {apt.patientId}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Badge: 999px (rounded-full) */}
                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                      isUpcoming 
                        ? 'bg-brand-100 text-brand-700' 
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {apt.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Date & Time, Visit Type, Location (Body: 14px Regular per design system) */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-[14px]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-700 font-normal">
                    <div className="flex items-center space-x-1.5 text-brand-900 font-semibold">
                      <Calendar className="w-4 h-4 text-brand-500" />
                      <span>{apt.appointmentDate} {apt.timeSlot && `• ${apt.timeSlot}`}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center space-x-1.5">
                      <Stethoscope className="w-4 h-4 text-brand-500" />
                      <span>Type: <strong className="text-slate-900 font-semibold">{apt.visitType}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-slate-500 text-[12px] font-normal">
                    <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>{apt.location}</span>
                  </div>
                </div>

                {/* Pre-visit Notes Box - Cards/Boxes: 12px border-radius */}
                {apt.clinicalNotes && (
                  <div className="mt-4 bg-brand-50/50 rounded-[12px] p-4 border border-brand-100/50 flex items-start gap-3">
                    <FileText className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <div className="text-[14px]">
                      <span className="text-[12px] font-semibold uppercase tracking-wider text-brand-600 block mb-1">
                        DOCTOR'S PRE-VISIT NOTES:
                      </span>
                      <p className="text-slate-600 leading-relaxed font-normal">
                        {apt.clinicalNotes}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action: Ensure Visit Has Completed Button - 8px border-radius */}
              <div className="pt-2">
                {isUpcoming ? (
                  <button
                    onClick={() => onCompleteAppointment && onCompleteAppointment(apt._id)}
                    className="w-full py-2.5 px-4 rounded-[8px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-semibold text-[14px] flex items-center justify-center space-x-2 transition-all shadow-2xs group"
                    title="Mark this clinical visit as completed"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span>Ensure Visit Has Completed</span>
                  </button>
                ) : (
                  <div className="w-full py-2 px-3 rounded-[8px] bg-slate-50 border border-slate-200 text-slate-600 font-normal text-[12px] flex items-center justify-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Consultation Concluded & Logged to EHR</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Book Consult Modal - Modals: 16px border-radius per design system */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] p-6 max-w-lg w-full shadow-2xl border border-brand-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[20px] font-semibold text-slate-900 leading-tight">
                Schedule Maternal Clinical Appointment
              </h3>
              <button onClick={() => setIsBookModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4 text-[14px]">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mother's Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Priya Meena"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Appointment Date</label>
                  <input
                    required
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Visit Type</label>
                <select
                  value={formData.visitType}
                  onChange={(e) => setFormData({ ...formData, visitType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 bg-white font-normal text-[14px]"
                >
                  <option value="Routine Checkup">Routine Checkup</option>
                  <option value="High-Risk Followup">High-Risk Followup</option>
                  <option value="Ultrasound Scan">Ultrasound Scan</option>
                  <option value="Antenatal Checkup">Antenatal Checkup</option>
                  <option value="Postpartum Review">Postpartum Review</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinical Instructions & Notes</label>
                <textarea
                  rows={2}
                  placeholder="Instructions for patient and ASHA worker..."
                  value={formData.clinicalNotes}
                  onChange={(e) => setFormData({ ...formData, clinicalNotes: e.target.value })}
                  className="w-full p-3 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] text-slate-600 hover:bg-slate-100 border border-slate-200 font-semibold text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-[8px] bg-brand-600 hover:bg-brand-700 text-white font-semibold text-[14px] shadow-soft-purple"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
