import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  TrendingUp,
  UserCircle2,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import { adminService, assignmentService, attendanceService, resultService, teacherService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { Assignment, AttendanceRecord, Notification, Result, Teacher } from '../../types';

const formatShortDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

const TeacherDashboard = () => {
  const { user } = useAuthStore();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    const fetchDashboard = async (showLoader = false) => {
      if (showLoader) {
        setIsLoading(true);
      }

      try {
        const [teacherRes, assignmentRes, attendanceRes, resultRes, notificationRes] = await Promise.all([
          teacherService.getById(user.id),
          assignmentService.getAll(),
          attendanceService.getAll(),
          resultService.getAll(),
          adminService.getNotifications(),
        ]);

        if (!isMounted) return;

        setTeacher(teacherRes.data.data ?? null);
        setAssignments(assignmentRes.data.data ?? []);
        setAttendance(attendanceRes.data.data ?? []);
        setResults(resultRes.data.data ?? []);
        setNotifications(notificationRes.data.data ?? []);
      } catch (error) {
        if (!isMounted) return;
        console.error('Teacher dashboard load error:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboard(true);
    const interval = setInterval(() => fetchDashboard(false), 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?.id]);

  const classesFromAssignments = assignments.map((assignment) => assignment.class);
  const classesFromAttendance = attendance.map((record) => record.class);
  const classSet = Array.from(new Set([...(teacher?.classes ?? []), ...classesFromAssignments, ...classesFromAttendance])).sort();

  const latestAttendanceDate = attendance
    .map((record) => record.date)
    .sort((left, right) => new Date(right).getTime() - new Date(left).getTime())[0];

  const latestAttendance = latestAttendanceDate
    ? attendance.filter((record) => record.date === latestAttendanceDate)
    : [];

  const attendanceByClass = classSet.map((className) => {
    const classRecords = latestAttendance.filter((record) => record.class === className);
    const present = classRecords.filter((record) => record.status === 'present').length;
    const late = classRecords.filter((record) => record.status === 'late').length;
    const absent = classRecords.filter((record) => record.status === 'absent').length;
    const marked = classRecords.length;
    const percentage = marked ? Math.round(((present + late) / marked) * 100) : 0;

    return { className, marked, present, late, absent, percentage };
  }).filter((entry) => entry.marked > 0);

  const resultClasses = classSet.length > 0 ? classSet : Array.from(new Set(results.map((result) => result.class)));
  const relevantResults = resultClasses.length > 0
    ? results.filter((result) => resultClasses.includes(result.class))
    : results;

  const averagePerformance = relevantResults.length
    ? Math.round(relevantResults.reduce((sum, item) => sum + item.percentage, 0) / relevantResults.length)
    : 0;

  const totalSubmissions = assignments.reduce((sum, item) => sum + item.submissionCount, 0);
  const totalLearners = Array.from(new Set(relevantResults.map((item) => item.studentId))).length;
  const activeAssignments = assignments.filter((item) => item.status === 'active').length;
  const recentAssignments = [...assignments]
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .slice(0, 4);
  const recentResults = [...relevantResults]
    .sort((left, right) => new Date(right.examDate).getTime() - new Date(left.examDate).getTime())
    .slice(0, 4);
  const latestNotifications = notifications.slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-sm">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-crimson/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-32 w-32 rounded-full bg-brand-navy/10 blur-2xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-white shadow-lg">
              <GraduationCap className="h-4 w-4" /> Teacher Command Center
            </span>
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">
                {teacher?.name || user?.name || 'Teacher'} Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
                Real-time teaching snapshot for {teacher?.subject || 'your subject'} with live attendance, assignments, results, and notifications.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              <span className="rounded-full bg-white px-3 py-2 shadow-sm">Classes: {classSet.length || '--'}</span>
              <span className="rounded-full bg-white px-3 py-2 shadow-sm">Assignments: {assignments.length}</span>
              <span className="rounded-full bg-white px-3 py-2 shadow-sm">Updated every 30 sec</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            <Link to="/teacher/attendance" className="rounded-2xl bg-white/90 px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Latest Attendance</p>
              <p className="mt-2 text-xl font-black text-slate-900">{latestAttendanceDate ? formatShortDate(latestAttendanceDate) : 'No Data'}</p>
            </Link>
            <Link to="/teacher/assignments" className="rounded-2xl bg-white/90 px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Open Tasks</p>
              <p className="mt-2 text-xl font-black text-slate-900">{activeAssignments}</p>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Classes" value={classSet.length} icon={<CalendarDays className="h-5 w-5" />} gradient="bg-gradient-to-br from-brand-navy to-slate-900" iconBg="bg-white/15" />
        <StatCard title="Attendance Marked" value={attendance.length} icon={<ClipboardCheck className="h-5 w-5" />} gradient="bg-gradient-to-br from-emerald-500 to-emerald-700" iconBg="bg-white/15" />
        <StatCard title="Assignment Submissions" value={totalSubmissions} icon={<BookOpen className="h-5 w-5" />} gradient="bg-gradient-to-br from-amber-500 to-orange-600" iconBg="bg-white/15" />
        <StatCard title="Avg Performance" value={`${averagePerformance}%`} icon={<TrendingUp className="h-5 w-5" />} gradient="bg-gradient-to-br from-brand-crimson to-fuchsia-600" iconBg="bg-white/15" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Card
          title="Live Class Pulse"
          subtitle={latestAttendanceDate ? `Based on attendance marked on ${formatShortDate(latestAttendanceDate)}` : 'Attendance updates will appear here after marking'}
          action={<Link to="/teacher/attendance" className="text-xs font-black uppercase tracking-widest text-brand-crimson">Open Attendance</Link>}
        >
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse rounded-3xl border border-slate-100 p-5">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="mt-4 h-8 w-16 rounded bg-slate-200" />
                  <div className="mt-4 h-2 w-full rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : attendanceByClass.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {attendanceByClass.map((entry) => (
                <div key={entry.className} className="rounded-[1.5rem] border border-slate-100 bg-slate-50/70 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Class</p>
                      <h3 className="mt-1 text-2xl font-black italic tracking-tighter text-slate-900">{entry.className}</h3>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-navy shadow-sm">
                      {entry.marked} records
                    </span>
                  </div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-brand-navy" style={{ width: `${entry.percentage}%` }} />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-2xl bg-white px-3 py-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Present</p>
                      <p className="mt-1 text-lg font-black text-emerald-600">{entry.present}</p>
                    </div>
                    <div className="rounded-2xl bg-white px-3 py-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Late</p>
                      <p className="mt-1 text-lg font-black text-amber-500">{entry.late}</p>
                    </div>
                    <div className="rounded-2xl bg-white px-3 py-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Absent</p>
                      <p className="mt-1 text-lg font-black text-rose-500">{entry.absent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <p className="text-sm font-semibold text-slate-500">No attendance has been marked yet for this teacher.</p>
            </div>
          )}
        </Card>

        <Card
          title="Teacher Profile"
          subtitle="Resolved from teacher and auth data"
          action={<Link to="/teacher/profile" className="text-xs font-black uppercase tracking-widest text-brand-crimson">View Profile</Link>}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-[1.5rem] bg-slate-50 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-white shadow-lg">
                <UserCircle2 className="h-7 w-7" />
              </div>
              <div>
                <p className="text-lg font-black tracking-tight text-slate-900">{teacher?.name || user?.name || 'Teacher'}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{teacher?.subject || 'Faculty'} Department</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Email</p>
                <p className="mt-2 break-all text-sm font-semibold text-slate-700">{teacher?.email || user?.email || '--'}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Phone</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">{teacher?.phone || user?.phone || '--'}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Assigned Classes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {classSet.length > 0 ? classSet.map((item) => (
                  <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-600">
                    {item}
                  </span>
                )) : <span className="text-sm text-slate-500">No classes mapped yet.</span>}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card
          title="Recent Assignments"
          subtitle="Latest work published to students"
          action={<Link to="/teacher/assignments" className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-brand-crimson">Manage <ArrowRight className="h-3.5 w-3.5" /></Link>}
        >
          <div className="space-y-3">
            {recentAssignments.length > 0 ? recentAssignments.map((assignment) => (
              <div key={assignment.id} className="rounded-[1.25rem] border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black tracking-tight text-slate-900">{assignment.title}</p>
                    <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{assignment.subject} • {assignment.class}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${assignment.status === 'active' ? 'bg-emerald-100 text-emerald-700' : assignment.status === 'closed' ? 'bg-slate-200 text-slate-700' : 'bg-amber-100 text-amber-700'}`}>
                    {assignment.status}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{assignment.submissionCount}/{assignment.totalStudents} submitted</span>
                  <span>Due {formatShortDate(assignment.dueDate)}</span>
                </div>
              </div>
            )) : <p className="text-sm text-slate-500">No assignments created yet.</p>}
          </div>
        </Card>

        <Card
          title="Latest Results"
          subtitle="Recent academic outcomes from your classes"
          action={<Link to="/teacher/results" className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-brand-crimson">Open <ArrowRight className="h-3.5 w-3.5" /></Link>}
        >
          <div className="space-y-3">
            {recentResults.length > 0 ? recentResults.map((result) => (
              <div key={result.id} className="rounded-[1.25rem] bg-slate-50/80 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black tracking-tight text-slate-900">{result.studentName}</p>
                    <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{result.exam}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-navy">
                    {result.class}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Score</p>
                    <p className="text-xl font-black text-slate-900">{result.percentage}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Grade</p>
                    <p className="text-lg font-black text-emerald-600">{result.grade}</p>
                  </div>
                </div>
              </div>
            )) : <p className="text-sm text-slate-500">No results available yet.</p>}
          </div>
        </Card>

        <Card
          title="Announcements"
          subtitle="Role-based notifications from the backend"
          action={<Bell className="h-4 w-4 text-brand-crimson" />}
        >
          <div className="space-y-3">
            {latestNotifications.length > 0 ? latestNotifications.map((note) => (
              <div key={note.id} className="rounded-[1.25rem] border border-slate-100 p-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 rounded-full p-2 ${note.type === 'warning' ? 'bg-amber-100 text-amber-600' : note.type === 'error' ? 'bg-rose-100 text-rose-600' : note.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'}`}>
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black tracking-tight text-slate-900">{note.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{note.message}</p>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{formatShortDate(note.createdAt)}</p>
                  </div>
                </div>
              </div>
            )) : <p className="text-sm text-slate-500">No announcements for this teacher right now.</p>}
          </div>
        </Card>
      </div>

      <Card title="Learner Snapshot" subtitle="Students represented in recent result records">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Tracked Learners</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{totalLearners}</p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Pass Rate</p>
            <p className="mt-3 text-3xl font-black text-emerald-600">
              {relevantResults.length ? `${Math.round((relevantResults.filter((item) => item.result === 'Pass').length / relevantResults.length) * 100)}%` : '--'}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Exams Recorded</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{relevantResults.length}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
