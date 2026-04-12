// Update these values to match your Django REST API.
export const API_BASE_URL = "http://192.168.101.77:8000";

export const API_ENDPOINTS = {
  adminLogin: "/api/admin/login/",
  teacherLogin: "/api/teacher/login/",
  parentLogin: "/api/parent/login/",
  parentStudentInfo: "/api/parent/student-info/",
  studentPaces: "/student-paces/",
  earlyWarnings: "/early-warnings/",
  studentPaceById: (studentId) => `/api/student/${studentId}/pace/`,
  studentWarningsById: (studentId) => `/api/student/${studentId}/warnings/`,
  criticalWarnings: "/api/critical-warnings/",
};
