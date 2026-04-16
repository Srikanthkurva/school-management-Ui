import { useEffect, useState } from 'react';
import { GraduationCap, Phone, Search, ShieldCheck, UserCircle2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { attendanceService, resultService, studentService, teacherService } from '../../services';
import { classesService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { AttendanceRecord, Result, Student, Teacher } from '../../types';

const TeacherStudentsPage = () => {
  const { user } = useAuthStore();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;

    const fetchData = async (showLoader = false) => {
      if (showLoader) setIsLoading(true);
      try {
        const [teacherRes, studentRes, attendanceRes, resultRes, classesRes] = await Promise.all([
          teacherService.getById(user.id),
          // fetch students scoped to selected class when provided; otherwise fetch more records to build class list
          studentService.getAll(selectedClass ? { class: selectedClass } : { limit: 1000 }),
          attendanceService.getAll(),
          resultService.getAll(),
          classesService.getAll(),
        ]);

        if (!isMounted) return;
        setTeacher(teacherRes.data.data ?? null);
        setStudents(studentRes.data.data ?? []);
        setAvailableClasses(classesRes.data.data ?? []);
        setAttendance(attendanceRes.data.data ?? []);
        setResults(resultRes.data.data ?? []);
      } catch (error) {
        if (!isMounted) return;
        console.error('Teacher students load error:', error);
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
  }, [user?.id, selectedClass]);

  const classSet = Array.from(new Set([
    ...(teacher?.classes ?? []),
    ...attendance.map((record) => record.class),
    ...results.map((result) => result.class),
    ...students.map((s) => s.class),
  ]));

  const visibleStudents = students
    .filter((student) => !selectedClass || student.class === selectedClass)
    .filter((student) => {
      const query = search.trim().toLowerCase();
      if (!query) return true;
      return [student.name, student.rollNo, student.parentName, student.class, student.email]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });

  const latestAttendanceByStudent = new Map<string, AttendanceRecord>();
  [...attendance]
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .forEach((record) => {
      if (!latestAttendanceByStudent.has(record.studentId)) {
        latestAttendanceByStudent.set(record.studentId, record);
      }
    });

  const latestResultByStudent = new Map<string, Result>();
  [...results]
    .sort((left, right) => new Date(right.examDate).getTime() - new Date(left.examDate).getTime())
    .forEach((result) => {
      if (!latestResultByStudent.has(result.studentId)) {
        latestResultByStudent.set(result.studentId, result);
      }
    });

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-6 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Teacher Students</p>
        <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Class Roster</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">
          A live class roster for the signed-in teacher with parent contact, attendance, and recent result context.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mapped Classes</p><p className="mt-3 text-3xl font-black text-slate-900">{classSet.length}</p></Card>
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visible Students</p><p className="mt-3 text-3xl font-black text-slate-900">{visibleStudents.length}</p></Card>
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teacher</p><p className="mt-3 text-lg font-black text-slate-900">{teacher?.name || user?.name || '--'}</p></Card>
        <Card><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subject</p><p className="mt-3 text-lg font-black text-slate-900">{teacher?.subject || '--'}</p></Card>
      </div>

      <Card title="Search Students" subtitle="Quick search across roster, roll number, and parent details">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} className="h-11 pl-11" placeholder="Search by student, roll number, parent, or class" />
          </div>
          <div className="max-w-xs">
            <label className="mb-1 block text-xs font-semibold text-slate-500">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="">All classes</option>
              {availableClasses.length > 0 ? availableClasses.map((c) => <option key={c} value={c}>{c}</option>) : classSet.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </Card>

      <Card title="Roster" subtitle="Teacher-scoped student data" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Student</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Class</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Parent</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Attendance</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Latest Result</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">Loading roster...</td></tr>
              ) : visibleStudents.length > 0 ? visibleStudents.map((student) => {
                const latestAttendance = latestAttendanceByStudent.get(student.id);
                const latestResult = latestResultByStudent.get(student.id);
                return (
                  <tr key={student.id} className="border-t border-slate-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy/10 text-brand-navy">
                          <UserCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.rollNo} • {student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <GraduationCap className="h-4 w-4 text-slate-400" /> {student.class}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm text-slate-600">
                        <p className="font-semibold text-slate-800">{student.parentName}</p>
                        <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-slate-400" /> {student.parentPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {latestAttendance ? (
                        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                          latestAttendance.status === 'present' ? 'bg-emerald-100 text-emerald-700' : latestAttendance.status === 'late' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {latestAttendance.status} • {latestAttendance.date}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">No attendance yet</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {latestResult ? (
                        <div className="space-y-1">
                          <p className="text-sm font-black text-slate-900">{latestResult.percentage}%</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <ShieldCheck className="h-4 w-4 text-slate-400" /> {latestResult.grade} • {latestResult.exam}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">No result yet</span>
                      )}
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">No students matched this teacher scope.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TeacherStudentsPage;
