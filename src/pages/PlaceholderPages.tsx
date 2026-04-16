const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
    <h1 className="text-2xl font-bold dark:text-white">{title}</h1>
    <p className="text-gray-500 mt-2">This module is currently under development as part of the core platform expansion.</p>
  </div>
);

export const TeachersPage = () => <PlaceholderPage title="Teachers Management" />;
export const AttendancePage = () => <PlaceholderPage title="Full Attendance Overview" />;
export const AssignmentsPage = () => <PlaceholderPage title="Assignments Repository" />;
export const ResultsPage = () => <PlaceholderPage title="Examination Results Hub" />;
export const PermissionsPage = () => <PlaceholderPage title="RBAC & Permissions Control" />;
export const ActivityLogsPage = () => <PlaceholderPage title="System Activity Logs" />;

export const TeacherAttendancePage = () => <PlaceholderPage title="Mark Attendance" />;
export const TeacherAssignmentsPage = () => <PlaceholderPage title="Manage Class Assignments" />;
export const TeacherResultsPage = () => <PlaceholderPage title="Enter Marks & Results" />;

export const StudentAttendancePage = () => <PlaceholderPage title="My Attendance History" />;
export const StudentResultsPage = () => <PlaceholderPage title="My Progress Reports" />;
export const StudentAssignmentsPage = () => <PlaceholderPage title="My Assignments" />;
