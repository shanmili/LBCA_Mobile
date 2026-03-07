import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../../constants/useTheme";

const riskColors = {
  critical: "red",
  high: "amber",
  moderate: "amber",
  low: "green",
};

const riskLabels = {
  critical: "CRITICAL",
  high: "HIGH",
  moderate: "MODERATE",
  low: "LOW",
};

const trendIcons = {
  declining: "↓",
  stable: "→",
  improving: "↑",
};

const WarningTable = ({ students, onNavigate }) => {
  const { colors } = useTheme();

  if (students.length === 0) {
    return (
      <View style={{ paddingVertical: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 32, marginBottom: 8 }}>✅</Text>
        <Text style={{ fontSize: 14, color: colors.muted, fontWeight: "600" }}>
          No at-risk students found
        </Text>
      </View>
    );
  }

  return (
    <View style={{ gap: 10 }}>
      {students.map((student) => {
        const riskColor = colors[riskColors[student.riskLevel]];
        const trendColor =
          student.trend === "improving" ? colors.green :
          student.trend === "declining" ? colors.red : colors.muted;

        return (
          <TouchableOpacity
            key={student.id}
            activeOpacity={0.7}
            onPress={() => onNavigate && onNavigate("student", student.id)}
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 14,
              padding: 14,
            }}
          >
            {/* Header row */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: `${riskColor}22`,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "800", color: riskColor }}>
                    {student.firstName[0]}{student.lastName[0]}
                  </Text>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: colors.text }}>
                    {student.firstName} {student.lastName}
                  </Text>
                  <Text style={{ fontSize: 11, color: colors.muted }}>
                    {student.gradeLevel} — {student.section}
                  </Text>
                </View>
              </View>

              {/* Risk badge */}
              <View
                style={{
                  backgroundColor: `${riskColor}22`,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 9, fontWeight: "800", color: riskColor }}>
                  {riskLabels[student.riskLevel]}
                </Text>
              </View>
            </View>

            {/* Details row */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              <View>
                <Text style={{ fontSize: 10, color: colors.muted }}>Subject</Text>
                <Text style={{ fontSize: 12, fontWeight: "600", color: colors.text }}>{student.subject}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 10, color: colors.muted }}>PACEs Behind</Text>
                <Text style={{ fontSize: 12, fontWeight: "800", color: riskColor }}>{student.pacesBehind}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 10, color: colors.muted }}>Trend</Text>
                <Text style={{ fontSize: 12, fontWeight: "600", color: trendColor }}>
                  {trendIcons[student.trend]} {student.trend}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 10, color: colors.muted }}>Last Active</Text>
                <Text style={{ fontSize: 12, fontWeight: "600", color: colors.text }}>{student.lastActivity}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default WarningTable;
