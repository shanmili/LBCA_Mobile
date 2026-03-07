import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../constants/useTheme";

const riskConfig = [
  { key: "critical", label: "Critical", colorKey: "red" },
  { key: "high", label: "High Risk", colorKey: "amber" },
  { key: "moderate", label: "Moderate", colorKey: "amber" },
  { key: "low", label: "Low Risk", colorKey: "green" },
];

const RiskSummary = ({ counts, onRiskPress }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
      }}
    >
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
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: colors[r.colorKey],
              marginBottom: 4,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: colors[r.colorKey],
            }}
          >
            {counts[r.key] || 0}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: colors.muted,
              fontWeight: "600",
              marginTop: 2,
            }}
          >
            {r.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RiskSummary;
