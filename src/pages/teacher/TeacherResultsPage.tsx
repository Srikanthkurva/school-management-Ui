import { useEffect, useState } from 'react';
import { Award, BarChart3, ClipboardPenLine, Filter, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { resultService, studentService } from '../../services';
import type { Result, Student } from '../../types';

const computeGrade = (percentage: number) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  return 'D';
};

const TeacherResultsPage = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classFilter, setClassFilter] = useState('all');
  const [examFilter, setExamFilter] = useState('');
  const [formData, setFormData] = useState({
    studentId: '',
    class: '',
    exam: '',
    examDate: new Date().toISOString().split('T')[0],
    subject: 'Mathematics',
    maxMarks: 100,
    marksObtained: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (showLoader = false) => {
      if (showLoader) {
        setIsLoading(true);
      }

      try {
        const [resultRes, studentRes] = await Promise.all([
          resultService.getAll(),
          studentService.getAll(),
        ]);

        if (!isMounted) return;

        const fetchedResults = resultRes.data.data ?? [];
        const fetchedStudents = studentRes.data.data ?? [];
        setResults(fetchedResults);
        setStudents(fetchedStudents);

        if (!formData.studentId && fetchedStudents.length > 0) {
          setFormData((current) => ({
            ...current,
            studentId: fetchedStudents[0].id,
            class: fetchedStudents[0].class,
          }));
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Teacher results load error:', error);
        toast.error('Failed to load results data');
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
  }, [formData.studentId]);

  const classes = Array.from(new Set(students.map((student) => student.class))).sort();
  const filteredResults = results.filter((result) => {
    const matchesClass = classFilter === 'all' || result.class === classFilter;
    const matchesExam = !examFilter || result.exam.toLowerCase().includes(examFilter.toLowerCase());
    return matchesClass && matchesExam;
  });

  const averagePercentage = filteredResults.length
    ? Math.round(filteredResults.reduce((sum, item) => sum + item.percentage, 0) / filteredResults.length)
    : 0;

  const topPerformer = filteredResults.length
    ? [...filteredResults].sort((left, right) => right.percentage - left.percentage)[0]
    : null;

  const passRate = filteredResults.length
    ? Math.round((filteredResults.filter((item) => item.result === 'Pass').length / filteredResults.length) * 100)
    : 0;

  const handleFormChange = (key: keyof typeof formData, value: string | number) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleStudentChange = (studentId: string) => {
    const student = students.find((item) => item.id === studentId);
    setFormData((current) => ({
      ...current,
      studentId,
      class: student?.class || current.class,
    }));
  };

  const handleCreateResult = async () => {
    const student = students.find((item) => item.id === formData.studentId);

    if (!student || !formData.exam || !formData.subject) {
      toast.error('Select a student and complete the result form');
      return;
    }

    const maxMarks = Number(formData.maxMarks);
    const marksObtained = Number(formData.marksObtained);
    const percentage = maxMarks > 0 ? Number(((marksObtained / maxMarks) * 100).toFixed(1)) : 0;
    const grade = computeGrade(percentage);

    setIsSubmitting(true);
    try {
      await resultService.create({
        studentId: student.id,
        studentName: student.name,
        class: student.class,
        exam: formData.exam,
        examDate: formData.examDate,
        subjects: [
          {
            subject: formData.subject,
            maxMarks,
            marksObtained,
            grade,
          },
        ],
        totalMarks: maxMarks,
        marksObtained,
        percentage,
        rank: 0,
        grade,
        result: percentage >= 35 ? 'Pass' : 'Fail',
      });

      toast.success('Result entry added successfully');
      const refreshed = await resultService.getAll();
      setResults(refreshed.data.data ?? []);
      setFormData((current) => ({
        ...current,
        exam: '',
        examDate: new Date().toISOString().split('T')[0],
        subject: current.subject,
        maxMarks: 100,
        marksObtained: 0,
      }));
    } catch (error) {
      console.error('Create result error:', error);
      toast.error('Failed to save result');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Results</p>
            <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">Teacher Result Board</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
              Enter fresh marks, review exam outcomes, and keep the results section synced with backend data.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Average</p>
              <p className="mt-2 text-2xl font-black text-brand-navy">{averagePercentage}%</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pass Rate</p>
              <p className="mt-2 text-2xl font-black text-emerald-600">{passRate}%</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Top Score</p>
              <p className="mt-2 text-2xl font-black text-amber-500">{topPerformer ? `${topPerformer.percentage}%` : '--'}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card title="Enter Results" subtitle="Push a new result record to the API">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Student</label>
              <select
                value={formData.studentId}
                onChange={(event) => handleStudentChange(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-brand-crimson"
              >
                {students.map((student) => (
                  <option key={student.id} value={student.id}>{student.name} • {student.class}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Class</label>
              <Input value={formData.class} readOnly />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Exam Name</label>
              <Input value={formData.exam} onChange={(event) => handleFormChange('exam', event.target.value)} placeholder="Mid-Term Mathematics Assessment" />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Exam Date</label>
              <Input type="date" value={formData.examDate} onChange={(event) => handleFormChange('examDate', event.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Subject</label>
              <Input value={formData.subject} onChange={(event) => handleFormChange('subject', event.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Max Marks</label>
              <Input type="number" value={String(formData.maxMarks)} onChange={(event) => handleFormChange('maxMarks', Number(event.target.value))} />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Marks Obtained</label>
              <Input type="number" value={String(formData.marksObtained)} onChange={(event) => handleFormChange('marksObtained', Number(event.target.value))} />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleCreateResult} disabled={isSubmitting} className="bg-brand-navy px-6">
              {isSubmitting ? 'Saving...' : 'Save Result'}
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Live Result Feed" subtitle="Records refreshed from the backend">
            <div className="mb-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <select
                value={classFilter}
                onChange={(event) => setClassFilter(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-brand-crimson"
              >
                <option value="all">All Classes</option>
                {classes.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
              <Input value={examFilter} onChange={(event) => setExamFilter(event.target.value)} placeholder="Filter by exam name" className="h-11" />
              <div className="flex h-11 items-center justify-center rounded-xl bg-slate-100 px-4 text-slate-500">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-3">
              {isLoading ? (
                [1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse rounded-2xl border border-slate-100 p-5">
                    <div className="h-4 w-40 rounded bg-slate-200" />
                  </div>
                ))
              ) : filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <div key={result.id} className="rounded-[1.5rem] border border-slate-100 p-5 transition hover:border-slate-200 hover:bg-slate-50">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-lg font-black tracking-tight text-slate-900">{result.studentName}</p>
                        <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{result.exam}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${result.result === 'Pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {result.result}
                      </span>
                    </div>
                    <div className="mt-5 grid gap-3 md:grid-cols-4">
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class</p>
                        <p className="mt-2 text-sm font-black text-slate-900">{result.class}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Percentage</p>
                        <p className="mt-2 text-sm font-black text-slate-900">{result.percentage}%</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Grade</p>
                        <p className="mt-2 text-sm font-black text-emerald-600">{result.grade}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Exam Date</p>
                        <p className="mt-2 text-sm font-black text-slate-900">{result.examDate}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.subjects.map((subject) => (
                        <span key={`${result.id}-${subject.subject}`} className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-600">
                          {subject.subject}: {subject.marksObtained}/{subject.maxMarks}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                  No result entries match the active filters.
                </div>
              )}
            </div>
          </Card>

          <Card title="Performance Highlights" subtitle="Quick academic overview">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-brand-navy" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Entries</p>
                    <p className="mt-1 text-2xl font-black text-slate-900">{filteredResults.length}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Average Grade</p>
                    <p className="mt-1 text-2xl font-black text-emerald-600">{computeGrade(averagePercentage)}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Top Performer</p>
                    <p className="mt-1 text-sm font-black text-slate-900">{topPerformer?.studentName || '--'}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Result Register" subtitle="Tabular academic report view" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Student</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Class</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Exam</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Score</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Grade</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id} className="border-t border-slate-100">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-black text-slate-900">{result.studentName}</p>
                      <p className="text-xs text-slate-500">{result.examDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">{result.class}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{result.exam}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ClipboardPenLine className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-black text-slate-900">{result.marksObtained}/{result.totalMarks}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                      {result.grade}
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

export default TeacherResultsPage;
