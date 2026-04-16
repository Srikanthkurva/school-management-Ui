import { useEffect, useState } from 'react';
import { AlertTriangle, Bell, CheckCircle2, Info, Sparkles } from 'lucide-react';
import Card from '../../components/ui/Card';
import { adminService, assignmentService, resultService } from '../../services';
import type { Assignment, Notification, Result } from '../../types';

const TeacherNoticesPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (showLoader = false) => {
      if (showLoader) setIsLoading(true);
      try {
        const [notificationRes, assignmentRes, resultRes] = await Promise.all([
          adminService.getNotifications(),
          assignmentService.getAll(),
          resultService.getAll(),
        ]);

        if (!isMounted) return;
        setNotifications(notificationRes.data.data ?? []);
        setAssignments(assignmentRes.data.data ?? []);
        setResults(resultRes.data.data ?? []);
      } catch (error) {
        if (!isMounted) return;
        console.error('Teacher notices load error:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData(true);
    const interval = setInterval(() => fetchData(false), 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const noticeCards = [
    {
      id: 'assignment-summary',
      title: 'Active Assignment Monitor',
      message: `${assignments.filter((assignment) => assignment.status === 'active').length} active assignments currently need student attention.`,
      type: 'info',
    },
    {
      id: 'result-summary',
      title: 'Result Pipeline',
      message: `${results.length} result entries are available in your teaching scope right now.`,
      type: 'success',
    },
  ];

  const allNotices = [...notifications, ...noticeCards];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-fuchsia-50 p-6 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Teacher Notices</p>
        <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Announcements & Alerts</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Live notices from the backend plus quick teaching alerts built from assignments and results.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notifications</p><p className="mt-3 text-3xl font-black text-slate-900">{notifications.length}</p></Card>
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Assignments</p><p className="mt-3 text-3xl font-black text-slate-900">{assignments.filter((assignment) => assignment.status === 'active').length}</p></Card>
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Results Logged</p><p className="mt-3 text-3xl font-black text-slate-900">{results.length}</p></Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <Card><p className="text-sm text-slate-500">Loading notices...</p></Card>
        ) : allNotices.length > 0 ? allNotices.map((notice) => {
          const tone = notice.type === 'warning'
            ? 'bg-amber-100 text-amber-700'
            : notice.type === 'error'
              ? 'bg-rose-100 text-rose-700'
              : notice.type === 'success'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-sky-100 text-sky-700';

          const Icon = notice.type === 'warning'
            ? AlertTriangle
            : notice.type === 'error'
              ? Bell
              : notice.type === 'success'
                ? CheckCircle2
                : Info;

          return (
            <Card key={notice.id}>
              <div className="flex items-start gap-4">
                <div className={`rounded-2xl p-3 ${tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                    <p className="text-lg font-black text-slate-900">{notice.title}</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <Sparkles className="h-3.5 w-3.5" /> {notice.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{notice.message}</p>
                  {'createdAt' in notice && notice.createdAt ? (
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{new Date(notice.createdAt).toLocaleString()}</p>
                  ) : null}
                </div>
              </div>
            </Card>
          );
        }) : (
          <Card><p className="text-sm text-slate-500">No notices available for this teacher right now.</p></Card>
        )}
      </div>
    </div>
  );
};

export default TeacherNoticesPage;
