import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../../../constants/useTheme";

const statusColors = {
  "On Track": "green",
  "Warning": "amber",
  "At Risk": "amber",
  "Critical": "red",
};

const StudentTable = ({ students, onNavigate, onBack }) => {
  const { colors } = useTheme();

  const getFullName = (student) => {
    const middleInitial = student.middleName ? ` ${student.middleName.charAt(0)}.` : "";
    return `${student.lastName}, ${student.firstName}${middleInitial}`;
  };

  const getStatusColor = (status) => colors[statusColors[status]] || colors.muted;

  const getPaceColor = (pct) =>
    pct >= 85 ? colors.green : pct >= 65 ? colors.amber : colors.red;

  const getAttendanceColor = (pct) =>
    pct >= 90 ? colors.green : pct >= 75 ? colors.amber : colors.red;

  return (
    <View style={{ flex: 1 }}>
      {/* Back button */}
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}
      >
        <Text style={{ fontSize: 18, color: colors.accent, marginRight: 6 }}>←</Text>
        <Text style={{ fontSize: 14, fontWeight: "700", color: colors.accent }}>Back to Warnings</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={{ fontSize: 18, fontWeight: "800", color: colors.text, marginBottom: 4 }}>
        Student Profiles
      </Text>
      <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 14 }}>
        {students.length} student{students.length !== 1 ? "s" : ""} found
      </Text>

      {students.length === 0 ? (
        <View style={{ paddingVertical: 40, alignItems: "center" }}>
          <Text style={{ fontSize: 32, marginBottom: 8 }}>📋</Text>
          <Text style={{ fontSize: 14, color: colors.muted, fontWeight: "600" }}>No students found</Text>
        </View>
      ) : (
        <View style={{ gap: 10 }}>
          {students.map((student) => {
            const statusColor = getStatusColor(student.status);
            return (
              <View
                key={student.id}
                style={{
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 14,
                  padding: 14,
                }}
              >
                {/* Name & ID row */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: `${colors.accent}22`,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 10,
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: "800", color: colors.accent }}>
                        {student.firstName[0]}{student.lastName[0]}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: "700", color: colors.text }} numberOfLines={1}>
                        {getFullName(student)}
                      </Text>
                      <Text style={{ fontSize: 11, color: colors.muted }}>
                        ID: {student.id}  •  {student.gradeLevel} — {student.section}
                      </Text>
                    </View>
                  </View>

                  {/* Status badge */}
                  <View style={{ backgroundColor: `${statusColor}22`, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                    <Text style={{ fontSize: 9, fontWeight: "800", color: statusColor }}>{student.status}</Text>
                  </View>
                </View>

                {/* Details grid */}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
                  {/* Guardian */}
                  <View style={{ minWidth: "45%", marginBottom: 6 }}>
                    <Text style={{ fontSize: 10, color: colors.muted }}>Guardian</Text>
                    <Text style={{ fontSize: 12, fontWeight: "600", color: colors.text }}>{student.guardianLastName}</Text>
                  </View>
                  {/* Contact */}
                  <View style={{ minWidth: "45%", marginBottom: 6 }}>
                    <Text style={{ fontSize: 10, color: colors.muted }}>Contact</Text>
                    <Text style={{ fontSize: 12, fontWeight: "600", color: colors.text }}>{student.guardianContact}</Text>
                  </View>
                  {/* PACE % */}
                  <View style={{ minWidth: "45%", marginBottom: 6 }}>
                    <Text style={{ fontSize: 10, color: colors.muted }}>PACE Progress</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                      <Text style={{ fontSize: 13, fontWeight: "800", color: getPaceColor(student.pacePercent) }}>
                        {student.pacePercent}%
                      </Text>
                      <View style={{ flex: 1, height: 4, backgroundColor: colors.cardLight, borderRadius: 100, overflow: "hidden" }}>
                        <View style={{ height: "100%", width: `${student.pacePercent}%`, backgroundColor: getPaceColor(student.pacePercent), borderRadius: 100 }} />
                      </View>
                    </View>
                  </View>
                  {/* Attendance */}
                  <View style={{ minWidth: "45%", marginBottom: 6 }}>
                    <Text style={{ fontSize: 10, color: colors.muted }}>Attendance</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                      <Text style={{ fontSize: 13, fontWeight: "800", color: getAttendanceColor(student.attendance) }}>
                        {student.attendance}%
                      </Text>
                      <View style={{ flex: 1, height: 4, backgroundColor: colors.cardLight, borderRadius: 100, overflow: "hidden" }}>
                        <View style={{ height: "100%", width: `${student.attendance}%`, backgroundColor: getAttendanceColor(student.attendance), borderRadius: 100 }} />
                      </View>
                    </View>
                  </View>
                </View>

                {/* View button */}
                <TouchableOpacity
                  onPress={() => onNavigate && onNavigate("student-profile", student.id)}
                  activeOpacity={0.7}
                  style={{
                    marginTop: 8,
                    backgroundColor: `${colors.accent}18`,
                    borderRadius: 10,
                    paddingVertical: 8,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: "700", color: colors.accent }}>View Profile</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default StudentTable;
