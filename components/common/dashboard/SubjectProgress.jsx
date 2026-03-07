import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../../constants/useTheme";

export function SubjectProgress({ subject, value, color }) {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
        <Text style={{ fontSize: 12, color: colors.muted, fontWeight: "600" }}>{subject}</Text>
        <Text style={{ fontSize: 12, fontWeight: "800", color }}>{value}</Text>
      </View>
      <View style={{ height: 6, backgroundColor: colors.cardLight, borderRadius: 100, overflow: "hidden" }}>
        <View style={{ height: "100%", width: `${value}%`, backgroundColor: color, borderRadius: 100 }} />
      </View>
    </View>
  );
}
