import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Users, FileText, Award, TrendingUp,
  Settings, Eye, Trash2, Search,
  Download, Calendar, Star, Crown, ChevronRight,
  GraduationCap, Megaphone, Briefcase, Bell,
  CheckCircle, XCircle, Clock, RefreshCw, BarChart2,
  LogOut, X, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// ─── Types ───────────────────────────────────────────────────────────────────

type Status = 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'new' | 'contacted' | 'closed';

interface AcademyEnrollment {
  id: string; created_at: string; name: string; email: string;
  phone: string; age: string; experience: string; goals: string;
  program: string; status: Status;
}
interface ModelApplication {
  id: string; created_at: string; first_name: string; last_name: string;
  email: string; phone: string; age: string; location: string;
  height: string; weight: string; measurements: string; experience: string;
  portfolio: string; interests: string[]; status: Status;
}
interface BrandApplication {
  id: string; created_at: string; first_name: string; last_name: string;
  email: string; phone: string; age: string; location: string;
  company_name: string; industry: string; budget: string; goals: string;
  timeline: string; previous_campaigns: string; status: Status;
}
interface ServiceInquiry {
  id: string; created_at: string;
  inquiry_type: 'start_project' | 'schedule_consultation';
  name: string; email: string; phone: string; message: string; status: Status;
}
type Section = 'overview' | 'enrollments' | 'models' | 'brands' | 'inquiries' | 'settings';

// ─── Change this to your password ────────────────────────────────────────────
const ADMIN_PASSWORD = 'royale2025';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-700 border border-amber-200',
  reviewed:  'bg-blue-100 text-blue-700 border border-blue-200',
  accepted:  'bg-emerald-100 text-emerald-700 border border-emerald-200',
  rejected:  'bg-red-100 text-red-700 border border-red-200',
  new:       'bg-violet-100 text-violet-700 border border-violet-200',
  contacted: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
  closed:    'bg-gray-100 text-gray-600 border border-gray-200',
};

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
    {status}
  </span>
);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const DetailModal = ({ record, onClose, onStatusChange, statusOptions }: {
  record: Record<string, any>; onClose: () => void;
  onStatusChange: (id: string, s: string) => void; statusOptions: string[];
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.2 }}
      onClick={e => e.stopPropagation()}
      className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
    >
      <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
        <h3 className="text-lg font-bold text-gray-900">Record Details</h3>
        <div className="flex items-center gap-3">
          <select value={record.status} onChange={e => onStatusChange(record.id, e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(record).filter(([k]) => k !== 'id').map(([key, val]) => (
          <div key={key} className={Array.isArray(val) || (typeof val === 'string' && val.length > 60) ? 'sm:col-span-2' : ''}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{key.replace(/_/g, ' ')}</p>
            {Array.isArray(val) ? (
              <div className="flex flex-wrap gap-1.5">
                {val.map((v: string) => <span key={v} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{v}</span>)}
              </div>
            ) : key === 'status' ? <StatusBadge status={String(val)} /> : (
              <p className="text-sm text-gray-800 break-words">{String(val) || '—'}</p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

// ─── Data Table ───────────────────────────────────────────────────────────────

interface TableProps<T extends Record<string, any>> {
  data: T[]; columns: { key: string; label: string; render?: (row: T) => React.ReactNode }[];
  loading: boolean; onView: (row: T) => void; onDelete: (id: string) => void;
  searchTerm: string; searchKeys: (keyof T)[]; statusFilter: string; statusOptions: string[];
  onStatusFilterChange: (s: string) => void; onSearchChange: (s: string) => void;
  title: string; icon: React.ElementType; accentColor: string;
}

function DataTable<T extends Record<string, any>>({
  data, columns, loading, onView, onDelete, searchTerm, searchKeys,
  statusFilter, statusOptions, onStatusFilterChange, onSearchChange,
  title, icon: Icon, accentColor,
}: TableProps<T>) {
  const filtered = data.filter(row => {
    const matchSearch = searchKeys.some(k => String(row[k] ?? '').toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = !statusFilter || row.status === statusFilter;
    return matchSearch && matchStatus;
  });
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${accentColor} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button
          onClick={() => {
            const csv = [columns.map(c => c.label).join(','), ...filtered.map(row => columns.map(c => `"${String(row[c.key] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
            a.download = `${title.toLowerCase().replace(/\s/g, '-')}.csv`;
            a.click();
          }}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search..." value={searchTerm} onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
        </div>
        <select value={statusFilter} onChange={e => onStatusFilterChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm text-gray-700">
          <option value="">All Statuses</option>
          {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {columns.map(col => (
                  <th key={col.key} className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{col.label}</th>
                ))}
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  {[...columns, { key: 'a' }].map((_, j) => (
                    <td key={j} className="py-3.5 px-4"><div className="h-4 bg-gray-100 rounded animate-pulse w-24" /></td>
                  ))}
                </tr>
              )) : filtered.length === 0 ? (
                <tr><td colSpan={columns.length + 1} className="py-16 text-center text-gray-400">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No records found</p>
                </td></tr>
              ) : filtered.map((row, i) => (
                <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="py-3.5 px-4 text-sm text-gray-700 whitespace-nowrap">
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => onView(row)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm('Delete this record?')) onDelete(row.id); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Component ──────────────────────────────────────────────────────────

const Admin: React.FC = () => {

  // ── Password Gate ─────────────────────────────────────────────────────────
  const [authed, setAuthed] = useState<boolean>(() => sessionStorage.getItem('admin_authed') === 'true');
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authed', 'true');
      setAuthed(true);
    } else {
      setPwError(true);
      setShake(true);
      setPw('');
      setTimeout(() => setShake(false), 500);
    }
  };

  // ── Dashboard state ───────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [enrollments, setEnrollments] = useState<AcademyEnrollment[]>([]);
  const [modelApps, setModelApps] = useState<ModelApplication[]>([]);
  const [brandApps, setBrandApps] = useState<BrandApplication[]>([]);
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [search, setSearch] = useState({ enrollments: '', models: '', brands: '', inquiries: '' });
  const [statusFilter, setStatusFilter] = useState({ enrollments: '', models: '', brands: '', inquiries: '' });
  const [detailRecord, setDetailRecord] = useState<Record<string, any> | null>(null);
  const [detailStatusOptions, setDetailStatusOptions] = useState<string[]>([]);
  const [detailTable, setDetailTable] = useState('');

  const fetchAll = useCallback(async () => {
    if (!authed) return;
    setLoading(true);
    try {
      const [e, m, b, i] = await Promise.all([
        supabase.from('academy_enrollments').select('*').order('created_at', { ascending: false }),
        supabase.from('model_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('brand_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('service_inquiries').select('*').order('created_at', { ascending: false }),
      ]);
      if (e.data) setEnrollments(e.data);
      if (m.data) setModelApps(m.data);
      if (b.data) setBrandApps(b.data);
      if (i.data) setInquiries(i.data);
      setLastRefreshed(new Date());
    } catch (err) { console.error('Fetch error:', err); }
    finally { setLoading(false); }
  }, [authed]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const updateStatus = async (table: string, id: string, status: string) => {
    await supabase.from(table).update({ status }).eq('id', id);
    fetchAll();
    if (detailRecord?.id === id) setDetailRecord(prev => prev ? { ...prev, status } : null);
  };

  const deleteRecord = async (table: string, id: string) => {
    await supabase.from(table).delete().eq('id', id);
    fetchAll();
  };

  const stats = {
    totalEnrollments: enrollments.length,
    pendingEnrollments: enrollments.filter(e => e.status === 'pending').length,
    totalModels: modelApps.length, totalBrands: brandApps.length,
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter(i => i.status === 'new').length,
    acceptedModels: modelApps.filter(m => m.status === 'accepted').length,
    acceptedBrands: brandApps.filter(b => b.status === 'accepted').length,
  };

  const sidebarItems: { id: Section; label: string; icon: React.ElementType; count?: number; color: string }[] = [
    { id: 'overview',    label: 'Overview',  icon: BarChart2,     color: 'from-blue-500 to-cyan-500' },
    { id: 'enrollments', label: 'Academy',   icon: GraduationCap, count: stats.pendingEnrollments, color: 'from-purple-500 to-pink-500' },
    { id: 'models',      label: 'Models',    icon: Crown,         count: modelApps.filter(m => m.status === 'pending').length, color: 'from-yellow-500 to-orange-500' },
    { id: 'brands',      label: 'Brands',    icon: Briefcase,     count: brandApps.filter(b => b.status === 'pending').length, color: 'from-green-500 to-emerald-500' },
    { id: 'inquiries',   label: 'Inquiries', icon: Megaphone,     count: stats.newInquiries, color: 'from-red-500 to-pink-500' },
    { id: 'settings',    label: 'Settings',  icon: Settings,      color: 'from-gray-500 to-gray-600' },
  ];

  // ── Password Gate UI ──────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-10px)}
            40%{transform:translateX(10px)}
            60%{transform:translateX(-6px)}
            80%{transform:translateX(6px)}
          }
          .shake-box { animation: shake 0.4s ease; }
        `}</style>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className={`bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm ${shake ? 'shake-box' : ''}`}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-sm text-gray-400 mt-1">ROYALE DOXA Dashboard</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password" placeholder="Enter admin password" value={pw} autoFocus
                onChange={e => { setPw(e.target.value); setPwError(false); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all ${
                  pwError ? 'border-red-400 bg-red-50 focus:ring-red-400' : 'border-gray-200 focus:border-blue-400'
                }`}
              />
              {pwError && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                  <XCircle className="w-3.5 h-3.5" /> Incorrect password. Please try again.
                </p>
              )}
            </div>
            <button onClick={handleLogin}
              className="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-blue-500 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              Enter Dashboard
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">🔒 Session resets when tab is closed</p>
        </motion.div>
      </div>
    );
  }

  // ── Overview ──────────────────────────────────────────────────────────────
  const renderOverview = () => {
    const statCards = [
      { label: 'Academy Enrollments', value: stats.totalEnrollments, sub: `${stats.pendingEnrollments} pending`,  icon: GraduationCap, color: 'from-purple-500 to-pink-500',   section: 'enrollments' as Section },
      { label: 'Model Applications',  value: stats.totalModels,      sub: `${stats.acceptedModels} accepted`,    icon: Crown,         color: 'from-yellow-500 to-orange-500', section: 'models'      as Section },
      { label: 'Brand Applications',  value: stats.totalBrands,      sub: `${stats.acceptedBrands} accepted`,    icon: Briefcase,     color: 'from-green-500 to-emerald-500', section: 'brands'      as Section },
      { label: 'Service Inquiries',   value: stats.totalInquiries,   sub: `${stats.newInquiries} new`,           icon: Megaphone,     color: 'from-red-500 to-pink-500',      section: 'inquiries'   as Section },
    ];
    const recent = [
      ...enrollments.slice(0, 3).map(e  => ({ name: e.name,                          type: 'Academy Enrollment', status: e.status, date: e.created_at, tag: e.program })),
      ...modelApps.slice(0, 3).map(m   => ({ name: `${m.first_name} ${m.last_name}`, type: 'Model Application',  status: m.status, date: m.created_at, tag: m.experience })),
      ...brandApps.slice(0, 3).map(b   => ({ name: b.company_name,                   type: 'Brand Application',  status: b.status, date: b.created_at, tag: b.industry })),
      ...inquiries.slice(0, 3).map(i   => ({ name: i.name,                           type: i.inquiry_type === 'start_project' ? 'Project Brief' : 'Consultation', status: i.status, date: i.created_at, tag: i.inquiry_type })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => setActiveSection(s.section)}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 mt-1 group-hover:text-gray-500 transition-colors" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{loading ? '—' : s.value}</p>
              <p className="text-sm font-medium text-gray-600">{s.label}</p>
              <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Activity</h3>
            <span className="text-xs text-gray-400">All sources · latest first</span>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 bg-gray-100 rounded animate-pulse w-48" />
                    <div className="h-3 bg-gray-50 rounded animate-pulse w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No activity yet. Submitted forms will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recent.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.type} · {item.tag}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={item.status} />
                    <span className="text-xs text-gray-400 hidden sm:block">{fmtDate(item.date)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {enrollments.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Academy — Enrollments by Program</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'Beginner Program', color: 'from-green-400 to-emerald-500' },
                { name: 'Advanced Program', color: 'from-purple-400 to-pink-500' },
                { name: 'Elite Program',    color: 'from-yellow-400 to-orange-500' },
              ].map(({ name, color }) => {
                const count = enrollments.filter(e => e.program === name).length;
                const pct = enrollments.length ? Math.round((count / enrollments.length) * 100) : 0;
                return (
                  <div key={name} className="p-4 rounded-xl bg-gray-50">
                    <p className="text-sm font-semibold text-gray-700 mb-1">{name}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{count}</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{pct}% of total</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => (
    <div className="max-w-xl space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Settings</h2>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">Session</h3>
        <button onClick={() => { sessionStorage.removeItem('admin_authed'); setAuthed(false); }}
          className="px-4 py-2.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Data Summary</h3>
        <div className="space-y-2 text-sm text-gray-600">
          {[['Academy Enrollments', enrollments.length], ['Model Applications', modelApps.length], ['Brand Applications', brandApps.length], ['Service Inquiries', inquiries.length]].map(([label, count]) => (
            <div key={String(label)} className="flex justify-between py-1">
              <span>{label}</span><span className="font-semibold text-gray-900">{count}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900">
            <span>Total Records</span>
            <span>{enrollments.length + modelApps.length + brandApps.length + inquiries.length}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'enrollments': return (
        <DataTable data={enrollments}
          columns={[
            { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' },
            { key: 'program', label: 'Program' }, { key: 'age', label: 'Age' },
            { key: 'experience', label: 'Experience' },
            { key: 'status', label: 'Status', render: row => <StatusBadge status={row.status} /> },
            { key: 'created_at', label: 'Applied', render: row => fmtDate(row.created_at) },
          ]}
          loading={loading}
          onView={row => { setDetailRecord(row); setDetailStatusOptions(['pending','reviewed','accepted','rejected']); setDetailTable('academy_enrollments'); }}
          onDelete={id => deleteRecord('academy_enrollments', id)}
          searchTerm={search.enrollments} searchKeys={['name','email','program']}
          statusFilter={statusFilter.enrollments} statusOptions={['pending','reviewed','accepted','rejected']}
          onStatusFilterChange={v => setStatusFilter(p => ({ ...p, enrollments: v }))}
          onSearchChange={v => setSearch(p => ({ ...p, enrollments: v }))}
          title="Academy Enrollments" icon={GraduationCap} accentColor="bg-gradient-to-br from-purple-500 to-pink-500" />
      );
      case 'models': return (
        <DataTable data={modelApps}
          columns={[
            { key: 'first_name', label: 'First Name' }, { key: 'last_name', label: 'Last Name' },
            { key: 'email', label: 'Email' }, { key: 'location', label: 'Location' },
            { key: 'experience', label: 'Experience' },
            { key: 'status', label: 'Status', render: row => <StatusBadge status={row.status} /> },
            { key: 'created_at', label: 'Applied', render: row => fmtDate(row.created_at) },
          ]}
          loading={loading}
          onView={row => { setDetailRecord(row); setDetailStatusOptions(['pending','reviewed','accepted','rejected']); setDetailTable('model_applications'); }}
          onDelete={id => deleteRecord('model_applications', id)}
          searchTerm={search.models} searchKeys={['first_name','last_name','email','location']}
          statusFilter={statusFilter.models} statusOptions={['pending','reviewed','accepted','rejected']}
          onStatusFilterChange={v => setStatusFilter(p => ({ ...p, models: v }))}
          onSearchChange={v => setSearch(p => ({ ...p, models: v }))}
          title="Model Applications" icon={Crown} accentColor="bg-gradient-to-br from-yellow-500 to-orange-500" />
      );
      case 'brands': return (
        <DataTable data={brandApps}
          columns={[
            { key: 'company_name', label: 'Company' }, { key: 'first_name', label: 'Contact' },
            { key: 'email', label: 'Email' }, { key: 'industry', label: 'Industry' },
            { key: 'budget', label: 'Budget' }, { key: 'timeline', label: 'Timeline' },
            { key: 'status', label: 'Status', render: row => <StatusBadge status={row.status} /> },
            { key: 'created_at', label: 'Applied', render: row => fmtDate(row.created_at) },
          ]}
          loading={loading}
          onView={row => { setDetailRecord(row); setDetailStatusOptions(['pending','reviewed','accepted','rejected']); setDetailTable('brand_applications'); }}
          onDelete={id => deleteRecord('brand_applications', id)}
          searchTerm={search.brands} searchKeys={['company_name','first_name','email','industry']}
          statusFilter={statusFilter.brands} statusOptions={['pending','reviewed','accepted','rejected']}
          onStatusFilterChange={v => setStatusFilter(p => ({ ...p, brands: v }))}
          onSearchChange={v => setSearch(p => ({ ...p, brands: v }))}
          title="Brand Applications" icon={Briefcase} accentColor="bg-gradient-to-br from-green-500 to-emerald-500" />
      );
      case 'inquiries': return (
        <DataTable data={inquiries}
          columns={[
            { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' },
            { key: 'inquiry_type', label: 'Type', render: row => (
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.inquiry_type === 'start_project' ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'}`}>
                {row.inquiry_type === 'start_project' ? 'Start Project' : 'Consultation'}
              </span>
            )},
            { key: 'phone', label: 'Phone' },
            { key: 'status', label: 'Status', render: row => <StatusBadge status={row.status} /> },
            { key: 'created_at', label: 'Date', render: row => fmtDate(row.created_at) },
          ]}
          loading={loading}
          onView={row => { setDetailRecord(row); setDetailStatusOptions(['new','contacted','closed']); setDetailTable('service_inquiries'); }}
          onDelete={id => deleteRecord('service_inquiries', id)}
          searchTerm={search.inquiries} searchKeys={['name','email','phone']}
          statusFilter={statusFilter.inquiries} statusOptions={['new','contacted','closed']}
          onStatusFilterChange={v => setStatusFilter(p => ({ ...p, inquiries: v }))}
          onSearchChange={v => setSearch(p => ({ ...p, inquiries: v }))}
          title="Service Inquiries" icon={Megaphone} accentColor="bg-gradient-to-br from-red-500 to-pink-500" />
      );
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  // ── Dashboard UI ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-white border-r border-gray-100 shadow-sm flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="p-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Crown className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-gray-900 text-lg leading-none gradient-text">ROYALE DOXA</span>}
        </div>
        {sidebarOpen && (
          <div className="mx-3 mt-3 px-3 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div><p className="text-xs font-bold text-blue-800">Admin Panel</p><p className="text-xs text-blue-500">Full Access</p></div>
          </div>
        )}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 relative ${
                activeSection === item.id ? `bg-gradient-to-r ${item.color} text-white shadow-sm` : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
              {sidebarOpen && item.count != null && item.count > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeSection === item.id ? 'bg-white/25 text-white' : 'bg-red-100 text-red-600'}`}>{item.count}</span>
              )}
              {!sidebarOpen && item.count != null && item.count > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-50 space-y-1">
          <button onClick={() => setSidebarOpen(p => !p)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 text-sm transition-colors">
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            {sidebarOpen && <span>Collapse</span>}
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 text-sm transition-colors">
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="font-bold text-gray-900 text-lg capitalize">
              {activeSection === 'overview' ? 'Dashboard Overview' : activeSection}
            </h1>
            <p className="text-xs text-gray-400">Last refreshed: {lastRefreshed.toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchAll}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:block">Refresh</span>
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {detailRecord && (
          <DetailModal record={detailRecord} onClose={() => setDetailRecord(null)}
            onStatusChange={(id, status) => updateStatus(detailTable, id, status)}
            statusOptions={detailStatusOptions} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;