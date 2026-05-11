import { useEffect, useState } from 'react';
import { FileText, User, Users, GraduationCap, MapPin, Phone, Calendar, Hash } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { admissionService } from '../../services';
import toast from 'react-hot-toast';

const RequestAdmissionsPage = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [credentials, setCredentials] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [reason, setReason] = useState('');

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await admissionService.getPending();
      setRequests(res.data.data ?? []);
    } catch (err) {
      console.error('Failed to fetch pending admissions', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
    const iv = setInterval(fetchPending, 5000);
    return () => clearInterval(iv);
  }, []);

  const openActions = (req: any) => {
    setSelected(req);
    setShowModal(true);
    setReason('');
  };

  const handleApprove = async () => {
    if (!selected) return;
    setActionLoading(true);
    try {
      const res = await admissionService.approve(selected.id);
      toast.success(res.data.message || 'Admission approved successfully');
      
      // Display credentials if available
      if (res.data.data?.email && res.data.data?.tempPassword) {
        setCredentials({
          email: res.data.data.email,
          password: res.data.data.tempPassword,
          admissionNo: res.data.data.admissionNo,
          sharedEmailConflict: Boolean(res.data.data.sharedEmailConflict),
        });
        setShowCredentialsModal(true);
      }
      
      await fetchPending();
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
      const res = await admissionService.reject(selected.id, { reason });
      toast.success(res.data.message || 'Application rejected');
      await fetchPending();
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
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Admissions</p>
        <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Admission Requests</h1>
        <p className="mt-2 text-sm font-medium text-slate-500 max-w-2xl">Review detailed online admission applications below. Verify applicant data from the extensive application profile before approving credentials or rejecting submissions.</p>
      </section>

      <Card title="Pending Applications" subtitle="Auto-refreshes every 5 seconds">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Child Name</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Grade & Setup</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Parent</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Contact</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Campus</th>
                <th className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && requests.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-sm font-semibold text-slate-400">Loading Applications...</td></tr>
              ) : requests.length > 0 ? requests.map((q) => {
                const childName = `${q.first_name || ''} ${q.last_name || ''}`.trim();
                const parentName = q.father_name || q.mother_name || 'Parent';

                return (
                  <tr key={q.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => openActions(q)}>
                    <td className="px-4 py-2 text-sm font-medium text-slate-600">{new Date(q.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-sm font-black text-brand-navy">{childName}</td>
                    <td className="px-4 py-2">
                      <div className="text-sm font-bold text-slate-700">Class {q.class_name}</div>
                      <div className="text-xs font-medium text-slate-400">{q.student_type} • {q.board}</div>
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">{parentName}</td>
                    <td className="px-4 py-2">
                      <div className="text-sm font-medium text-slate-700">{q.parent_mobile}</div>
                      <div className="text-xs font-medium text-slate-400">{q.parent_email}</div>
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-slate-600">{q.school}</td>
                    <td className="px-4 py-2 text-right">
                      <Button variant="secondary" className="px-4 py-2 text-xs font-bold text-brand-navy shadow-sm bg-white" onClick={(e) => { e.stopPropagation(); openActions(q); }}>REVIEW</Button>
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-sm font-medium text-slate-400">No pending applications at the moment.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-slate-100 px-8 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black italic uppercase text-brand-navy tracking-tight">Application Review</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Submitted on {new Date(selected.created_at).toLocaleString()}</p>
              </div>
              <Button variant="ghost" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 rounded-full w-10 h-10 p-0 flex items-center justify-center bg-slate-50 hover:bg-slate-100">✕</Button>
            </div>

            <div className="p-8 space-y-8">
              
              {/* Profile Overview */}
              <div className="flex items-center gap-6 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <div className="w-20 h-20 rounded-full bg-brand-navy text-white flex items-center justify-center text-2xl font-black">
                  {(selected.first_name?.[0] || '')}{(selected.last_name?.[0] || '')}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">{`${selected.first_name || ''} ${selected.last_name || ''}`.trim()}</h4>
                  <p className="text-brand-crimson font-medium">Applying for Class {selected.class_name} • {selected.school} Campus</p>
                </div>
              </div>

               {/* Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Academic Preferences */}
                <div>
                  <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> Academic Preferences
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    <InfoBlock label="Board" value={selected.board} icon={FileText} />
                    <InfoBlock label="Academic Year" value={selected.academic_year} icon={Calendar} />
                    <InfoBlock label="Orientation" value={selected.orientation} icon={MapPin} />
                    <InfoBlock label="Student Type" value={selected.student_type} icon={User} />
                    <InfoBlock label="Quota" value={selected.quota} icon={Hash} />
                    <InfoBlock label="Admission Type" value={selected.admission_type} icon={FileText} />
                  </div>
                </div>

                {/* Personal Details */}
                <div>
                  <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <User className="w-4 h-4" /> Personal Details
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    <InfoBlock label="First Name" value={selected.first_name} icon={User} />
                    <InfoBlock label="Last Name" value={selected.last_name} icon={User} />
                    <InfoBlock label="Date of Birth" value={selected.dob ? new Date(selected.dob).toLocaleDateString() : ''} icon={Calendar} />
                    <InfoBlock label="Gender" value={selected.gender} icon={User} />
                    <InfoBlock label="Aadhaar Number" value={selected.aadhaar_no} icon={Hash} />
                  </div>
                </div>

                {/* Parent / Guardian Data */}
                <div>
                  <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Parent Information
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    <InfoBlock label="Father's Name" value={selected.father_name} icon={User} />
                    <InfoBlock label="Mother's Name" value={selected.mother_name} icon={User} />
                    <InfoBlock label="Mobile" value={selected.parent_mobile} icon={Phone} />
                    <InfoBlock label="Email Address" value={selected.parent_email} icon={FileText} />
                    <InfoBlock label="Father Occupation" value={selected.father_occupation} icon={FileText} />
                  </div>
                </div>

                {/* Address Data */}
                <div>
                  <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location Details
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2"><InfoBlock label="Street Address" value={selected.address} icon={MapPin} /></div>
                    <InfoBlock label="City" value={selected.city} icon={MapPin} />
                    <InfoBlock label="State" value={selected.state} icon={MapPin} />
                  </div>
                </div>

              </div>

              {/* Action Area */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">Rejection Reason <span className="text-slate-400 font-medium normal-case">(Internal & Email Notification)</span></label>
                  <textarea 
                    value={reason} 
                    onChange={(e) => setReason(e.target.value)} 
                    className="w-full bg-white border border-slate-300 px-4 py-3 text-sm font-medium outline-none focus:border-brand-crimson transition-colors rounded-xl" 
                    placeholder="Provide a reason if rejecting application..."
                    rows={2} 
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <Button 
                    className="flex-1 bg-brand-navy hover:bg-slate-800 text-sm py-4 rounded-xl shadow-lg shadow-brand-navy/20" 
                    disabled={actionLoading} 
                    onClick={handleApprove}
                  >
                    {actionLoading ? 'Processing...' : 'APPROVE & GENERATE CREDENTIALS'}
                  </Button>
                  <Button 
                    variant="danger" 
                    className="w-1/3 text-sm py-4 rounded-xl" 
                    disabled={actionLoading} 
                    onClick={handleReject}
                  >
                    REJECT APPLICATION
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Credentials Display Modal */}
      {showCredentialsModal && credentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
            
            <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-slate-100 px-8 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black italic uppercase text-brand-navy tracking-tight">Login Credentials</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Share these with the student/parent</p>
              </div>
              <button 
                onClick={() => setShowCredentialsModal(false)} 
                className="text-slate-400 hover:text-slate-600 rounded-full w-10 h-10 p-0 flex items-center justify-center bg-slate-50 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                <p className="text-sm font-medium text-green-800 mb-4">Admission has been approved! Share the credentials below:</p>
                
                <div className="space-y-4">
                  {credentials.admissionNo && (
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-green-900">Admission Number</label>
                      <div className="mt-2 p-4 bg-white rounded-lg border border-green-300 font-mono text-sm font-bold text-green-900 break-all">
                        {credentials.admissionNo}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-green-900">Email Address (Username)</label>
                    <div className="mt-2 p-4 bg-white rounded-lg border border-green-300 font-mono text-sm font-bold text-green-900 break-all">
                      {credentials.email}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-green-900">Temporary Password</label>
                    <div className="mt-2 p-4 bg-white rounded-lg border border-green-300 font-mono text-sm font-bold text-green-900 break-all">
                      {credentials.password}
                    </div>
                  </div>
                </div>
              </div>

              {credentials.sharedEmailConflict && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-xs font-semibold text-amber-900">This contact email is already used in another portal. For parent access, open the Parent portal and use the same contact email or the admission number above.</p>
                </div>
              )}

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs font-semibold text-amber-900">⚠️ Important: Parent/Student must change password on first login. These credentials will be sent via email.</p>
              </div>

              <button
                onClick={() => {
                  // Copy to clipboard
                  const text = `Admission Number: ${credentials.admissionNo || 'N/A'}\nEmail: ${credentials.email}\nPassword: ${credentials.password}`;
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

export default RequestAdmissionsPage;
