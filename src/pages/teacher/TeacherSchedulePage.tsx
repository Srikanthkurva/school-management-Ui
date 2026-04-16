import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CalendarDays, Clock3, MapPinned } from 'lucide-react';
import Card from '../../components/ui/Card';
import { assignmentService, attendanceService, teacherService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { Assignment, AttendanceRecord, Teacher } from '../../types';

const TeacherSchedulePage = () => {
  const { user } = useAuthStore();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;

    const fetchData = async (showLoader = false) => {
      if (showLoader) setIsLoading(true);
      try {
        const [teacherRes, assignmentRes, attendanceRes] = await Promise.all([
          teacherService.getById(user.id),
          assignmentService.getAll(),
          attendanceService.getAll(),
        ]);

        if (!isMounted) return;
        setTeacher(teacherRes.data.data ?? null);
        setAssignments(assignmentRes.data.data ?? []);
        setAttendance(attendanceRes.data.data ?? []);
      } catch (error) {
        if (!isMounted) return;
        console.error('Teacher schedule load error:', error);
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
  }, [user?.id]);

  const latestDates = Array.from(new Set(attendance.map((record) => record.date)))
    .sort((left, right) => new Date(right).getTime() - new Date(left).getTime());
  const selectedDate = latestDates[0];

  const dailyAgenda = useMemo(() => {
    const attendanceSessions = selectedDate
      ? attendance
          .filter((record) => record.date === selectedDate)
          .map((record, index) => ({
            id: `${record.id}-class`,
            type: 'Class Session',
            title: `${record.subject} • ${record.class}`,
            slot: `${9 + index}:00`,
            location: `Room ${record.class}`,
            tone: 'emerald',
          }))
      : [];

    const deadlineSessions = assignments
      .slice()
      .sort((left, right) => new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime())
      .slice(0, 4)
      .map((assignment, index) => ({
        id: `${assignment.id}-deadline`,
        type: 'Assignment Deadline',
        title: `${assignment.title} • ${assignment.class}`,
        slot: `${14 + index}:30`,
        location: 'Teacher Portal',
        tone: assignment.status === 'active' ? 'amber' : 'slate',
      }));

    return [...attendanceSessions, ...deadlineSessions];
  }, [assignments, attendance, selectedDate]);

  const classSet = Array.from(new Set([
    ...(teacher?.classes ?? []),
    ...attendance.map((record) => record.class),
    ...assignments.map((assignment) => assignment.class),
  ]));

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-6 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Teacher Schedule</p>
        <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Teaching Agenda</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">
          A live working schedule built from attendance sessions, assignment deadlines, and your mapped classes.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Classes</p><p className="mt-3 text-3xl font-black text-slate-900">{classSet.length}</p></Card>
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Agenda Items</p><p className="mt-3 text-3xl font-black text-slate-900">{dailyAgenda.length}</p></Card>
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Latest Date</p><p className="mt-3 text-lg font-black text-slate-900">{selectedDate || 'No Records'}</p></Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="Agenda Timeline" subtitle="Generated from live teacher activity">
          <div className="space-y-4">
            {isLoading ? (
              [1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse rounded-2xl border border-slate-100 p-4">
                  <div className="h-4 w-40 rounded bg-slate-200" />
                </div>
              ))
            ) : dailyAgenda.length > 0 ? dailyAgenda.map((item, index) => (
              <div key={item.id} className="relative rounded-[1.5rem] border border-slate-100 bg-white p-5">
                {index < dailyAgenda.length - 1 && <div className="absolute left-[39px] top-16 h-10 w-px bg-slate-100" />}
                <div className="flex gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    item.tone === 'emerald' ? 'bg-emerald-100 text-emerald-600' : item.tone === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-sm font-black text-slate-900">{item.title}</p>
                        <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{item.type}</p>
                      </div>
                      <span className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{item.slot}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <MapPinned className="h-4 w-4 text-slate-400" /> {item.location}
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                No schedule entries could be generated yet.
              </div>
            )}
          </div>
        </Card>

        <Card title="Class Coverage" subtitle="Derived from assignments and attendance">
          <div className="space-y-3">
            {classSet.length > 0 ? classSet.map((item) => {
              const assignmentCount = assignments.filter((assignment) => assignment.class === item).length;
              const attendanceCount = attendance.filter((record) => record.class === item).length;
              return (
                <div key={item} className="rounded-[1.25rem] bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-900">{item}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {assignmentCount} assignments</span>
                        <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {attendanceCount} attendance entries</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : <p className="text-sm text-slate-500">No class coverage mapped yet.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherSchedulePage;
