import { useEffect, useState } from 'react';
import { Award, BarChart3, Trophy } from 'lucide-react';
import Card from '../../components/ui/Card';
import { resultService } from '../../services';
import { useAuthStore } from '../../store/authStore';
import type { Result } from '../../types';

const StudentResultsPage = () => {
  const { user } = useAuthStore();
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;

    const fetchResults = async (showLoader = false) => {
      if (showLoader) setIsLoading(true);
      try {
        const res = await resultService.getAll({ studentId: user.id });
        if (!isMounted) return;
        setResults(res.data.data ?? []);
      } catch (error) {
        if (!isMounted) return;
        console.error('Student results load error:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchResults(true);
    const interval = setInterval(() => fetchResults(false), 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?.id]);

  const average = results.length ? Math.round(results.reduce((sum, result) => sum + result.percentage, 0) / results.length) : 0;
  const latest = results[0];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-crimson">Results</p>
        <h1 className="mt-2 text-3xl font-black uppercase italic tracking-tighter text-slate-900">My Progress Reports</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">Live academic records for students and parents with exam-wise performance tracking.</p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card><div className="flex items-center gap-3"><BarChart3 className="h-5 w-5 text-brand-navy" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Average</p><p className="text-2xl font-black text-slate-900">{average}%</p></div></div></Card>
        <Card><div className="flex items-center gap-3"><Award className="h-5 w-5 text-emerald-600" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Latest Grade</p><p className="text-2xl font-black text-slate-900">{latest?.grade || '--'}</p></div></div></Card>
        <Card><div className="flex items-center gap-3"><Trophy className="h-5 w-5 text-amber-500" /><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Exams</p><p className="text-2xl font-black text-slate-900">{results.length}</p></div></div></Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <Card><p className="text-sm text-slate-500">Loading results...</p></Card>
        ) : results.length > 0 ? results.map((result) => (
          <Card key={result.id}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-lg font-black text-slate-900">{result.exam}</p>
                <p className="mt-1 text-sm text-slate-500">{result.examDate}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${result.result === 'Pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {result.result}
              </span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Percentage</p><p className="mt-2 text-sm font-black text-slate-900">{result.percentage}%</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Grade</p><p className="mt-2 text-sm font-black text-slate-900">{result.grade}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Marks</p><p className="mt-2 text-sm font-black text-slate-900">{result.marksObtained}/{result.totalMarks}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rank</p><p className="mt-2 text-sm font-black text-slate-900">{result.rank || '--'}</p></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.subjects.map((subject) => (
                <span key={`${result.id}-${subject.subject}`} className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-600">
                  {subject.subject}: {subject.marksObtained}/{subject.maxMarks}
                </span>
              ))}
            </div>
          </Card>
        )) : (
          <Card><p className="text-sm text-slate-500">No results found.</p></Card>
        )}
      </div>
    </div>
  );
};

export default StudentResultsPage;
