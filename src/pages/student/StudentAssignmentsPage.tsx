import { useEffect, useState } from 'react';
import { BookOpen, CalendarClock, CheckCircle2, ClipboardList } from 'lucide-react';
import Card from '../../components/ui/Card';
import { assignmentService, studentService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { Assignment, Student } from '../../types';

const StudentAssignmentsPage = () => {
  const { user } = useAuthStore();
  const [student, setStudent] = useState<Student | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;

    const fetchAssignments = async (showLoader = false) => {
      if (showLoader) setIsLoading(true);
      try {
        const studentRes = await studentService.getById(user.id);
        const studentData = studentRes.data.data as Student;
        const assignmentRes = await assignmentService.getAll(studentData?.class ? { class: studentData.class } : {});
        if (!isMounted) return;
        setStudent(studentData);
        setAssignments(assignmentRes.data.data ?? []);
      } catch (error) {
        if (!isMounted) return;
        console.error('Student assignments load error:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAssignments(true);
    const interval = setInterval(() => fetchAssignments(false), 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?.id]);

  const activeCount = assignments.filter((assignment) => assignment.status === 'active').length;
  const closedCount = assignments.filter((assignment) => assignment.status === 'closed').length;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-amber-50 p-6 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Assignments</p>
        <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">My Assignments</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">Assignments for class {student?.class || '--'} with due dates and submission visibility.</p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card><div className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-brand-navy" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total</p><p className="text-2xl font-black text-slate-900">{assignments.length}</p></div></div></Card>
        <Card><div className="flex items-center gap-3"><ClipboardList className="h-5 w-5 text-amber-500" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active</p><p className="text-2xl font-black text-slate-900">{activeCount}</p></div></div></Card>
        <Card><div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Closed</p><p className="text-2xl font-black text-slate-900">{closedCount}</p></div></div></Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <Card><p className="text-sm text-slate-500">Loading assignments...</p></Card>
        ) : assignments.length > 0 ? assignments.map((assignment) => (
          <Card key={assignment.id}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-lg font-black text-slate-900">{assignment.title}</p>
                <p className="mt-2 text-sm text-slate-500">{assignment.description}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                assignment.status === 'active' ? 'bg-emerald-100 text-emerald-700' : assignment.status === 'closed' ? 'bg-slate-200 text-slate-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {assignment.status}
              </span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subject</p><p className="mt-2 text-sm font-black text-slate-900">{assignment.subject}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class</p><p className="mt-2 text-sm font-black text-slate-900">{assignment.class}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teacher</p><p className="mt-2 text-sm font-black text-slate-900">{assignment.teacherName}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-slate-400" /><p className="text-sm font-black text-slate-900">{assignment.dueDate}</p></div></div>
            </div>
          </Card>
        )) : (
          <Card><p className="text-sm text-slate-500">No assignments available.</p></Card>
        )}
      </div>
    </div>
  );
};

export default StudentAssignmentsPage;
