import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../../constants/useTheme";

const riskConfig = [
  { key: "critical", label: "Critical", icon: "🔴", colorKey: "red" },
  { key: "high", label: "High Risk", icon: "🟠", colorKey: "amber" },
  { key: "moderate", label: "Moderate", icon: "🟡", colorKey: "amber" },
  { key: "low", label: "Low Risk", icon: "🟢", colorKey: "green" },
];

const RiskSummary = ({ counts, onRiskPress }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
      {riskConfig.map((r) => (
        <TouchableOpacity
          key={r.key}
          activeOpacity={0.7}
          onPress={() => onRiskPress && onRiskPress(r.key)}
          style={{
            flex: 1,
            minWidth: 70,
            backgroundColor: `${colors[r.colorKey]}11`,
            borderWidth: 1,
            borderColor: `${colors[r.colorKey]}33`,
            borderRadius: 14,
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 2 }}>{r.icon}</Text>
          <Text style={{ fontSize: 20, fontWeight: "800", color: colors[r.colorKey] }}>
            {counts[r.key] || 0}
          </Text>
          <Text style={{ fontSize: 10, color: colors.muted, fontWeight: "600", marginTop: 2 }}>
            {r.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RiskSummary;
