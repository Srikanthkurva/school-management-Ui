import { useEffect, useState } from 'react';
import { FileText, GraduationCap, Phone, Calendar, Briefcase, Mail, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { teacherRequestService } from '../../services';
import toast from 'react-hot-toast';

const TeacherRequestPage = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [credentials, setCredentials] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await teacherRequestService.getAll();
      setRequests(res.data.data ?? []);
    } catch (err) {
      console.error('Failed to fetch teacher requests', err);
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const openView = (req: any) => {
    setSelected(req);
    setShowModal(true);
  };

  const handleApprove = async () => {
    if (!selected) return;
    setActionLoading(true);
    try {
      const res = await teacherRequestService.approve(selected.id);
      toast.success(res.data.message || 'Request approved! Teacher added to the system.');

      if (res.data.data?.email && res.data.data?.tempPassword) {
        setCredentials({
          email: res.data.data.email,
          employeeId: res.data.data.employeeId,
          password: res.data.data.tempPassword
        });
        setShowCredentialsModal(true);
      }

      await fetchRequests();
      setShowModal(false);
    } catch (err: any) {
      console.error('Approve failed', err);
      toast.error(err.response?.data?.message || 'Approval failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selected) return;
    setActionLoading(true);
    try {
      const res = await teacherRequestService.reject(selected.id);
      toast.success(res.data.message || 'Request rejected');
      await fetchRequests();
      setShowModal(false);
    } catch (err: any) {
      console.error('Reject failed', err);
      toast.error(err.response?.data?.message || 'Rejection failed');
    } finally {
      setActionLoading(false);
    }
  };

  const InfoBlock = ({ label, value, icon: Icon }: any) => (
    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
      <div className="bg-white p-2 border border-slate-200 rounded-lg text-brand-navy shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
        <div className="text-sm font-medium text-slate-800 break-all">{value || 'N/A'}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-8 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Faculty Recruitment</p>
        <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Teacher Requests</h1>
        <p className="mt-2 text-sm font-medium text-slate-500 max-w-2xl">Manage and review incoming teacher applications. Screen candidate qualifications and experience before granting system access.</p>
      </section>

      <Card title="Incoming Applications" subtitle="Pending & Historical Records">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Candidate Name</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Subject</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Qualification</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && requests.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm font-semibold text-slate-400">Loading Applications...</td></tr>
              ) : requests.length > 0 ? requests.map((q) => (
                <tr key={q.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2 text-sm font-medium text-slate-600">{new Date(q.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-sm font-black text-brand-navy">{q.name}</td>
                  <td className="px-4 py-2 text-sm font-bold text-slate-700">{q.subject}</td>
                  <td className="px-4 py-2 text-sm font-medium text-slate-600">{q.qualification}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      q.status === 'approved' ? 'bg-green-100 text-green-700' :
                      q.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Button
                      variant="secondary"
                      className="px-4 py-2 text-xs font-bold text-brand-navy shadow-sm bg-white"
                      onClick={() => openView(q)}
                    >
                      VIEW
                    </Button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm font-medium text-slate-400">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-slate-100 px-8 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black italic uppercase text-brand-navy tracking-tight">Candidate Profile</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Submitted on {new Date(selected.created_at).toLocaleString()}</p>
              </div>
              <Button variant="ghost" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 rounded-full w-10 h-10 p-0 flex items-center justify-center bg-slate-50 hover:bg-slate-100">x</Button>
            </div>

            <div className="p-8 space-y-8">
              <div className="flex items-center gap-6 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <div className="w-20 h-20 rounded-full bg-brand-navy text-white flex items-center justify-center text-2xl font-black">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">{selected.name}</h4>
                  <p className="text-brand-crimson font-medium">{selected.subject} Specialist | {selected.experience} Experience</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoBlock label="Email Address" value={selected.email} icon={Mail} />
                <InfoBlock label="Phone Number" value={selected.phone} icon={Phone} />
                <InfoBlock label="Qualification" value={selected.qualification} icon={GraduationCap} />
                <InfoBlock label="Years of Experience" value={selected.experience} icon={Briefcase} />
                <InfoBlock label="Specialization" value={selected.subject} icon={FileText} />
                <InfoBlock label="Application Status" value={selected.status.toUpperCase()} icon={Calendar} />
              </div>

              {selected.message && (
                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-400">Cover Letter / Message</h5>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed italic">
                    "{selected.message}"
                  </div>
                </div>
              )}

              {selected.status === 'pending' && (
                <div className="flex gap-4 pt-4">
                  <Button
                    className="flex-1 bg-brand-navy hover:bg-slate-800 text-sm py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
                    disabled={actionLoading}
                    onClick={handleApprove}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {actionLoading ? 'Processing...' : 'APPROVE CANDIDATE'}
                  </Button>
                  <Button
                    variant="danger"
                    className="w-1/3 text-sm py-4 rounded-xl flex items-center justify-center gap-2"
                    disabled={actionLoading}
                    onClick={handleReject}
                  >
                    <XCircle className="w-4 h-4" />
                    REJECT
                  </Button>
                </div>
              )}

              {selected.status !== 'pending' && (
                <div className={`p-4 rounded-xl text-center font-bold uppercase tracking-widest text-xs ${
                  selected.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  This application has already been {selected.status}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCredentialsModal && credentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-slate-100 px-8 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black italic uppercase text-brand-navy tracking-tight">Login Credentials</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Share these with the teacher</p>
              </div>
              <button
                onClick={() => setShowCredentialsModal(false)}
                className="text-slate-400 hover:text-slate-600 rounded-full w-10 h-10 p-0 flex items-center justify-center bg-slate-50 hover:bg-slate-100"
              >
                x
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                <p className="text-sm font-medium text-green-800 mb-4">Teacher account has been successfully created. Share the credentials below:</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-green-900">Email Address</label>
                    <div className="mt-2 p-4 bg-white rounded-lg border border-green-300 font-mono text-sm font-bold text-green-900 break-all">
                      {credentials.email}
                    </div>
                  </div>

                  {credentials.employeeId && (
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-green-900">Employee ID</label>
                      <div className="mt-2 p-4 bg-white rounded-lg border border-green-300 font-mono text-sm font-bold text-green-900 break-all">
                        {credentials.employeeId}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-green-900">Temporary Password</label>
                    <div className="mt-2 p-4 bg-white rounded-lg border border-green-300 font-mono text-sm font-bold text-green-900 break-all">
                      {credentials.password}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs font-semibold text-amber-900">Important: Teacher can sign in with either the email address or the employee ID shown here. These credentials are also sent by email.</p>
              </div>

              <button
                onClick={() => {
                  const text = `Email: ${credentials.email}\nEmployee ID: ${credentials.employeeId || 'N/A'}\nPassword: ${credentials.password}`;
                  navigator.clipboard.writeText(text);
                  toast.success('Credentials copied to clipboard');
                }}
                className="w-full px-6 py-3 bg-brand-navy hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
              >
                Copy to Clipboard
              </button>

              <button
                onClick={() => setShowCredentialsModal(false)}
                className="w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherRequestPage;
