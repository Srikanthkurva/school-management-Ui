import { useEffect, useState } from 'react';
import { BookOpen, CalendarClock, FilePlus2, Layers3, TimerReset } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { assignmentService, studentService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { Assignment, Student } from '../../types';

const TeacherAssignmentsPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | Assignment['status']>('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class: '',
    subject: 'Mathematics',
    dueDate: '',
    maxMarks: 100,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (showLoader = false) => {
      if (showLoader) {
        setIsLoading(true);
      }

      try {
        const [assignmentRes, studentRes] = await Promise.all([
          assignmentService.getAll(),
          studentService.getAll(),
        ]);

        if (!isMounted) return;

        const fetchedAssignments = assignmentRes.data.data ?? [];
        const fetchedStudents = studentRes.data.data ?? [];
        setAssignments(fetchedAssignments);
        setStudents(fetchedStudents);

        if (!formData.class && fetchedStudents.length > 0) {
          setFormData((current) => ({ ...current, class: fetchedStudents[0].class }));
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Teacher assignments load error:', error);
        toast.error('Failed to load assignments');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData(true);
    const interval = setInterval(() => fetchData(false), 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [formData.class]);

  const { user } = useAuthStore();
  const canManage = user?.permissions?.includes('manage_assignments');

  const classes = Array.from(new Set(students.map((student) => student.class))).sort();
  const filteredAssignments = statusFilter === 'all'
    ? assignments
    : assignments.filter((assignment) => assignment.status === statusFilter);
  const activeAssignments = assignments.filter((assignment) => assignment.status === 'active').length;
  const closedAssignments = assignments.filter((assignment) => assignment.status === 'closed').length;
  const averageSubmission = assignments.length
    ? Math.round(assignments.reduce((sum, item) => sum + (item.totalStudents ? item.submissionCount / item.totalStudents : 0), 0) / assignments.length * 100)
    : 0;

  const handleChange = (key: keyof typeof formData, value: string | number) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleCreateAssignment = async () => {
    if (!formData.title || !formData.class || !formData.subject || !formData.dueDate) {
      toast.error('Fill in the required assignment fields');
      return;
    }

    const classStudents = students.filter((student) => student.class === formData.class).length;

    setIsSubmitting(true);
    try {
      await assignmentService.create({
        title: formData.title,
        description: formData.description,
        class: formData.class,
        subject: formData.subject,
        dueDate: formData.dueDate,
        maxMarks: Number(formData.maxMarks),
        totalStudents: classStudents,
        attachments: [],
      });

      toast.success('Assignment created successfully');
      const refreshed = await assignmentService.getAll();
      setAssignments(refreshed.data.data ?? []);
      setFormData({
        title: '',
        description: '',
        class: formData.class,
        subject: formData.subject,
        dueDate: '',
        maxMarks: 100,
      });
    } catch (error) {
      console.error('Create assignment error:', error);
      toast.error('Failed to create assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-amber-50 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Assignments</p>
            <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Live Assignment Studio</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
              Publish assignments to the correct class, track submissions, and watch the board update from backend data.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active</p>
              <p className="mt-2 text-2xl font-black text-emerald-600">{activeAssignments}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Closed</p>
              <p className="mt-2 text-2xl font-black text-slate-700">{closedAssignments}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg Submission</p>
              <p className="mt-2 text-2xl font-black text-brand-navy">{averageSubmission}%</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        {canManage && (
          <Card title="Create Assignment" subtitle="Publish a new class task">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Title</label>
              <Input value={formData.title} onChange={(event) => handleChange('title', event.target.value)} placeholder="Quadratic Equations Worksheet" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Description</label>
              <textarea
                value={formData.description}
                onChange={(event) => handleChange('description', event.target.value)}
                placeholder="Add instructions, chapter reference, or grading notes"
                className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-brand-crimson"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Class</label>
              <select
                value={formData.class}
                onChange={(event) => handleChange('class', event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-brand-crimson"
              >
                {classes.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Subject</label>
              <Input value={formData.subject} onChange={(event) => handleChange('subject', event.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Due Date</label>
              <Input type="date" value={formData.dueDate} onChange={(event) => handleChange('dueDate', event.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Max Marks</label>
              <Input type="number" value={String(formData.maxMarks)} onChange={(event) => handleChange('maxMarks', Number(event.target.value))} />
            </div>
          </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleCreateAssignment} disabled={isSubmitting} className="bg-brand-navy px-6">
                {isSubmitting ? 'Publishing...' : 'Publish Assignment'}
              </Button>
            </div>
          </Card>
        )}

        <div className="space-y-6">
          <Card title="Assignment Feed" subtitle="Teacher-scoped records from the backend">
            <div className="mb-4 flex flex-wrap gap-2">
              {(['all', 'active', 'closed', 'draft'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-widest transition ${
                    statusFilter === status ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {isLoading ? (
                [1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse rounded-2xl border border-slate-100 p-5">
                    <div className="h-4 w-40 rounded bg-slate-200" />
                  </div>
                ))
              ) : filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <div key={assignment.id} className="rounded-[1.5rem] border border-slate-100 p-5 transition hover:border-slate-200 hover:bg-slate-50">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <FilePlus2 className="h-4 w-4 text-brand-crimson" />
                          <p className="text-lg font-black tracking-tight text-slate-900">{assignment.title}</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{assignment.description}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                        assignment.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : assignment.status === 'closed'
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-amber-100 text-amber-700'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                    <div className="mt-5 grid gap-3 md:grid-cols-4">
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class</p>
                        <p className="mt-2 text-sm font-black text-slate-900">{assignment.class}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subject</p>
                        <p className="mt-2 text-sm font-black text-slate-900">{assignment.subject}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Submissions</p>
                        <p className="mt-2 text-sm font-black text-slate-900">{assignment.submissionCount}/{assignment.totalStudents}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Due</p>
                        <p className="mt-2 text-sm font-black text-slate-900">{assignment.dueDate}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                  No assignments match this filter right now.
                </div>
              )}
            </div>
          </Card>

          <Card title="Quick Metrics" subtitle="Live roll-up for teacher assignments">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Layers3 className="h-5 w-5 text-brand-navy" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Classes Covered</p>
                    <p className="mt-1 text-2xl font-black text-slate-900">{Array.from(new Set(assignments.map((assignment) => assignment.class))).length}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Assignments</p>
                    <p className="mt-1 text-2xl font-black text-slate-900">{assignments.length}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <TimerReset className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Next Due</p>
                    <p className="mt-1 text-sm font-black text-slate-900">
                      {assignments.length > 0
                        ? [...assignments].sort((left, right) => new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime())[0].dueDate
                        : '--'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Assignment Timeline" subtitle="Chronological list with publication details" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Assignment</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Class</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Created</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Due Date</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-t border-slate-100">
                  <td className="px-6 py-4">
                    <p className="font-black text-slate-900">{assignment.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{assignment.subject}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">{assignment.class}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{new Date(assignment.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarClock className="h-4 w-4 text-slate-400" /> {assignment.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                      assignment.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : assignment.status === 'closed'
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-amber-100 text-amber-700'
                    }`}>
                      {assignment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TeacherAssignmentsPage;
