import { useEffect, useState } from 'react';
import { Search, Plus, Filter, MoreVertical } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { studentService, classesService, admissionService } from '../../services';
import type { Student } from '../../types';
import toast from 'react-hot-toast';

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState({
    board: 'CBSE',
    class_name: '',
    childName: '',
    gender: '',
    fatherName: '',
    motherName: '',
    parentName: '',
    mobile: '',
    school: '',
    email: '',
  });

  const toggleActionsMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await studentService.getAll({ search: searchTerm, limit: 1000, class: selectedClass || undefined } as any);
      console.log('API Students Response:', res.data);
      if (res.data.success) {
        // Deduplicate by `id` and ensure stable order from API
        const raw: Student[] = res.data.data ?? [];
        const uniq = Array.from(new Map(raw.map((s: Student) => [s.id, s])).values());
        setStudents(uniq);
        // If backend provides a classes endpoint, prefer that for canonical ordering
        try {
          const classesRes = await classesService.getAll();
          setAvailableClasses(classesRes.data.data ?? Array.from(new Set((res.data.data ?? []).map((s: Student) => s.class))).filter(Boolean) as string[]);
        } catch (err) {
          setAvailableClasses(Array.from(new Set((res.data.data ?? []).map((s: Student) => s.class))).filter(Boolean) as string[]);
        }
      }
    } catch (error: any) {
      console.error('API Students Error:', error.response?.data || error.message);
      toast.error('Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [searchTerm, selectedClass]);

  const closeActionsMenu = () => setOpenMenuId(null);

  const handleView = async (id: string) => {
    try {
      const res = await studentService.getById(id);
      if (res.data.success) {
        setSelectedStudent(res.data.data);
        setShowModal(true);
      } else {
        toast.error('Failed to load student details');
      }
    } catch (err) {
      console.error('Failed to fetch student by id', err);
      toast.error('Failed to load student details');
    } finally {
      closeActionsMenu();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this student? This action cannot be undone.')) return;
    try {
      await studentService.delete(id);
      toast.success('Student deleted');
      fetchStudents();
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Failed to delete student');
    } finally {
      closeActionsMenu();
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await studentService.getById(id);
      if (res.data.success) {
        setEditingStudent(res.data.data);
        setShowEditModal(true);
      } else {
        toast.error('Failed to load student details');
      }
    } catch (err) {
      console.error('Failed to fetch student by id', err);
      toast.error('Failed to load student details');
    } finally {
      closeActionsMenu();
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    setIsSaving(true);
    try {
      const res = await studentService.update(editingStudent.id, {
        name: editingStudent.name,
        email: editingStudent.email,
        class: editingStudent.class,
        parentName: editingStudent.parentName,
        parentPhone: editingStudent.parentPhone,
        gender: editingStudent.gender,
        address: editingStudent.address,
        dob: editingStudent.dob,
        isActive: editingStudent.isActive,
      });
      if (res.data.success) {
        toast.success('Student updated successfully');
        setShowEditModal(false);
        setEditingStudent(null);
        fetchStudents();
      } else {
        toast.error(res.data.message || 'Failed to update student');
      }
    } catch (err: any) {
      console.error('Update failed', err);
      toast.error(err.response?.data?.message || 'Failed to update student');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddStudent = () => {
    setNewStudent({
      board: 'CBSE',
      class_name: '',
      childName: '',
      gender: '',
      fatherName: '',
      motherName: '',
      parentName: '',
      mobile: '',
      school: '',
      email: '',
    });
    setShowAddModal(true);
  };

  const handleSaveNewStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const [firstName, ...lastNameParts] = newStudent.childName.trim().split(' ');
      await admissionService.addStudentDirect({
        firstName: firstName,
        lastName: lastNameParts.join(' ') || '',
        dob: '',
        gender: newStudent.gender,
        fatherName: newStudent.fatherName,
        motherName: newStudent.motherName,
        parentMobile: newStudent.mobile,
        parentEmail: newStudent.email,
        className: newStudent.class_name,
        section: 'A',
        academicYear: '2026-2027',
      });
      toast.success('Student added successfully');
      setShowAddModal(false);
      fetchStudents();
    } catch (error: any) {
      console.error('Add student error:', error);
      toast.error(error.response?.data?.message || 'Failed to add student');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Directory</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage student records, enrollment and academic profiles.</p>
        </div>
        <Button onClick={handleAddStudent} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Student
        </Button>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, roll number, or email..."
              className="pl-10 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="secondary" className="flex items-center gap-2 flex-1 md:flex-none">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 flex-1 md:flex-none text-gray-700 dark:text-gray-300"
            >
              <option value="">All Classes</option>
              {availableClasses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">ID & Class</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Parent Info</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Fees</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" /></td>
                    <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" /></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" /></td>
                    <td className="px-4 py-3 hidden sm:table-cell"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12" /></td>
                    <td className="px-4 py-3 hidden sm:table-cell"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 ml-auto" /></td>
                  </tr>
                ))
              ) : students.length > 0 ? (
                students.map((student) => (
<tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-sm font-bold">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{student.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 hidden">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="text-sm">
                          <p className="font-medium text-gray-700 dark:text-gray-300">{student.rollNo}</p>
                          <p className="text-xs text-gray-500">{student.class}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {student.parentName}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          student.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {student.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="w-16 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full" 
                            style={{ width: `${student.fees ? (student.fees.paid / student.fees.total) * 100 : 0}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-500">
                          {student.fees ? Math.round((student.fees.paid / student.fees.total) * 100) : 0}%
                        </p>
                      </td>
<td className="px-1 py-3 text-right relative whitespace-nowrap">
                      <button onClick={(e) => toggleActionsMenu(student.id, e)} className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-3 h-3" />
                      </button>
                      {openMenuId === student.id && (
                        <div className="absolute right-0 top-4 z-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg min-w-[50px]">
                          <button onClick={() => handleView(student.id)} className="w-full text-left px-2 py-1 text-[10px] block hover:bg-gray-100 dark:hover:bg-gray-800">View</button>
                          <button onClick={() => handleEdit(student.id)} className="w-full text-left px-2 py-1 text-[10px] block hover:bg-gray-100 dark:hover:bg-gray-800">Edit</button>
                          <button onClick={() => handleDelete(student.id)} className="w-full text-left px-2 py-1 text-[10px] block text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800">Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      {showModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setShowModal(false); setSelectedStudent(null); }} />
          <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden my-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 sm:p-4 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold shadow-lg">
                    {selectedStudent.name ? selectedStudent.name.charAt(0) : 'S'}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">{selectedStudent.name}</h2>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-white/80 text-xs">
                      <span>Roll: <span className="font-semibold">{selectedStudent.rollNo}</span></span>
                      <span>Class: <span className="font-semibold">{selectedStudent.class}</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                    selectedStudent.isActive 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'bg-white/10 text-gray-300 border border-white/20'
                  }`}>
                    {selectedStudent.isActive ? 'Active Student' : 'Inactive'}
                  </span>
                  <button 
                    onClick={() => { setShowModal(false); setSelectedStudent(null); }} 
                    className="p-2 rounded-lg text-white/80 hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-1 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Student ID: {selectedStudent.id}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Admitted: {selectedStudent.admissionDate ? new Date(selectedStudent.admissionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Personal Information Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Name</span>
                    <p className="font-medium text-gray-900 dark:text-white truncate">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Roll No</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.rollNo}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Class</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.class}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">DOB</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.dob || '-'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Gender</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.gender || '-'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Email</span>
                    <p className="mt-1 font-medium text-gray-900 dark:text-white">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Phone</span>
                    <p className="mt-1 font-medium text-gray-900 dark:text-white">{selectedStudent.phone || '-'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Address</span>
                    <p className="mt-1 font-medium text-gray-900 dark:text-white">{selectedStudent.address || '-'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Admission Date</span>
                    <p className="mt-1 font-medium text-gray-900 dark:text-white">
                      {selectedStudent.admissionDate ? new Date(selectedStudent.admissionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Parent/Guardian Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">Parent Info</h3>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Parent Name</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.parentName || '-'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Parent Phone</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedStudent.parentPhone || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Fees & Actions Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Fees Status */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800">
                  <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Fees Status</h3>
                  {selectedStudent.fees ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-700 dark:text-emerald-300">Total Fees</span>
                        <span className="font-semibold text-emerald-900 dark:text-emerald-100">₹{selectedStudent.fees.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-700 dark:text-emerald-300">Paid</span>
                        <span className="font-semibold text-emerald-900 dark:text-emerald-100">₹{selectedStudent.fees.paid.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-700 dark:text-emerald-300">Due</span>
                        <span className="font-semibold text-emerald-900 dark:text-emerald-100">₹{selectedStudent.fees.due.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-emerald-200 dark:bg-emerald-800 rounded-full h-2 mt-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full" 
                          style={{ width: `${(selectedStudent.fees.paid / selectedStudent.fees.total) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-1">
                        {Math.round((selectedStudent.fees.paid / selectedStudent.fees.total) * 100)}% Paid
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-emerald-600 dark:text-emerald-300">No fee information available</p>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="truncate">View Academic Records</span>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="truncate">Send Message to Parent</span>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="truncate">Generate Report Card</span>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="truncate">Update Student Status</span>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

{/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => { setShowModal(false); setSelectedStudent(null); }} className="flex-1 sm:flex-none text-xs py-1.5">
                    Close
                  </Button>
                  <Button variant="secondary" onClick={() => { setShowModal(false); handleEdit(selectedStudent.id); }} className="flex-1 sm:flex-none text-xs py-1.5">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setShowEditModal(false); setEditingStudent(null); }} />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden my-4">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Edit Student</h2>
                <button onClick={() => { setShowEditModal(false); setEditingStudent(null); }} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleUpdateStudent} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <Input
                      value={editingStudent.name || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <Input
                      type="email"
                      value={editingStudent.email || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
                    <select
                      value={editingStudent.class || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, class: e.target.value })}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300"
                    >
                      <option value="">Select Class</option>
                      {availableClasses.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                    <select
                      value={editingStudent.gender || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, gender: e.target.value })}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Name</label>
                    <Input
                      value={editingStudent.parentName || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Phone</label>
                    <Input
                      value={editingStudent.parentPhone || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                    <Input
                      type="date"
                      value={editingStudent.dob || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, dob: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select
                      value={editingStudent.isActive ? 'true' : 'false'}
                      onChange={(e) => setEditingStudent({ ...editingStudent, isActive: e.target.value === 'true' })}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 dark:text-gray-300"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                    <Input
                      value={editingStudent.address || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                    />
                  </div>
                </div>
<div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button type="button" variant="outline" onClick={() => { setShowEditModal(false); setEditingStudent(null); }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

{showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowAddModal(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Student</h2>
            </div>
            <form onSubmit={handleSaveNewStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Curriculum Board*</label>
                  <select
                    value={newStudent.board}
                    onChange={(e) => setNewStudent({ ...newStudent, board: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-sm"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Grade*</label>
                  <select
                    value={newStudent.class_name}
                    onChange={(e) => setNewStudent({ ...newStudent, class_name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Nursery">Nursery</option>
                    <option value="UKG">UKG</option>
                    <option value="LKG">LKG</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                    <option value="5">5th</option>
                    <option value="6">6th</option>
                    <option value="7">7th</option>
                    <option value="8">8th</option>
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Child Name*</label>
                  <input
                    type="text"
                    required
                    value={newStudent.childName}
                    onChange={(e) => setNewStudent({ ...newStudent, childName: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Gender*</label>
                  <div className="flex gap-4 py-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="gender" value="Male" checked={newStudent.gender === 'Male'} onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })} />
                      <span className="text-sm">Male</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="gender" value="Female" checked={newStudent.gender === 'Female'} onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })} />
                      <span className="text-sm">Female</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Father Name</label>
                  <input type="text" value={newStudent.fatherName} onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Mother Name</label>
                  <input type="text" value={newStudent.motherName} onChange={(e) => setNewStudent({ ...newStudent, motherName: e.target.value })} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Parent Name*</label>
                  <input type="text" required value={newStudent.parentName} onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Mobile*</label>
                  <input type="tel" required value={newStudent.mobile} onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Campus*</label>
                  <select value={newStudent.school} onChange={(e) => setNewStudent({ ...newStudent, school: e.target.value })} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-sm">
                    <option value="">Select</option>
                    <option value="Madhapur">Madhapur</option>
                    <option value="Kukatpally">Kukatpally</option>
                    <option value="Gachibowli">Gachibowli</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Email*</label>
                  <input type="email" required value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" disabled={isSaving}>{isSaving ? 'Adding...' : 'Add Student'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
