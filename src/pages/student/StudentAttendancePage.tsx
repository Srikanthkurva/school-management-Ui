import { useEffect, useState } from 'react';
import { CalendarDays, CheckCircle2, Clock3, XCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import { attendanceService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { AttendanceRecord } from '../../types';

const StudentAttendancePage = () => {
  const { user } = useAuthStore();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    const fetchAttendance = async (showLoader = false) => {
      if (showLoader) setIsLoading(true);
      try {
        const res = await attendanceService.getAll({ studentId: user.id });
        if (!isMounted) return;
        setRecords(res.data.data ?? []);
      } catch (error) {
        if (!isMounted) return;
        console.error('Student attendance load error:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAttendance(true);
    const interval = setInterval(() => fetchAttendance(false), 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?.id]);

  const total = records.length;
  const present = records.filter((record) => record.status === 'present').length;
  const late = records.filter((record) => record.status === 'late').length;
  const absent = records.filter((record) => record.status === 'absent').length;
  const percentage = total ? Math.round(((present + late) / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-6 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Attendance</p>
        <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Attendance Tracker</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">A real-time attendance view for students and parents with day-level records.</p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card><div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Present</p><p className="text-2xl font-black text-slate-900">{present}</p></div></div></Card>
        <Card><div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-amber-500" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Late</p><p className="text-2xl font-black text-slate-900">{late}</p></div></div></Card>
        <Card><div className="flex items-center gap-3"><XCircle className="h-5 w-5 text-rose-500" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Absent</p><p className="text-2xl font-black text-slate-900">{absent}</p></div></div></Card>
        <Card><div className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-brand-navy" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Attendance %</p><p className="text-2xl font-black text-slate-900">{percentage}%</p></div></div></Card>
      </div>

      <Card title="Attendance History" subtitle="Live records from the backend" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Class</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Subject</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">Loading attendance...</td></tr>
              ) : records.length > 0 ? records.map((record) => (
                <tr key={record.id} className="border-t border-slate-100">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.class}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                      record.status === 'present' ? 'bg-emerald-100 text-emerald-700' : record.status === 'late' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">No attendance records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StudentAttendancePage;
