import { useEffect, useState } from 'react';
import { CreditCard, Receipt, Wallet } from 'lucide-react';
import Card from '../../components/ui/Card';
import { studentService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { Student } from '../../types';

const StudentFeesPage = () => {
  const { user } = useAuthStore();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;

    const fetchFees = async (showLoader = false) => {
      if (showLoader) setIsLoading(true);
      try {
        const res = await studentService.getById(user.id);
        if (!isMounted) return;
        setStudent(res.data.data ?? null);
      } catch (error) {
        if (!isMounted) return;
        console.error('Student fees load error:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchFees(true);
    const interval = setInterval(() => fetchFees(false), 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?.id]);

  const total = student?.fees?.total ?? 0;
  const paid = student?.fees?.paid ?? 0;
  const due = student?.fees?.due ?? 0;
  const paidPercentage = total ? Math.round((paid / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-6 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Fees</p>
        <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Fee Tracker</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">A clean fee summary for parents to understand total, paid, and due balances in one place.</p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card><div className="flex items-center gap-3"><Wallet className="h-5 w-5 text-brand-navy" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Fees</p><p className="text-2xl font-black text-slate-900">Rs {total.toLocaleString()}</p></div></div></Card>
        <Card><div className="flex items-center gap-3"><CreditCard className="h-5 w-5 text-emerald-600" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Paid</p><p className="text-2xl font-black text-slate-900">Rs {paid.toLocaleString()}</p></div></div></Card>
        <Card><div className="flex items-center gap-3"><Receipt className="h-5 w-5 text-rose-500" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Due</p><p className="text-2xl font-black text-slate-900">Rs {due.toLocaleString()}</p></div></div></Card>
      </div>

      <Card title="Payment Progress" subtitle="Live fee position from the student profile">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading fee details...</p>
        ) : (
          <div className="space-y-5">
            <div className="h-4 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400" style={{ width: `${paidPercentage}%` }} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Paid Percentage</p>
                <p className="mt-3 text-3xl font-black text-slate-900">{paidPercentage}%</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Remaining Due</p>
                <p className="mt-3 text-3xl font-black text-slate-900">Rs {due.toLocaleString()}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Student</p>
                <p className="mt-3 text-xl font-black text-slate-900">{student?.name || '--'}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentFeesPage;
