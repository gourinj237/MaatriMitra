import React, { useState } from 'react';
import { 
  UserCheck, 
  UserPlus, 
  Search, 
  Phone, 
  Mail, 
  Building2, 
  Stethoscope, 
  Users, 
  Heart, 
  ChevronRight, 
  ShieldCheck, 
  X,
  Lock
} from 'lucide-react';

export default function UserManagement({ users = [], onAddUser }) {
  const [roleFilter, setRoleFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New user form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Doctor',
    department: 'Obstetrics & Gynecology',
    licenseNumber: '',
    phone: '',
    facilityName: 'District Rural General Hospital',
  });

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.facilityName && user.facilityName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onAddUser) {
      onAddUser({
        ...formData,
        _id: 'usr_' + Date.now(),
        status: 'Active',
      });
    }
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      email: '',
      role: 'Doctor',
      department: 'Obstetrics & Gynecology',
      licenseNumber: '',
      phone: '',
      facilityName: 'District Rural General Hospital',
    });
  };

  const getRolePrivileges = (role) => {
    switch (role) {
      case 'Doctor':
        return 'EHR Access, Clinical Decision Support, Prescription Writing & Diagnostic Audits';
      case 'Hospital Administrator':
        return 'Facility Operations, Bed Capacity Management, Health Analytics & User Governance';
      case 'ASHA Worker':
        return 'Village Telemetry, Home Visit Log, Maternal Risk Screening & Emergency Referral Dispatch';
      case 'Mother':
        return 'Personal Maternal Dossier, Trimester Milestones, Appointment Reminders & Vitals Tracking';
      default:
        return 'Standard Platform Access';
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Doctor':
        return 'bg-brand-100 text-brand-700 border-brand-200';
      case 'Hospital Administrator':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'ASHA Worker':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Mother':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Signature Elevated Header Card - Border radius 12px (Design System) */}
      <div className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_25px_rgba(139,92,246,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-[12px] bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600 shrink-0 shadow-2xs">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            {/* Page Title: 28px Bold per design system */}
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
              Platform User Directory & Role-Based Access
            </h1>
            {/* Caption: 12px Regular */}
            <p className="text-[12px] text-slate-500 font-normal mt-1">
              Section 1.14 Admin Operations • Role permissions, medical licenses & credentialing for Doctors, Administrators, ASHA Workers & Mothers
            </p>
          </div>
        </div>

        {/* Button: 8px border-radius */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-[8px] text-[14px] font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25 transition-all shrink-0 hover:scale-102"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New User / Staff</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        {/* Filter Pills - Badges/Pills 999px (rounded-full) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'Doctor', 'Hospital Administrator', 'ASHA Worker', 'Mother'].map((role) => {
            const isActive = roleFilter === role;
            return (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-5 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-white/60 font-normal'
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>

        {/* Search - Input: 8px border-radius */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email, or facility..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-[8px] border border-slate-200 text-[14px] focus:border-brand-500 outline-none bg-white font-normal"
          />
        </div>
      </div>

      {/* Showing counter: 12px Regular */}
      <div className="text-[12px] font-normal text-slate-500 px-1">
        Showing {filteredUsers.length} Platform Users
      </div>

      {/* Cards Grid - Cards: 12px border-radius per design system */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-[12px] p-6 border border-brand-100/70 shadow-[0_4px_20px_rgba(139,92,246,0.05)] hover:shadow-soft-purple hover:-translate-y-0.5 transition-all duration-300 space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Top Header: Avatar, Name, Role badge, Chevron */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-full bg-brand-100/80 text-brand-600 flex items-center justify-center font-bold text-[16px] shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    {/* Card Title (H3: 16px SemiBold per design system) */}
                    <h3 className="text-[16px] font-semibold text-slate-900 leading-tight">
                      {user.name}
                    </h3>
                    <span className="text-[12px] text-slate-500 font-normal">
                      {user.department}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-[12px] font-semibold border ${getRoleBadgeStyle(user.role)}`}>
                    {user.role}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Contact & Facility details: Body 14px Regular */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-[14px] text-slate-600 font-normal">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-slate-500 text-[12px]">
                  <Building2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span className="truncate">{user.facilityName || 'District Rural General Hospital'}</span>
                </div>
                {user.licenseNumber && user.licenseNumber !== 'N/A' && (
                  <div className="text-[12px] text-brand-600 font-mono font-medium">
                    License: {user.licenseNumber}
                  </div>
                )}
              </div>

              {/* Role Permissions Pod - Boxes: 12px border-radius */}
              <div className="mt-3.5 bg-brand-50/50 rounded-[12px] p-3 border border-brand-100/50 text-[12px]">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-brand-700 flex items-center space-x-1 mb-1">
                  <Lock className="w-3.5 h-3.5 text-brand-600" />
                  <span>AUTHORIZATION PRIVILEGES:</span>
                </span>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {getRolePrivileges(user.role)}
                </p>
              </div>
            </div>

            {/* Status Footer */}
            <div className="pt-2 flex items-center justify-between text-[12px]">
              <span className="text-slate-400 font-normal">Account Status</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                ● Active Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal - Modals: 16px border-radius per design system */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] p-6 max-w-lg w-full shadow-2xl border border-brand-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[20px] font-semibold text-slate-900 leading-tight">
                Register Staff / Platform User
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-[14px]">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Dr. Suniti Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 bg-white font-normal text-[14px]"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Hospital Administrator">Hospital Administrator</option>
                    <option value="ASHA Worker">ASHA Worker</option>
                    <option value="Mother">Mother</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="name@maatrimitra.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Medical License / Reg ID</label>
                  <input
                    type="text"
                    placeholder="MCI-12345"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal font-mono text-[14px]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Facility / Sub-center</label>
                  <input
                    type="text"
                    value={formData.facilityName}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 outline-none focus:border-brand-500 font-normal text-[14px]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-[8px] text-slate-600 hover:bg-slate-100 border border-slate-200 font-semibold text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-[8px] bg-brand-600 hover:bg-brand-700 text-white font-semibold text-[14px] shadow-soft-purple"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
