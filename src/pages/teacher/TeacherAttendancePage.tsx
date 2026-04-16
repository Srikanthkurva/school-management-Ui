import { useEffect, useState } from 'react';
import { CalendarDays, CheckCircle2, Clock3, Filter, Users, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { attendanceService, studentService } from '../../services';
import type { AttendanceRecord, Student } from '../../types';

type AttendanceStatus = AttendanceRecord['status'];

const statusStyles: Record<AttendanceStatus, string> = {
  present: 'bg-emerald-100 text-emerald-700',
  late: 'bg-amber-100 text-amber-700',
  absent: 'bg-rose-100 text-rose-700',
};

const TeacherAttendancePage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [subject, setSubject] = useState('Mathematics');
  const [statusMap, setStatusMap] = useState<Record<string, AttendanceStatus>>({});

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (showLoader = false) => {
      if (showLoader) {
        setIsLoading(true);
      }

      try {
        const [studentRes, attendanceRes] = await Promise.all([
          studentService.getAll(),
          attendanceService.getAll(),
        ]);

        if (!isMounted) return;

        const fetchedStudents = studentRes.data.data ?? [];
        const fetchedAttendance = attendanceRes.data.data ?? [];
        setStudents(fetchedStudents);
        setAttendance(fetchedAttendance);

        if (!selectedClass && fetchedStudents.length > 0) {
          setSelectedClass(fetchedStudents[0].class);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Teacher attendance load error:', error);
        toast.error('Failed to load attendance data');
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
  }, [selectedClass]);

  useEffect(() => {
    if (!selectedClass) return;

    const existingForDay = attendance.filter(
      (record) => record.class === selectedClass && record.date === selectedDate && record.subject === subject
    );

    const nextMap: Record<string, AttendanceStatus> = {};
    existingForDay.forEach((record) => {
      nextMap[record.studentId] = record.status;
    });
    setStatusMap(nextMap);
  }, [attendance, selectedClass, selectedDate, subject]);

  const classOptions = Array.from(new Set(students.map((student) => student.class))).sort();
  const visibleStudents = students.filter((student) => !selectedClass || student.class === selectedClass);
  const recentRecords = attendance
    .filter((record) => !selectedClass || record.class === selectedClass)
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .slice(0, 10);

  const presentCount = visibleStudents.filter((student) => statusMap[student.id] === 'present').length;
  const lateCount = visibleStudents.filter((student) => statusMap[student.id] === 'late').length;
  const absentCount = visibleStudents.filter((student) => statusMap[student.id] === 'absent').length;

  const handleStatusChange = (studentId: string, value: AttendanceStatus) => {
    setStatusMap((current) => ({
      ...current,
      [studentId]: value,
    }));
  };

  const handleSubmit = async () => {
    const records = visibleStudents
      .filter((student) => statusMap[student.id])
      .map((student) => ({
        studentId: student.id,
        class: student.class,
        date: selectedDate,
        status: statusMap[student.id],
        subject,
      }));

    if (records.length === 0) {
      toast.error('Select at least one student status before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      await attendanceService.mark(records);
      toast.success('Attendance marked successfully');
      const refreshed = await attendanceService.getAll();
      setAttendance(refreshed.data.data ?? []);
    } catch (error) {
      console.error('Attendance mark error:', error);
      toast.error('Failed to submit attendance');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Teacher Attendance</p>
            <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Live Attendance Console</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
              Mark attendance for today’s classes and monitor the latest records without leaving the teacher portal.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Present</p>
              <p className="mt-2 text-2xl font-black text-emerald-600">{presentCount}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Late</p>
              <p className="mt-2 text-2xl font-black text-amber-500">{lateCount}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Absent</p>
              <p className="mt-2 text-2xl font-black text-rose-500">{absentCount}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Mark Attendance" subtitle="Class-wise daily attendance entry">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Class</label>
              <select
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-brand-crimson"
              >
                {classOptions.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Date</label>
              <Input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} className="h-11" />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Subject</label>
              <Input value={subject} onChange={(event) => setSubject(event.target.value)} className="h-11" placeholder="Mathematics" />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {isLoading ? (
              [1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse rounded-2xl border border-slate-100 p-4">
                  <div className="h-4 w-36 rounded bg-slate-200" />
                </div>
              ))
            ) : visibleStudents.length > 0 ? (
              visibleStudents.map((student) => (
                <div key={student.id} className="rounded-[1.5rem] border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-base font-black tracking-tight text-slate-900">{student.name}</p>
                      <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-400">
                        {student.rollNo} • {student.class} • {student.parentName}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(['present', 'late', 'absent'] as AttendanceStatus[]).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleStatusChange(student.id, status)}
                          className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-widest transition ${
                            statusMap[student.id] === status ? statusStyles[status] : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                No students found for the selected class.
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit} disabled={isSubmitting || visibleStudents.length === 0} className="bg-brand-navy px-6">
              {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Today Summary" subtitle="Selected class overview">
            <div className="grid gap-3">
              <div className="rounded-[1.5rem] bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Present</p>
                    <p className="text-2xl font-black text-emerald-700">{presentCount}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-amber-50 p-4">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">Late</p>
                    <p className="text-2xl font-black text-amber-700">{lateCount}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-rose-50 p-4">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-700">Absent</p>
                    <p className="text-2xl font-black text-rose-700">{absentCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Recent Records" subtitle="Latest attendance entries from the backend">
            <div className="space-y-3">
              {recentRecords.length > 0 ? recentRecords.map((record) => (
                <div key={record.id} className="rounded-[1.25rem] border border-slate-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-900">{record.class}</p>
                      <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{record.subject}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusStyles[record.status]}`}>
                      {record.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <CalendarDays className="h-4 w-4" /> {record.date}
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-500">No attendance records have been submitted yet.</p>
              )}
            </div>
          </Card>

          <Card title="Filter Notes" subtitle="Teacher-scoped live data">
            <div className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 p-4">
              <Filter className="mt-0.5 h-5 w-5 text-brand-crimson" />
              <p className="text-sm leading-6 text-slate-600">
                Attendance records on this page are now automatically scoped to the signed-in teacher and refresh every 30 seconds.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Class Roster" subtitle="Students available for quick marking" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Student</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Class</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Parent</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudents.map((student) => (
                <tr key={student.id} className="border-t border-slate-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-navy/10 font-black text-brand-navy">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.rollNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">{student.class}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{student.parentName}</td>
                  <td className="px-6 py-4">
                    {statusMap[student.id] ? (
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusStyles[statusMap[student.id]]}`}>
                        {statusMap[student.id]}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">Pending</span>
                    )}
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

export default TeacherAttendancePage;
