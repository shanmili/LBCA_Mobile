import { COLORS } from "./colors";

export const gradesData = [
  { subject: "Mathematics", q1: 88, q2: 91, q3: 85, q4: null, teacher: "Mr. Reyes" },
  { subject: "English", q1: 92, q2: 94, q3: 90, q4: null, teacher: "Ms. Lim" },
  { subject: "Science", q1: 85, q2: 87, q3: 83, q4: null, teacher: "Mr. Cruz" },
  { subject: "Filipino", q1: 90, q2: 89, q3: 92, q4: null, teacher: "Ms. Dela Rosa" },
  { subject: "Araling Panlipunan", q1: 87, q2: 88, q3: 86, q4: null, teacher: "Mr. Aquino" },
  { subject: "MAPEH", q1: 94, q2: 95, q3: 93, q4: null, teacher: "Ms. Bautista" },
];

export const attendanceData = [
  { month: "Aug", present: 22, late: 1, absent: 0 },
  { month: "Sep", present: 20, late: 2, absent: 1 },
  { month: "Oct", present: 21, late: 1, absent: 0 },
  { month: "Nov", present: 19, late: 2, absent: 1 },
  { month: "Dec", present: 18, late: 0, absent: 0 },
  { month: "Jan", present: 20, late: 1, absent: 1 },
];

export const notifications = [
  { id: 1, type: "grade", icon: "📊", title: "Q3 Math Grade Posted", body: "Your Mathematics Q3 grade: 85", time: "2m ago", unread: true },
  { id: 2, type: "alert", icon: "⚠️", title: "Attendance Alert", body: "2 absences recorded this month — please monitor.", time: "1h ago", unread: true },
  { id: 3, type: "announcement", icon: "📢", title: "School Announcement", body: "Quarterly PTA meeting on March 15, 2026, 2:00 PM.", time: "3h ago", unread: false },
  { id: 4, type: "message", icon: "💬", title: "New message from Mr. Reyes", body: "Maria has been performing well. Keep it up!", time: "Yesterday", unread: false },
];

export const messages = [
  { id: 1, sender: "Mr. Reyes", subject: "Mathematics", avatar: "MR", lastMsg: "Maria has been performing well. Keep it up!", time: "Yesterday", unread: 0 },
  { id: 2, sender: "Ms. Lim", subject: "English", avatar: "ML", lastMsg: "Please review the essay rubric for Q4.", time: "Mon", unread: 1 },
];

export const schedule = [
  { day: "Mon", periods: [
    { time: "7:30", subject: "Mathematics", room: "203", teacher: "Mr. Reyes" },
    { time: "8:30", subject: "English", room: "105", teacher: "Ms. Lim" },
    { time: "9:30", subject: "Science", room: "Lab 1", teacher: "Mr. Cruz" },
  ]},
  { day: "Tue", periods: [
    { time: "7:30", subject: "English", room: "105", teacher: "Ms. Lim" },
    { time: "8:30", subject: "Mathematics", room: "203", teacher: "Mr. Reyes" },
    { time: "9:30", subject: "Filipino", room: "201", teacher: "Ms. Dela Rosa" },
  ]},
];

export const subjectColors = {
  "Mathematics": "#38BDF8", "English": "#34D399", "Science": "#A78BFA",
  "Filipino": "#FBBF24", "Araling Panlipunan": "#F87171", "MAPEH": "#FB923C",
};

export const getGradeColor = (g) => g >= 90 ? COLORS.green : g >= 80 ? COLORS.accent : g >= 75 ? COLORS.amber : COLORS.red;
