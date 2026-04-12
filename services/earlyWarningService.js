import { API_ENDPOINTS } from "../constants/apiConfig";
import { apiClient } from "./apiClient";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

export async function listEarlyWarnings({ studentId, enrollmentId, riskLevel } = {}) {
  const params = {};
  if (studentId) params.student_id = studentId;
  if (enrollmentId) params.enrollment_id = enrollmentId;
  if (riskLevel && riskLevel !== "all") params.risk_level = riskLevel;

  const response = await apiClient.get(API_ENDPOINTS.earlyWarnings, { params });
  return normalizeList(response.data);
}

export async function getStudentWarnings(studentId) {
  const response = await apiClient.get(API_ENDPOINTS.studentWarningsById(studentId));
  return normalizeList(response.data);
}

export async function getStudentPace(studentId) {
  const response = await apiClient.get(API_ENDPOINTS.studentPaceById(studentId));
  return response.data;
}

export async function getCriticalWarnings() {
  const response = await apiClient.get(API_ENDPOINTS.criticalWarnings);
  return normalizeList(response.data);
}
