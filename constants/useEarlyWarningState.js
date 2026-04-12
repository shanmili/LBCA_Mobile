import { useCallback, useEffect, useMemo, useState } from "react";
import { earlyWarningStudents } from "./data";
import { listEarlyWarnings } from "../services/earlyWarningService";

const mapWarningRecord = (item) => {
  const student = item.student || item.student_details || {};
  const enrollment = item.enrollment || item.enrollment_details || {};

  return {
    id: item.student_id || student.id || item.id,
    firstName: item.first_name || student.first_name || "",
    lastName: item.last_name || student.last_name || "",
    middleName: item.middle_name || student.middle_name || "",
    gradeLevel: item.grade_level || enrollment.grade_level || student.grade_level || "",
    section: item.section || enrollment.section || "",
    riskLevel: item.risk_level || item.riskLevel || "low",
    pacesBehind: item.paces_behind ?? item.pacesBehind ?? 0,
    subject: item.subject || "",
    teacher: item.teacher || "",
    lastActivity: item.last_activity || item.lastActivity || "Today",
    trend: item.trend || "stable",
    guardianLastName: item.guardian_last_name || student.guardian_last_name || "",
    guardianContact: item.guardian_contact || student.guardian_contact || "",
    pacePercent: item.pace_percent ?? item.pacePercent ?? 0,
    attendance: item.attendance ?? item.attendance_percent ?? 0,
    status: item.status || "Warning",
  };
};

const useEarlyWarningState = (teacher = null) => {
  const [remoteStudents, setRemoteStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    riskLevel: "all",
    search: "",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const fetchWarnings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await listEarlyWarnings({ riskLevel: filters.riskLevel });
      setRemoteStudents(data.map(mapWarningRecord));
    } catch (err) {
      setError(err);
      setRemoteStudents([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters.riskLevel]);

  useEffect(() => {
    fetchWarnings();
  }, [fetchWarnings]);

  const allStudents = useMemo(() => {
    const source = remoteStudents.length > 0 ? remoteStudents : earlyWarningStudents;
    if (teacher) return source.filter((s) => s.teacher === teacher);
    return source;
  }, [remoteStudents, teacher]);

  const filteredStudents = useMemo(() => {
    return allStudents.filter((s) => {
      if (filters.riskLevel !== "all" && s.riskLevel !== filters.riskLevel) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
        return (
          fullName.includes(q) ||
          s.subject.toLowerCase().includes(q) ||
          s.gradeLevel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allStudents, filters]);

  const riskCounts = useMemo(() => {
    const counts = { critical: 0, high: 0, moderate: 0, low: 0 };
    allStudents.forEach((s) => { counts[s.riskLevel] = (counts[s.riskLevel] || 0) + 1; });
    return counts;
  }, [allStudents]);

  return {
    filters,
    updateFilter,
    filteredStudents,
    allStudents,
    riskCounts,
    isLoading,
    error,
    refreshWarnings: fetchWarnings,
  };
};

export default useEarlyWarningState;
