import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { X, User, MapPin, Calendar, Tag, FilePlus, Check, Search } from 'lucide-react';
import { enquiryService } from '../../services';

const OpenInReview = ({ selected, setShowModal }: { selected: any; setShowModal: (v: boolean) => void }) => {
  const navigate = useNavigate();
  return (
    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center" onClick={() => { setShowModal(false); navigate('/admin/admissions-requests'); }}>
      Open in Review
    </Button>
  );
};

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await enquiryService.getAll();
      setEnquiries(res.data.data ?? []);
    } catch (err) {
      console.error('Failed to fetch enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    const iv = setInterval(fetchEnquiries, 5000);
    return () => clearInterval(iv);
  }, []);

  const filtered = enquiries.filter((e) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [e.childName, e.parentName, e.school, e.grade, e.email, e.mobile].join(' ').toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <header className="rounded-2xl p-6 bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-md">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide opacity-90">Admissions</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight">Enquiries</h1>
            <p className="mt-1 text-sm opacity-90 max-w-xl">Recent admission enquiries submitted via the public form — review and move to admissions.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400"><Search className="w-4 h-4" /></div>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, parent or school" className="pl-10 pr-4 py-2 rounded-xl border border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
            <Button className="bg-white/20 text-white">Bulk Actions</Button>
          </div>
        </div>
      </header>

      <section>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-auto">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-400">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-400">Child</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-400">Grade</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-400">Parent</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-400">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-400">Campus</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-400">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-black uppercase text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-500">Loading enquiries…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-500">No enquiries found.</td></tr>
                ) : filtered.map((q) => (
                  <tr key={q.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-slate-600">{new Date(q.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">{(q.childName||'C').charAt(0)}</div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{q.childName}</div>
                          <div className="text-xs text-slate-400">Submitted: {new Date(q.createdAt).toLocaleString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{q.grade}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{q.parentName}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{q.mobile} • {q.email}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{q.school}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 text-yellow-800 px-3 py-1 text-xs font-semibold">Pending</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="secondary" className="px-3 py-2" onClick={() => { setSelected(q); setShowModal(true); }}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {showModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 w-full max-w-4xl rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(2,6,23,0.4)] border border-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-md">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">{selected.childName}</h3>
                  <p className="text-sm text-slate-500 mt-1">Applied for <span className="font-semibold text-slate-800">{selected.grade}</span> • {selected.school}</p>
                  <p className="text-xs text-slate-400 mt-2">Submitted: {new Date(selected.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 text-yellow-800 px-3 py-1 text-xs font-semibold">Pending</span>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/60 to-white border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Academic Year</p>
                      <p className="text-sm font-semibold text-slate-800">{selected.academicYear || '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/60 to-white border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Orientation / Type</p>
                      <p className="text-sm font-semibold text-slate-800">{selected.orientation || selected.studentType || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/60 to-white border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Location</p>
                      <p className="text-sm font-semibold text-slate-800">{(selected.city || '') + (selected.state ? `, ${selected.state}` : '') || '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/60 to-white border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <FilePlus className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Notes</p>
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{selected.message || selected.note || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="p-4 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">{(selected.parentName || 'P').charAt(0)}</div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Parent</p>
                    <p className="text-sm font-bold text-slate-900">{selected.parentName || '-'}</p>
                    <p className="text-xs text-slate-500 mt-1">{selected.mobile || '-'} • {selected.email || '-'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <OpenInReview selected={selected} setShowModal={setShowModal} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiriesPage;
