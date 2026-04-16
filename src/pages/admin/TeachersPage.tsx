import { useEffect, useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail, BookOpen } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { teacherService } from '../../services';
import type { Teacher } from '../../types';
import toast from 'react-hot-toast';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const res = await teacherService.getAll();
      console.log('API Teachers Response:', res.data);
      if (res.data.success) {
        setTeachers(res.data.data.filter((t: Teacher) => 
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          t.subject.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      }
    } catch (error: any) {
      console.error('API Teachers Error:', error.response?.data || error.message);
      toast.error('Failed to load teachers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [searchTerm]);

  const handleAddTeacher = async () => {
    try {
      const dummyTeacher = {
        name: 'New Faculty ' + (teachers.length + 1),
        email: `faculty${Date.now()}@school.com`,
        subject: 'Mathematics',
        phone: '9876543210',
        qualification: 'M.Sc, B.Ed',
        experience: '5 Years',
        classes: ['10A', '11B'],
        joinDate: new Date().toISOString().split('T')[0],
        salary: 45000,
        isActive: true
      };
      await teacherService.create(dummyTeacher);
      toast.success('Faculty added successfully (Real API)');
      fetchTeachers();
    } catch (error) {
      toast.error('Failed to add faculty');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white uppercase italic tracking-tighter">Faculty Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Recruit, manage and track teacher performance and assignments.</p>
        </div>
        <Button onClick={handleAddTeacher} className="flex items-center gap-2 bg-brand-navy">
          <Plus className="w-4 h-4" /> Add New Faculty
        </Button>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search faculty by name or subject..."
              className="pl-10 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
             <Button variant="secondary" className="flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
             </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Faculty Member</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Classes</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                     <td colSpan={6} className="px-6 py-8"><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" /></td>
                  </tr>
                ))
              ) : teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center text-brand-navy font-black italic">
                          {teacher.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white uppercase tracking-tighter">{teacher.name}</p>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500">
                             <Mail className="w-3 h-3" /> {teacher.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <BookOpen className="w-4 h-4 text-brand-crimson" />
                         <span className="font-bold text-slate-700">{teacher.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex gap-1 flex-wrap">
                          {teacher.classes.map((cls, idx) => (
                             <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-black">{cls}</span>
                          ))}
                       </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-500">{teacher.experience}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${teacher.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {teacher.isActive ? 'Active' : 'On Leave'}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                       </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={6} className="px-6 py-10 text-center text-slate-400 italic font-medium">No faculty members found...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TeachersPage;
