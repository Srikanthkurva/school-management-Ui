import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  Trophy,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import { adminService, assignmentService, attendanceService, resultService, studentService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { Assignment, AttendanceRecord, Notification, Result, Student } from '../../types';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const [student, setStudent] = useState<Student | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    const fetchPortal = async (showLoader = false) => {
      if (showLoader) {
        setIsLoading(true);
      }

      try {
        const studentRes = await studentService.getById(user.id);
        const studentData = studentRes.data.data as Student;

        const [attendanceRes, resultRes, assignmentRes, notificationRes] = await Promise.all([
          attendanceService.getAll({ studentId: user.id }),
          resultService.getAll({ studentId: user.id }),
          assignmentService.getAll(studentData?.class ? { class: studentData.class } : {}),
          adminService.getNotifications(),
        ]);

        if (!isMounted) return;

        setStudent(studentData);
        setAttendanceRecords(attendanceRes.data.data ?? []);
        setResults(resultRes.data.data ?? []);
        setAssignments(assignmentRes.data.data ?? []);
        setNotifications(notificationRes.data.data ?? []);
      } catch (error) {
        if (!isMounted) return;
        console.error('Student dashboard load error:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPortal(true);
    const interval = setInterval(() => fetchPortal(false), 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?.id]);

  const attendanceSummary = attendanceRecords.reduce(
    (summary, record) => {
      summary.total += 1;
      if (record.status === 'present') summary.present += 1;
      if (record.status === 'late') summary.late += 1;
      if (record.status === 'absent') summary.absent += 1;
      return summary;
    },
    { total: 0, present: 0, late: 0, absent: 0 }
  );

  const attendancePercentage = attendanceSummary.total
    ? Math.round(((attendanceSummary.present + attendanceSummary.late) / attendanceSummary.total) * 100)
    : 0;
  const averageResult = results.length
    ? Math.round(results.reduce((sum, result) => sum + result.percentage, 0) / results.length)
    : 0;
  const pendingAssignments = assignments.filter((assignment) => assignment.status === 'active').length;
  const feeDue = student?.fees?.due ?? 0;
  const latestNotifications = notifications.slice(0, 4);
  const recentAssignments = [...assignments]
    .sort((left, right) => new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime())
    .slice(0, 3);
  const recentResults = [...results]
    .sort((left, right) => new Date(right.examDate).getTime() - new Date(left.examDate).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-violet-50 p-6 shadow-sm">
        <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-brand-crimson/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-brand-navy to-brand-crimson text-2xl font-black italic text-white shadow-2xl">
              {student?.name?.charAt(0) || user?.name?.charAt(0) || 'S'}
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Student / Parent Portal</p>
              <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">
                {student?.name || user?.name || 'Student Overview'}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm">
                  {student?.class || '--'}
                </span>
                <span className="rounded-full bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm">
                  Roll No: {student?.rollNo || '--'}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-sm">
                  {student?.isActive ? 'Active Record' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            <Link to="/student/fees" className="rounded-2xl bg-white/90 px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Fee Due</p>
              <p className="mt-2 text-xl font-black text-slate-900">Rs {feeDue.toLocaleString()}</p>
            </Link>
            <Link to="/student/attendance" className="rounded-2xl bg-white/90 px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Attendance</p>
              <p className="mt-2 text-xl font-black text-slate-900">{attendancePercentage}%</p>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Attendance" value={`${attendancePercentage}%`} icon={<ClipboardCheck className="h-5 w-5" />} gradient="bg-gradient-to-br from-emerald-500 to-emerald-700" iconBg="bg-white/15" />
        <StatCard title="Average Score" value={`${averageResult || 0}%`} icon={<Trophy className="h-5 w-5" />} gradient="bg-gradient-to-br from-brand-navy to-slate-900" iconBg="bg-white/15" />
        <StatCard title="Pending Assignments" value={pendingAssignments} icon={<BookOpen className="h-5 w-5" />} gradient="bg-gradient-to-br from-amber-500 to-orange-600" iconBg="bg-white/15" />
        <StatCard title="Fee Balance" value={`Rs ${feeDue.toLocaleString()}`} icon={<CreditCard className="h-5 w-5" />} gradient="bg-gradient-to-br from-brand-crimson to-fuchsia-600" iconBg="bg-white/15" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Academic Snapshot" subtitle="Real-time student performance from results and assignments">
          <div className="grid gap-4 md:grid-cols-2">
            <Link to="/student/results" className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5 transition hover:border-slate-200 hover:bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Results</p>
                  <p className="mt-2 text-2xl font-black italic tracking-tighter text-slate-900">{averageResult ? `${averageResult}%` : 'No Data'}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300" />
              </div>
              <p className="mt-4 text-sm text-slate-500">See mark sheets, grades, and recent exam performance.</p>
            </Link>
            <Link to="/student/assignments" className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5 transition hover:border-slate-200 hover:bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Assignments</p>
                  <p className="mt-2 text-2xl font-black italic tracking-tighter text-slate-900">{assignments.length}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300" />
              </div>
              <p className="mt-4 text-sm text-slate-500">Track upcoming due dates and submission progress.</p>
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Parent Name</p>
              <p className="mt-3 text-lg font-black text-slate-900">{student?.parentName || '--'}</p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Parent Phone</p>
              <p className="mt-3 text-lg font-black text-slate-900">{student?.parentPhone || '--'}</p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Notifications</p>
              <p className="mt-3 text-lg font-black text-slate-900">{notifications.length}</p>
            </div>
          </div>
        </Card>

        <Card title="Fee Overview" subtitle="Pulled from the student record">
          <div className="rounded-[1.75rem] bg-brand-navy p-5 text-white shadow-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Total Fees</p>
            <p className="mt-2 text-3xl font-black italic tracking-tighter">Rs {(student?.fees?.total ?? 0).toLocaleString()}</p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                style={{ width: `${student?.fees?.total ? (student.fees.paid / student.fees.total) * 100 : 0}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold">
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Paid</p>
                <p className="mt-2 text-lg font-black">Rs {(student?.fees?.paid ?? 0).toLocaleString()}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Due</p>
                <p className="mt-2 text-lg font-black">Rs {(student?.fees?.due ?? 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <Link to="/student/fees" className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-crimson">
            Open Fee Tracker <ChevronRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card title="Upcoming Assignments" subtitle="Class assignments for this student">
          <div className="space-y-3">
            {isLoading ? [1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse rounded-2xl border border-slate-100 p-4">
                <div className="h-4 w-40 rounded bg-slate-200" />
              </div>
            )) : recentAssignments.length > 0 ? recentAssignments.map((assignment) => (
              <div key={assignment.id} className="rounded-[1.25rem] border border-slate-100 p-4">
                <p className="text-sm font-black text-slate-900">{assignment.title}</p>
                <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{assignment.subject}</p>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{assignment.class}</span>
                  <span>Due {assignment.dueDate}</span>
                </div>
              </div>
            )) : <p className="text-sm text-slate-500">No assignments available yet.</p>}
          </div>
        </Card>

        <Card title="Recent Results" subtitle="Latest exam records">
          <div className="space-y-3">
            {recentResults.length > 0 ? recentResults.map((result) => (
              <div key={result.id} className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-900">{result.exam}</p>
                <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{result.examDate}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-black text-brand-navy">{result.percentage}%</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">{result.grade}</span>
                </div>
              </div>
            )) : <p className="text-sm text-slate-500">No results found.</p>}
          </div>
        </Card>

        <Card title="Notices & Alerts" subtitle="Role-based updates">
          <div className="space-y-3">
            {latestNotifications.length > 0 ? latestNotifications.map((note) => (
              <div key={note.id} className="rounded-[1.25rem] border border-slate-100 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-violet-100 p-2 text-violet-600">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{note.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{note.message}</p>
                  </div>
                </div>
              </div>
            )) : <p className="text-sm text-slate-500">No new notices right now.</p>}
          </div>
        </Card>
      </div>

      <Card title="Student Identity" subtitle="Live profile summary for student and parent visibility">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Class</p>
            <p className="mt-3 text-xl font-black text-slate-900">{student?.class || '--'}</p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">DOB</p>
            <p className="mt-3 text-xl font-black text-slate-900">{student?.dob ? new Date(student.dob).toLocaleDateString() : '--'}</p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Gender</p>
            <p className="mt-3 text-xl font-black text-slate-900">{student?.gender || '--'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;
