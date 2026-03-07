import { useState, useMemo } from "react";
import { earlyWarningStudents } from "./data";

const useEarlyWarningState = (teacher = null) => {
  const [filters, setFilters] = useState({
    riskLevel: "all",
    search: "",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const allStudents = useMemo(() => {
    if (teacher) return earlyWarningStudents.filter((s) => s.teacher === teacher);
    return earlyWarningStudents;
  }, [teacher]);

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

  return { filters, updateFilter, filteredStudents, allStudents, riskCounts };
};

export default useEarlyWarningState;
